import { getClaim, updateClaim } from '../store/claims.store.js'
import { getWeatherContext } from '../services/weather.service.js'

export async function get_claim_weather(req, res) {
    try {
        const claim = getClaim(req.params.claimId)
        if (!claim) {
            return res.status(404).json({ success: false, message: 'Claim not found' })
        }

        const weather = await getWeatherContext(claim)
        const updatedClaim = updateClaim(claim.claimId, { weather })
        return res.status(200).json({ success: true, data: { weather, claim: updatedClaim } })
    } catch (error) {
        console.error('Error loading weather context', error)
        return res.status(502).json({
            success: false,
            message: 'Weather data could not be loaded from the external source.'
        })
    }
}
