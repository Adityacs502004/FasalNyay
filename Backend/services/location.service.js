export async function findDistrictLocation(district, state) {
    const url = new URL('https://geocoding-api.open-meteo.com/v1/search')
    url.search = new URLSearchParams({ name: district, count: '10', language: 'en', format: 'json', countryCode: 'IN' })
    const response = await fetch(url)
    if (!response.ok) throw new Error('Location lookup failed')
    const data = await response.json()
    const stateName = state.toLowerCase().replaceAll(' and ', ' & ')
    return data.results?.find((result) => {
        const admin1 = (result.admin1 || '').toLowerCase().replaceAll(' and ', ' & ')
        return admin1 === stateName || admin1.includes(stateName) || stateName.includes(admin1)
    }) || data.results?.[0] || null
}

export function distanceInKm(first, second) {
    const earthRadiusKm = 6371
    const latitudeDelta = (second.latitude - first.latitude) * Math.PI / 180
    const longitudeDelta = (second.longitude - first.longitude) * Math.PI / 180
    const latitudeOne = first.latitude * Math.PI / 180
    const latitudeTwo = second.latitude * Math.PI / 180
    const value = Math.sin(latitudeDelta / 2) ** 2 + Math.cos(latitudeOne) * Math.cos(latitudeTwo) * Math.sin(longitudeDelta / 2) ** 2
    return earthRadiusKm * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value))
}
