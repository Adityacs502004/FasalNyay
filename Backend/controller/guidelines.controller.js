import { pmfbyGuidelineSource, pmfbyGuidelines } from '../data/pmfby-guidelines.js'

export function get_pmfby_guidelines(req, res) {
    const { statusId } = req.query
    const guidelines = statusId
        ? pmfbyGuidelines.filter((guideline) => guideline.appliesTo.includes(statusId))
        : pmfbyGuidelines

    return res.status(200).json({
        success: true,
        data: {
            source: pmfbyGuidelineSource,
            guidelines
        }
    })
}
