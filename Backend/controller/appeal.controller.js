import { getClaim, updateClaim } from '../store/claims.store.js'
import { generateAppealDraft } from '../services/appeal.service.js'

export async function generate_claim_appeal(req, res) {
    try {
        const claim = getClaim(req.params.claimId)
        if (!claim) return res.status(404).json({ success: false, message: 'Claim not found' })
        if (!claim.evidence?.length) {
            return res.status(400).json({ success: false, message: 'Accepted evidence is required before generating an appeal draft' })
        }

        const language = req.body.language || 'English'
        if (!['English', 'Hindi'].includes(language)) {
            return res.status(400).json({ success: false, message: 'Only English and Hindi drafts are supported' })
        }
        const draft = await generateAppealDraft(claim, language)
        const updatedClaim = updateClaim(claim.claimId, { appealDraft: draft })
        return res.status(200).json({ success: true, data: { draft, claim: updatedClaim } })
    } catch (error) {
        console.error('Error generating appeal draft', { status: error.status, message: error.message })
        return res.status(502).json({ success: false, message: 'The AI could not generate the appeal draft. Please try again later.' })
    }
}
