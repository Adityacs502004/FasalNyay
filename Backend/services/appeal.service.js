import { GoogleGenAI } from '@google/genai'
import { pmfbyGuidelines, pmfbyGuidelineSource } from '../data/pmfby-guidelines.js'

const draftPrompt = `You are drafting a neutral PMFBY grievance request for FasalNyay.

Use only the supplied case facts, accepted evidence facts, limitations, allowed PMFBY provisions, and each provision's appUse instruction. Never invent names, dates, numbers, policy details, survey records, weather, crop loss, legal conclusions, or compensation entitlement. The farmer's reported event must remain a reported statement. Do not say the claim is approved, rejected, genuine, fraudulent, or payable. If a provision's appUse says it requires conditions or does not establish entitlement, preserve that limitation in the draft.

Return ONLY valid JSON:
{
  "subject": "neutral request-for-review subject",
  "bodyParagraphs": ["formal paragraphs for the grievance letter"],
  "citedGuidelines": ["exact reference IDs from the allowed provisions"],
  "unverifiedItems": ["limitations that should remain visible in the letter"]
}

The letter must request review, identify observed evidence separately from reported facts, disclose limitations, and avoid final claim decisions.`

function parseJson(text) {
    const cleanText = text.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim()
    const start = cleanText.indexOf('{')
    const end = cleanText.lastIndexOf('}')
    return JSON.parse(start >= 0 && end > start ? cleanText.slice(start, end + 1) : cleanText)
}

export async function generateAppealDraft(claim, language = 'English') {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) throw new Error('Gemini API key is not configured')

    const allowedGuidelines = pmfbyGuidelines.filter((guideline) => guideline.appliesTo.includes(claim.statusId))
    const acceptedEvidence = (claim.evidence || []).map((item) => ({
        fileName: item.fileName,
        documentType: item.documentType,
        observations: item.aiAssessment?.directObservations || [],
        extractedInformation: item.aiAssessment?.extractedInformation || [],
        limitations: item.aiAssessment?.limitations || [],
        dateRelation: item.verification?.dateRelation || 'UNKNOWN'
    }))
    const factSheet = {
        outputLanguage: language,
        reportedCase: {
            farmerName: claim.farmerName,
            state: claim.state,
            district: claim.district,
            crop: claim.crop,
            incidentDate: claim.incidentDate,
            incidentEvent: claim.incidentEvent,
            status: claim.status
        },
        acceptedEvidence,
        weatherContext: claim.weather?.available ? {
            source: claim.weather.source,
            incidentDay: claim.weather.incidentDay,
            comparison: claim.weather.comparison,
            limitation: claim.weather.limitation
        } : null,
        allowedGuidelines: allowedGuidelines.map(({ id, reference, title, text, appUse }) => ({ id, reference, title, text, appUse })),
        source: pmfbyGuidelineSource
    }

    const ai = new GoogleGenAI({ apiKey })
    const models = [...new Set([process.env.GEMINI_MODEL || 'gemini-3.6-flash', process.env.GEMINI_FALLBACK_MODEL || 'gemini-3.1-flash-lite'])]
    let lastError
    for (const model of models) {
        try {
            const response = await ai.models.generateContent({
                model,
                contents: [{ text: `${draftPrompt}\nWrite the draft in ${language}.\nFACT SHEET:\n${JSON.stringify(factSheet)}` }]
            })
            const draft = parseJson(response.text || '')
            const allowedIds = new Set(allowedGuidelines.map((guideline) => guideline.id))
            draft.citedGuidelines = Array.isArray(draft.citedGuidelines)
                ? draft.citedGuidelines.filter((reference) => allowedIds.has(reference))
                : []
            return { ...draft, model, source: pmfbyGuidelineSource }
        } catch (error) {
            lastError = error
            if (![429, 502, 503].includes(error.status)) break
        }
    }
    throw lastError || new Error('Appeal draft generation failed')
}
