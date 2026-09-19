function formatDate(date) {
    return date.toISOString().slice(0, 10).replaceAll('-', '')
}

function cleanPowerValue(value) {
    return value === -999 || value === '-999' || value === undefined ? null : value
}

function addDays(date, days) {
    const result = new Date(date)
    result.setUTCDate(result.getUTCDate() + days)
    return result
}

async function fetchPowerWindow(location, startDate, endDate) {
    const nasaUrl = new URL('https://power.larc.nasa.gov/api/temporal/daily/point')
    nasaUrl.search = new URLSearchParams({
        parameters: 'PRECTOTCORR,T2M',
        community: 'AG',
        longitude: String(location.longitude),
        latitude: String(location.latitude),
        start: formatDate(startDate),
        end: formatDate(endDate),
        format: 'JSON'
    })
    const response = await fetch(nasaUrl)
    if (!response.ok) throw new Error('NASA POWER weather lookup failed')
    return { data: await response.json(), url: nasaUrl.toString() }
}

export async function getWeatherContext(claim) {
    const geocodeUrl = new URL('https://geocoding-api.open-meteo.com/v1/search')
    geocodeUrl.search = new URLSearchParams({
        name: claim.district,
        count: '10',
        language: 'en',
        format: 'json',
        countryCode: 'IN'
    })
    const geocodeResponse = await fetch(geocodeUrl)

    if (!geocodeResponse.ok) {
        throw new Error('Weather location lookup failed')
    }

    const geocode = await geocodeResponse.json()
    const stateName = claim.state.toLowerCase().replaceAll(' and ', ' & ')
    const location = geocode.results?.find((result) => {
        const admin1 = (result.admin1 || '').toLowerCase().replaceAll(' and ', ' & ')
        return admin1 === stateName || admin1.includes(stateName) || stateName.includes(admin1)
    }) || geocode.results?.[0]
    if (!location) {
        return {
            available: false,
            reason: 'The selected district could not be located in the weather source.'
        }
    }

    const incidentDate = new Date(`${claim.incidentDate}T00:00:00Z`)
    if (Number.isNaN(incidentDate.getTime())) {
        return { available: false, reason: 'A valid incident date is required for weather lookup.' }
    }

    const isDroughtEvent = /drought|dry|shortage/i.test(claim.incidentEvent)
    const windowDays = isDroughtEvent ? 30 : 3
    const startDate = addDays(incidentDate, -windowDays)
    const endDate = addDays(incidentDate, windowDays)
    const { data: weather, url: nasaUrl } = await fetchPowerWindow(location, startDate, endDate)
    const rainfall = weather.properties?.parameter?.PRECTOTCORR || {}
    const temperature = weather.properties?.parameter?.T2M || {}
    const incidentKey = formatDate(incidentDate)

    const observedRainfall = Object.values(rainfall).map(cleanPowerValue).filter((value) => value !== null)
    const observedTotalRainfall = observedRainfall.reduce((total, value) => total + value, 0)
    const baselineResults = await Promise.allSettled(Array.from({ length: 5 }, (_, index) => {
        const yearStart = new Date(startDate)
        yearStart.setUTCFullYear(yearStart.getUTCFullYear() - index - 1)
        const yearEnd = new Date(endDate)
        yearEnd.setUTCFullYear(yearEnd.getUTCFullYear() - index - 1)
        return fetchPowerWindow(location, yearStart, yearEnd)
    }))
    const baselineTotals = baselineResults
        .filter((result) => result.status === 'fulfilled')
        .map(({ value: { data } }) => Object.values(data.properties?.parameter?.PRECTOTCORR || {}).map(cleanPowerValue).filter((value) => value !== null).reduce((total, value) => total + value, 0))
    const historicalAverageRainfall = baselineTotals.length ? baselineTotals.reduce((total, value) => total + value, 0) / baselineTotals.length : null
    const rainfallRatio = historicalAverageRainfall && historicalAverageRainfall > 0 ? observedTotalRainfall / historicalAverageRainfall : null

    return {
        available: true,
        source: 'NASA POWER Daily API',
        sourceUrl: nasaUrl.toString(),
        location: {
            district: claim.district,
            state: claim.state,
            latitude: location.latitude,
            longitude: location.longitude,
            matchedName: location.name
        },
        period: {
            start: formatDate(startDate),
            end: formatDate(endDate),
            windowDays,
            incidentDate: incidentKey
        },
        incidentDay: {
            rainfallMm: cleanPowerValue(rainfall[incidentKey]),
            temperatureC: cleanPowerValue(temperature[incidentKey])
        },
        daily: Object.keys(rainfall).map((date) => ({
            date,
            rainfallMm: cleanPowerValue(rainfall[date]),
            temperatureC: cleanPowerValue(temperature[date])
        })),
        comparison: {
            observedTotalRainfallMm: observedTotalRainfall,
            historicalAverageRainfallMm: historicalAverageRainfall,
            rainfallRatio,
            interpretation: rainfallRatio === null ? 'Historical comparison was not determinable.' : rainfallRatio >= 2 ? 'Observed rainfall was higher than the recent historical comparison.' : rainfallRatio <= 0.5 ? 'Observed rainfall was lower than the recent historical comparison.' : 'Observed rainfall was near the recent historical comparison.'
        },
        limitation: 'This weather context describes recorded conditions near the selected district. It does not establish that weather caused crop damage.'
    }
}
