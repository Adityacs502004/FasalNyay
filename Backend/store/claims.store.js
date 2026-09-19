const claims = new Map()

export function createClaim(claim) {
    claims.set(claim.claimId, claim)
    return claim
}

export function getClaim(claimId) {
    return claims.get(claimId)
}

export function updateClaim(claimId, updates) {
    const claim = getClaim(claimId)

    if (!claim) {
        return null
    }

    const updatedClaim = { ...claim, ...updates, updatedAt: new Date().toISOString() }
    claims.set(claimId, updatedClaim)
    return updatedClaim
}
