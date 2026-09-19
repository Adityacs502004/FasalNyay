import crypto from 'node:crypto'
import { createClaim, getClaim, updateClaim } from '../store/claims.store.js'

const statusIds = {
    Rejected: 'REJECTED',
    Delayed: 'DELAYED',
    'No inspection': 'NO_INSPECTION',
    'calculation error': 'CALCULATION_ERROR'
}

export async function create_user_claim(req, res) {
    try {
       const { status } = req.body
       const statusId = statusIds[status]

       if (!statusId) {
        return res.status(400).json({
            success: false,
            message: 'Invalid claim status'
        })
       }

       const claim = createClaim({
        claimId: crypto.randomUUID(),
        status,
        statusId,
        createdAt: new Date().toISOString()
    })

       console.log('Created claim:', claim)
       res.status(200).json({
        success : true,
        message: 'Claim created successfully',
        data: claim
       })
    } catch (error) {
        console.error('Error creating claim', error)
        return res.status(500).json({
            success : false,
            message : 'Error creating claim'
        })
    }
}

export async function update_user_details(req, res) {
    try {
        const { claimId } = req.params
        const { farmerName, state, district, crop, incidentDate, incidentEvent } = req.body

        if (!getClaim(claimId)) {
            return res.status(404).json({ success: false, message: 'Claim not found' })
        }

        if (!farmerName || !state || !district || !crop || !incidentDate || !incidentEvent) {
            return res.status(400).json({
                success: false,
                message: 'Farmer name, location, crop, incident date, and incident event are required'
            })
        }

        const existingClaim = getClaim(claimId)
        const caseInputsChanged = [
            existingClaim.state !== state,
            existingClaim.district !== district,
            existingClaim.crop !== crop,
            existingClaim.incidentDate !== incidentDate,
            existingClaim.incidentEvent !== incidentEvent
        ].some(Boolean)
        const claim = updateClaim(claimId, {
            farmerName,
            state,
            district,
            crop,
            incidentDate,
            incidentEvent,
            ...(caseInputsChanged ? {
                evidence: [],
                evidenceAttempts: [],
                weather: null,
                caseStatus: null
            } : {})
        })

        console.log('Updated claim details:', claim)
        return res.status(200).json({
            success: true,
            message: 'Claim details updated successfully',
            data: claim
        })
    } catch (error) {
        console.error('Error updating claim details', error)
        return res.status(500).json({ success: false, message: 'Error updating claim details' })
    }
}