import { useEffect, useState } from 'react'
import { ArrowLeft, BookOpen, Copy, Download, ExternalLink, FileText, Printer, ShieldCheck } from 'lucide-react'
import Api from '../../../Service/api'

const Section5 = ({ claim, Onback, onReset }) => {
  const [guidelines, setGuidelines] = useState([])
  const [source, setSource] = useState(null)
  const [status, setStatus] = useState('loading')
  const [draft, setDraft] = useState(claim.appealDraft || null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [draftError, setDraftError] = useState('')
  const [language, setLanguage] = useState('English')
  const canGenerate = (claim.evidence?.length || 0) > 0 && claim.caseStatus !== 'INSUFFICIENT_EVIDENCE'
  const limitations = [...new Set((claim.evidence || []).flatMap((item) => item.aiAssessment?.limitations || []))]
  const timeline = [
    { label: 'Reported incident', date: claim.incidentDate },
    ...(claim.evidence || []).map((item) => ({ label: `Evidence analyzed: ${item.fileName}`, date: item.createdAt?.slice(0, 10) || 'Date unavailable' })),
    ...(claim.weather?.available ? [{ label: 'Weather context retrieved', date: claim.weather.period?.incidentDate || 'Date unavailable' }] : [])
  ]

  const getDraftText = () => [
    `Case ID: ${claim.claimId}`,
    'To,',
    'The appropriate district-level grievance authority,',
    `${claim.district}, ${claim.state}`,
    '',
    `Subject: ${draft?.subject || ''}`,
    '',
    'Respected Sir/Madam,',
    ...(draft?.bodyParagraphs || []),
    draft?.citedGuidelines?.length ? `Guideline references: ${draft.citedGuidelines.join(', ')}` : '',
    draft?.unverifiedItems?.length ? `Unverified information: ${draft.unverifiedItems.join(' ')}` : '',
    '',
    `Sincerely,\n${claim.farmerName}`
  ].filter(Boolean).join('\n\n')

  const copyDraft = async () => {
    await navigator.clipboard.writeText(getDraftText())
  }

  const downloadDraft = () => {
    const file = new Blob([getDraftText()], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = url
    link.download = `fasalnyay-appeal-${claim.claimId}.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  const generateDraft = async () => {
    setIsGenerating(true)
    setDraftError('')
    try {
      const response = await Api.post(`/claims/${claim.claimId}/appeal-draft`, { language })
      setDraft(response.data.data.draft)
    } catch (error) {
      setDraftError(error.response?.data?.message || 'The appeal draft could not be generated.')
    } finally {
      setIsGenerating(false)
    }
  }

  useEffect(() => {
    const loadGuidelines = async () => {
      try {
        const response = await Api.get(`/guidelines/pmfby?statusId=${claim.statusId}`)
        setGuidelines(response.data.data.guidelines)
        setSource(response.data.data.source)
        setStatus('ready')
      } catch (error) {
        console.log('Error loading PMFBY guidelines', error)
        setStatus('error')
      }
    }
    loadGuidelines()
  }, [claim.statusId])

  return (
    <div className='w-full md:w-3/5 min-h-[560px] max-h-[85vh] border-2 border-gray-600 bg-amber-100/80 rounded-xl flex overflow-hidden'>
      <div className='hidden md:block md:w-[40%] bg-[url("/Section3_image.png")] bg-cover bg-no-repeat rounded-bl-xl rounded-tl-xl' />
      <div className='w-full md:w-[60%] flex flex-col gap-4 p-6 overflow-y-auto'>
        <div className='flex items-center justify-between'><div><span className='text-xs tracking-[0.18em] text-gray-500 font-bold'>GROUNDED REVIEW</span><h2 className='text-2xl text-gray-800 font-extrabold mt-1'>Prepare your appeal</h2></div><span className='text-gray-600 font-extrabold'>5 of 5</span></div>
        <div className='rounded-xl border border-gray-200 bg-gray-50/90 p-4'><p className='text-xs tracking-[0.14em] text-gray-500 font-bold'>EVIDENCE ASSESSMENT</p><div className='flex items-center gap-2 text-gray-700 font-bold mt-2'><ShieldCheck size={18} /> {canGenerate ? 'Evidence dossier ready' : 'More evidence required'}</div><p className='text-sm text-gray-800 mt-2'>{canGenerate ? 'The submitted evidence has been organized for review.' : 'No accepted, relevant evidence is available for this case yet. Add a suitable file before preparing an appeal.'}</p><div className='grid grid-cols-2 gap-x-4 gap-y-2 mt-3 text-sm text-gray-700'><span>Case ID</span><strong className='break-all'>{claim.claimId || 'Not available'}</strong><span>Case type</span><strong>{claim.status || 'Not provided'}</strong><span>Crop</span><strong>{claim.crop || 'Not provided'}</strong><span>Incident date</span><strong>{claim.incidentDate || 'Not provided'}</strong><span>Evidence examined</span><strong>{claim.evidence?.length || 0} item(s)</strong></div></div>
        <div className='rounded-xl border border-amber-200 bg-amber-50/70 p-4'><p className='text-xs tracking-[0.14em] text-amber-800 font-bold'>WHAT STILL NEEDS VERIFICATION</p>{limitations.length > 0 ? <ul className='list-disc pl-5 mt-2 text-sm text-amber-950'>{limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}</ul> : <p className='text-sm text-amber-950 mt-2'>The available evidence does not establish the final cause, eligibility, or compensation outcome.</p>}</div>
        <div className='rounded-xl border border-gray-200 bg-gray-50/90 p-4'><p className='text-xs tracking-[0.14em] text-gray-500 font-bold'>CASE TIMELINE</p><ol className='mt-2 space-y-2 text-sm text-gray-700'>{timeline.map((event) => <li key={`${event.label}-${event.date}`} className='flex justify-between gap-3'><span>{event.label}</span><strong className='whitespace-nowrap'>{event.date}</strong></li>)}</ol></div>
        <p className='text-xs tracking-[0.14em] text-gray-500 font-bold'>APPLICABLE PMFBY INFORMATION</p>
        {status === 'loading' && <p className='text-sm text-gray-600'>Loading source-grounded provisions...</p>}
        {status === 'error' && <p className='text-sm text-red-700'>The PMFBY source could not be loaded. Do not generate a guideline-based conclusion.</p>}
        {status === 'ready' && guidelines.map((guideline) => <article key={guideline.id} className='rounded-xl border border-gray-200 bg-gray-50/90 p-4'><div className='flex items-start gap-3'><BookOpen size={19} className='text-emerald-700 mt-0.5' /><div><p className='text-xs tracking-[0.12em] text-gray-500 font-bold'>{guideline.reference}</p><h3 className='font-bold text-gray-800 mt-1'>{guideline.title}</h3><p className='text-sm leading-5 text-gray-700 mt-2'>{guideline.text}</p></div></div></article>)}
        {source && <a href={source.url} target='_blank' rel='noreferrer' className='flex items-center gap-2 text-xs text-emerald-800 underline'><ExternalLink size={14} /> Source: {source.title}</a>}
        {!draft && canGenerate && <div className='flex gap-2'><select value={language} onChange={(event) => setLanguage(event.target.value)} className='rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm'><option>English</option><option>Hindi</option></select><button type='button' onClick={generateDraft} disabled={isGenerating} className='flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 py-3 text-white font-bold disabled:opacity-50'><FileText size={17} /> {isGenerating ? 'Generating grounded draft...' : 'Generate grounded appeal draft'}</button></div>}
        {draftError && <p className='text-sm text-red-700'>{draftError}</p>}
        {draft && <div className='print-draft rounded-xl border border-gray-300 bg-white p-5 text-sm leading-6 text-gray-800'>
          <div className='flex items-center justify-between border-b border-gray-200 pb-3'><h3 className='font-bold'>Formal grievance draft</h3><div className='flex gap-2'><button type='button' onClick={copyDraft} title='Copy draft' className='text-gray-500 hover:text-emerald-700'><Copy size={16} /></button><button type='button' onClick={downloadDraft} title='Download draft' className='text-gray-500 hover:text-emerald-700'><Download size={16} /></button><button type='button' onClick={() => window.print()} title='Print or save as PDF' className='text-gray-500 hover:text-emerald-700'><Printer size={16} /></button></div></div>
          <p className='mt-4'><strong>Case ID:</strong> {claim.claimId}<br />To,<br />The appropriate district-level grievance authority,<br />{claim.district}, {claim.state}</p>
          <p className='mt-4'><strong>Subject:</strong> {draft.subject}</p>
          <p className='mt-4'>Respected Sir/Madam,</p>
          {draft.bodyParagraphs?.map((paragraph) => <p key={paragraph} className='mt-3'>{paragraph}</p>)}
          {draft.citedGuidelines?.length > 0 && <p className='mt-3'><strong>Guideline references:</strong> {draft.citedGuidelines.join(', ')}</p>}
          {draft.unverifiedItems?.length > 0 && <p className='mt-3'><strong>Unverified information:</strong> {draft.unverifiedItems.join(' ')}</p>}
          <p className='mt-4'>Sincerely,<br /><strong>{claim.farmerName}</strong></p>
          <p className='mt-4 text-xs text-gray-500'>This draft is a structured request for review, not a legal conclusion or determination of compensation.</p>
        </div>}
        <p className='text-xs leading-4 text-gray-600'>The assessment identifies what the evidence supports and what remains unverified. Final determination belongs to the applicable human or official process.</p>
        <div className='flex items-center justify-between'>
          <button type='button' onClick={Onback} className='flex items-center gap-2 text-gray-600 font-semibold'><ArrowLeft size={17} /> Back</button>
          <button type='button' onClick={onReset} className='rounded-lg border border-emerald-700 px-4 py-2 text-sm font-bold text-emerald-800'>Start new appeal</button>
        </div>
      </div>
    </div>
  )
}

export default Section5
