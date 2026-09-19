import { getClaim } from '../store/claims.store.js'

export function get_reviewer_case(req, res) {
    const claim = getClaim(req.params.claimId)
    if (!claim) return res.status(404).json({ success: false, message: 'Claim not found' })

    return res.status(200).json({
        success: true,
        data: {
            claim,
            reviewerNote: 'This reviewer view is read-only. Final claim determination remains with the applicable official process.'
        }
    })
}
