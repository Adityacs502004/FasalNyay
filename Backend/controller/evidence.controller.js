import crypto from 'node:crypto'
import exifr from 'exifr'
import sharp from 'sharp'
import { getClaim, updateClaim } from '../store/claims.store.js'
import { analyzeEvidence } from '../services/image-analysis.service.js'
import { distanceInKm, findDistrictLocation } from '../services/location.service.js'

const allowedDocumentTypes = new Set([
    'assessment_record',
    'yield_record',
    'field_photo',
    'loss_acknowledgement',
    'communication_record',
    'claim_acknowledgement',
    'payment_record'
])

const classificationMessages = {
    valid_relevant: {
        label: 'Evidence accepted',
        message: 'This file is readable and relevant to the reported case.',
        action: 'continue'
    },
    valid_inconclusive: {
        label: 'Evidence added',
        message: 'This file is relevant, but it cannot establish every detail needed for the case.',
        action: 'request_more'
    },
    missing_information: {
        label: 'Additional information needed',
        message: 'The file was added, but important information could not be extracted from it.',
        action: 'request_more'
    },
    mismatch: {
        label: 'Evidence mismatch',
        message: 'The file was added, but some available information conflicts with the reported case details.',
        action: 'human_review'
    },
    irrelevant: {
        label: 'Not relevant to this case',
        message: 'This file does not appear to contain information related to the reported crop-loss or claim issue.',
        action: 'replace'
    },
    wrong_crop: {
        label: 'Evidence does not match the reported crop',
        message: 'The uploaded evidence appears to show a different crop. Please upload evidence of the affected crop.',
        action: 'replace'
    },
    unreadable: {
        label: 'Unable to analyze',
        message: 'The file could not be reliably read or analyzed. Please upload a clearer copy.',
        action: 'replace'
    },
    processing_failed: {
        label: 'We could not process this file',
        message: 'There was a technical problem while processing the file. Please try uploading it again.',
        action: 'retry'
    },
    duplicate: {
        label: 'Duplicate evidence',
        message: 'This appears to be the same file as evidence already uploaded for this case.',
        action: 'replace'
    },
    suspicious: {
        label: 'Evidence requires verification',
        message: 'The file contains inconsistencies that prevent reliable verification. Human review is recommended.',
        action: 'human_review'
    }
}

function getCaseStatus(evidence) {
    if (!evidence.length) return 'INSUFFICIENT_EVIDENCE'
    if (evidence.some((item) => ['mismatch', 'suspicious'].includes(item.verification?.classification))) return 'VERIFICATION_REQUIRED'
    if (evidence.some((item) => ['valid_inconclusive', 'missing_information'].includes(item.verification?.classification))) return 'MORE_EVIDENCE_NEEDED'
    return 'EVIDENCE_READY'
}

function normalizeCropName(crop) {
    return crop
        .toLowerCase()
        .replace(/\([^)]*\)/g, '')
        .replace(/[^a-z0-9 ]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
}

function cropsConflict(reportedCrop, detectedCrop) {
    if (!reportedCrop || !detectedCrop) return false

    const reported = normalizeCropName(reportedCrop)
    const detected = normalizeCropName(detectedCrop)
    if (!reported || !detected || detected === 'not determinable from this evidence') return false

    return !detected.includes(reported) && !reported.includes(detected)
}

function getExifCalendarDate(value) {
    if (typeof value === 'string') {
        const match = value.match(/^(\d{4})[:\-](\d{2})[:\-](\d{2})/)
        if (match) return `${match[1]}-${match[2]}-${match[3]}`
    }

    if (value instanceof Date && !Number.isNaN(value.getTime())) {
        const month = String(value.getMonth() + 1).padStart(2, '0')
        const day = String(value.getDate()).padStart(2, '0')
        return `${value.getFullYear()}-${month}-${day}`
    }

    return null
}

function getDateRelation(photoDate, incidentDate) {
    const photoDay = getExifCalendarDate(photoDate)
    if (!photoDay || !/^\d{4}-\d{2}-\d{2}$/.test(incidentDate)) {
        return 'UNKNOWN'
    }

    if (photoDay === incidentDate) return 'ON_EVENT_DATE'
    return photoDay < incidentDate ? 'BEFORE' : 'AFTER'
}

export async function upload_claim_evidence(req, res) {
    try {
        const { claimId } = req.params
        const { documentType } = req.body
        const claim = getClaim(claimId)

        if (!claim) {
            return res.status(404).json({ success: false, message: 'Claim not found' })
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'An evidence file is required' })
        }

        if (!allowedDocumentTypes.has(documentType)) {
            return res.status(400).json({ success: false, message: 'Unsupported evidence type' })
        }

        const fileHash = crypto.createHash('sha256').update(req.file.buffer).digest('hex')
        const duplicate = (claim.evidence || []).find((item) => item.fileHash === fileHash)
        if (duplicate) {
            const duplicateEvidence = {
                evidenceId: crypto.randomUUID(),
                documentType,
                fileName: req.file.originalname,
                mimeType: req.file.mimetype,
                verification: {
                    status: 'HUMAN_REVIEW',
                    classification: 'duplicate',
                    accepted: false,
                    userMessage: classificationMessages.duplicate.message,
                    nextAction: 'replace'
                },
                duplicateOf: duplicate.evidenceId,
                createdAt: new Date().toISOString()
            }
            const evidenceAttempts = [...(claim.evidenceAttempts || []), duplicateEvidence]
            const updatedClaim = updateClaim(claimId, { evidenceAttempts })
            return res.status(201).json({
                success: true,
                message: classificationMessages.duplicate.label,
                data: { claim: updatedClaim, evidence: duplicateEvidence }
            })
        }

        const isImage = req.file.mimetype.startsWith('image/')
        let metadata = {}
        if (isImage) {
            await sharp(req.file.buffer).metadata()
            metadata = await exifr.parse(req.file.buffer, {
                gps: true,
                tiff: true,
                exif: true
            }) || {}
        }
        const photoDate = metadata.DateTimeOriginal || metadata.CreateDate || null
        const dateRelation = getDateRelation(photoDate, claim.incidentDate)
        const dateMatchesIncident = dateRelation === 'ON_EVENT_DATE'
        let locationCheck = { status: 'UNKNOWN', distanceKm: null, message: 'The capture location could not be compared with the selected district.' }
        if (documentType === 'field_photo' && metadata.latitude && metadata.longitude) {
            try {
                const districtLocation = await findDistrictLocation(claim.district, claim.state)
                if (districtLocation) {
                    const distanceKm = distanceInKm(
                        { latitude: metadata.latitude, longitude: metadata.longitude },
                        { latitude: districtLocation.latitude, longitude: districtLocation.longitude }
                    )
                    locationCheck = distanceKm <= 50
                        ? { status: 'CONSISTENT_WITH_DISTRICT', distanceKm, message: 'Available GPS metadata is consistent with the selected district area.' }
                        : { status: 'REQUIRES_REVIEW', distanceKm, message: 'Available GPS metadata is outside the selected district area and requires review.' }
                }
            } catch (error) {
                console.warn('GPS district comparison unavailable', error.message)
            }
        }
        const aiAssessment = await analyzeEvidence(
            req.file.buffer,
            req.file.mimetype,
            claim,
            {
                documentType,
                captureDate: photoDate,
                latitude: metadata.latitude || null,
                longitude: metadata.longitude || null
            }
        )
        let classification = aiAssessment.classification
        if (aiAssessment.available && classification === 'valid_relevant' && documentType === 'field_photo' && (!photoDate || !metadata.latitude || !metadata.longitude)) {
            classification = 'valid_inconclusive'
            aiAssessment.limitations = [
                ...(aiAssessment.limitations || []),
                ...(!photoDate ? ['The capture date could not be established from the available metadata.'] : []),
                ...(!metadata.latitude || !metadata.longitude ? ['The capture location could not be established from the available metadata.'] : [])
            ]
        }
        if (aiAssessment.available && isImage && cropsConflict(claim.crop, aiAssessment.detectedCrop)) {
            classification = 'wrong_crop'
            aiAssessment.inconsistencies = [
                ...(aiAssessment.inconsistencies || []),
                `AI observation (${aiAssessment.detectedCrop}) does not match the reported crop (${claim.crop}).`
            ]
            aiAssessment.warnings = aiAssessment.inconsistencies
        }
        if (documentType === 'field_photo' && locationCheck.status === 'REQUIRES_REVIEW' && classification === 'valid_relevant') {
            classification = 'mismatch'
            aiAssessment.inconsistencies = [
                ...(aiAssessment.inconsistencies || []),
                locationCheck.message
            ]
            aiAssessment.warnings = aiAssessment.inconsistencies
        }
        const classificationResult = classification === 'processing_failed' && aiAssessment.reason
            ? { ...classificationMessages.processing_failed, message: aiAssessment.reason }
            : classificationMessages[classification] || classificationMessages.processing_failed
            const accepted = aiAssessment.available && classificationResult.action !== 'replace' && classificationResult.action !== 'retry'
        const verificationStatus = ['HUMAN_REVIEW', 'UNABLE_TO_VERIFY'].includes(aiAssessment.status)
            ? 'HUMAN_REVIEW'
            : ['mismatch', 'suspicious'].includes(classification)
                ? 'MISMATCH'
                : ['valid_inconclusive', 'missing_information'].includes(classification)
                    ? 'ACCEPTED_WITH_LIMITATIONS'
                    : 'ACCEPTED'

        const evidence = {
            evidenceId: crypto.randomUUID(),
            documentType: documentType || 'unspecified',
            fileName: req.file.originalname,
            mimeType: req.file.mimetype,
            fileHash,
            exif: {
                latitude: metadata.latitude || null,
                longitude: metadata.longitude || null,
                timestamp: photoDate || null
            },
            verification: {
                dateMatchesIncident,
                dateRelation,
                locationCheck,
                locationRequiresCoordinates: !metadata.latitude || !metadata.longitude,
                metadataAvailable: Boolean(photoDate || metadata.latitude || metadata.longitude),
                status: verificationStatus,
                classification,
                accepted,
                userMessage: classificationResult.message,
                nextAction: classificationResult.action
            },
            aiAssessment,
            createdAt: new Date().toISOString()
        }
        const evidenceList = accepted ? [...(claim.evidence || []), evidence] : claim.evidence || []
        const evidenceAttempts = [...(claim.evidenceAttempts || []), evidence]
        const updatedClaim = updateClaim(claimId, {
            evidence: evidenceList,
            evidenceAttempts,
            caseStatus: getCaseStatus(evidenceList)
        })

        return res.status(201).json({
            success: true,
            message: classificationResult.label,
            data: { claim: updatedClaim, evidence }
        })
    } catch (error) {
        console.error('Error processing claim evidence', error)
        return res.status(500).json({ success: false, message: 'Error processing claim evidence' })
    }
}
