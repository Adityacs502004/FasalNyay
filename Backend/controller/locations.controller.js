import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const indiaLocations = require('india-states-districts')

export function get_india_locations(req, res) {
    const locations = indiaLocations.getAllStatesWithDistricts()

    return res.status(200).json({
        success: true,
        data: Object.fromEntries(locations.map(({ name, districts }) => [name, districts]))
    })
}
