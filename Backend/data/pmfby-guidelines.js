export const pmfbyGuidelineSource = {
    title: 'Operational Guidelines 2023 of PMFBY',
    publisher: 'Ministry of Agriculture and Farmers Welfare, Government of India',
    url: 'https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf',
    accessedOn: '2026-09-19'
}

export const pmfbyGuidelines = [
    {
        id: 'PMFBY-5.5',
        reference: 'Para 5.5',
        title: 'Individual-farm assessment for localized and post-harvest losses',
        text: 'Loss or damage for localized calamities and post-harvest losses is assessed at the level of the individual insured farm. Intimation of loss is therefore handled separately from wide-spread calamity claims.',
        appliesTo: ['REJECTED', 'NO_INSPECTION', 'CALCULATION_ERROR'],
        appUse: 'Use as a context clause when the farmer reports a localized or post-harvest loss. It does not by itself establish that a claim is payable.'
    },
    {
        id: 'PMFBY-16.14',
        reference: 'Para 16.14',
        title: 'Penal interest for delayed admissible claims',
        text: 'All types of admissible claims shall be paid within the stipulated cut-off date. If payment is delayed beyond the stipulated timelines, penal interest at 12% per annum is payable on admissible pending claims, subject to the conditions in the guideline, including applicable subsidy release. The mechanism is stated to apply from Kharif 2024 onwards.',
        appliesTo: ['DELAYED', 'REJECTED'],
        appUse: 'Display only when the user supplies the applicable cut-off date and the claim is otherwise being assessed as admissible or pending. Never calculate or assert entitlement from status alone.'
    },
    {
        id: 'PMFBY-21.2.2',
        reference: 'Para 21.2.2',
        title: 'District Level Joint Committee',
        text: 'A District Level Joint Committee (DLJC) is constituted to address localized calamities and post-harvest losses under the guideline process.',
        appliesTo: ['NO_INSPECTION', 'CALCULATION_ERROR'],
        appUse: 'Use when explaining the relevant assessment or grievance path. Do not state that a DLJC inspection occurred unless the user provides an official record.'
    },
    {
        id: 'PMFBY-16.13',
        reference: 'Para 16.13',
        title: 'Payment after claim calculation or auto-approval',
        text: 'Where claims have been approved or auto-approved, the Insurance Company is liable to pay claims within three weeks of calculation or auto-approval, subject to the guideline conditions.',
        appliesTo: ['DELAYED'],
        appUse: 'Use as a possible timeline reference only after the relevant approval or auto-approval date is available.'
    }
]
