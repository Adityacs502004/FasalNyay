import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown, CloudRain, FileCheck2, MapPin, ShieldAlert, Sparkles } from 'lucide-react'
import Api from '../../../Service/api'

const Verification = ({ claim, setClaim, onNext, Onback }) => {
  const evidence = claim.evidence || []
  const [expandedEvidence, setExpandedEvidence] = useState({})
  const [weather, setWeather] = useState(claim.weather || null)
  const [weatherStatus, setWeatherStatus] = useState(claim.weather ? (claim.weather.available ? 'ready' : 'unavailable') : 'loading')
  const canProceedToAppeal = evidence.length > 0 && claim.caseStatus !== 'INSUFFICIENT_EVIDENCE'
  const hasHumanReview = evidence.some((item) => ['HUMAN_REVIEW', 'MISMATCH'].includes(item.verification?.status))
  const hasLimitations = evidence.some((item) => item.verification?.status === 'ACCEPTED_WITH_LIMITATIONS')
  const overallStatus = hasHumanReview ? 'HUMAN_REVIEW' : hasLimitations ? 'ACCEPTED_WITH_LIMITATIONS' : 'ACCEPTED'
  const caseStatusLabel = {
    EVIDENCE_READY: 'Evidence ready',
    MORE_EVIDENCE_NEEDED: 'More evidence needed',
    VERIFICATION_REQUIRED: 'Verification required',
    INSUFFICIENT_EVIDENCE: 'Insufficient evidence',
  }[claim.caseStatus] || 'Evidence under review'
  const statusLabel = {
    ACCEPTED: 'Evidence analyzed',
    ACCEPTED_WITH_LIMITATIONS: 'Evidence accepted with limitations',
    HUMAN_REVIEW: 'Human review recommended',
  }[overallStatus]
  const statusMessage = {
    ACCEPTED: 'The file was readable and relevant to the reported case. This describes the evidence, not whether the claim is true or payable.',
    ACCEPTED_WITH_LIMITATIONS: 'The file was relevant, but some details could not be established from the available information. Additional evidence may help.',
    HUMAN_REVIEW: 'The evidence contains missing, conflicting, or unavailable checks. A human reviewer should examine it before any conclusion is made.',
  }[overallStatus]
  const continueLabel = {
    EVIDENCE_READY: 'Continue',
    MORE_EVIDENCE_NEEDED: 'Continue with limitations',
    VERIFICATION_REQUIRED: 'Review evidence',
    INSUFFICIENT_EVIDENCE: 'More evidence required',
  }[claim.caseStatus] || 'Continue'

  useEffect(() => {
    if (claim.weather) {
      return
    }

    const loadWeather = async () => {
      try {
        const response = await Api.get(`/claims/${claim.claimId}/weather`)
        setWeather(response.data.data.weather)
        setClaim((current) => ({ ...current, weather: response.data.data.weather }))
        setWeatherStatus(response.data.data.weather.available ? 'ready' : 'unavailable')
      } catch (error) {
        console.log('Weather context unavailable', error)
        setWeatherStatus('unavailable')
      }
    }

    loadWeather()
  }, [claim.claimId])

  return (
    <div className='w-full md:w-3/5 min-h-[620px] max-h-[90vh] border-2 border-gray-600 bg-amber-100/80 rounded-xl flex overflow-hidden'>
      <div className='hidden md:block md:w-[40%] bg-[url("/Section3_image.png")] bg-cover bg-no-repeat rounded-bl-xl rounded-tl-xl' />
      <div className='w-full md:w-[60%] flex flex-col gap-4 p-6 overflow-y-auto'>
        <div className='flex items-center justify-between'>
          <div>
            <span className='text-xs tracking-[0.18em] text-gray-500 font-bold'>EVIDENCE ANALYSIS</span>
            <h2 className='text-2xl text-gray-800 font-extrabold mt-1'>Evidence analysis complete</h2>
          </div>
          <span className='text-gray-600 font-extrabold'>4 of 5</span>
        </div>
        <div className={`rounded-xl border p-4 ${overallStatus === 'ACCEPTED' ? 'border-emerald-200 bg-emerald-50/70' : 'border-amber-200 bg-amber-50/80'}`}>
          <div className='flex items-center gap-2 font-bold text-gray-800'>{overallStatus === 'ACCEPTED' ? <CheckCircle2 size={19} className='text-emerald-700' /> : <ShieldAlert size={19} className='text-amber-700' />} {statusLabel}</div>
          <p className='text-sm text-gray-700 mt-2'>{statusMessage}</p>
          <p className='text-xs font-bold text-gray-600 mt-2'>Case status: {caseStatusLabel}</p>
        </div>
        <div className='rounded-xl border border-sky-200 bg-sky-50/70 p-4'>
          <div className='flex items-center gap-2 text-sky-800 font-bold'><CloudRain size={18} /> Independent weather context</div>
          {weatherStatus === 'loading' && <p className='text-sm text-gray-700 mt-2'>Loading weather records for the selected district...</p>}
          {weatherStatus === 'unavailable' && <p className='text-sm text-gray-700 mt-2'>Weather records could not be loaded. This does not affect the submitted evidence.</p>}
          {weatherStatus === 'ready' && weather && <>
            <p className='text-sm text-gray-700 mt-2'>NASA POWER records near {weather.location.matchedName}, {weather.location.state} on {claim.incidentDate} show {weather.incidentDay.rainfallMm ?? 'no reported'} mm rainfall and {weather.incidentDay.temperatureC ?? 'no reported'}°C temperature.</p>
            <p className='text-sm text-gray-700 mt-2'>{weather.comparison?.interpretation}</p>
            <p className='text-xs text-gray-600 mt-2'>{weather.limitation}</p>
            <a href={weather.sourceUrl} target='_blank' rel='noreferrer' className='text-xs text-sky-800 underline mt-2 inline-block'>Source: {weather.source}</a>
          </>}
        </div>
        {evidence.map((item) => (
          <article key={item.evidenceId} className='rounded-xl border border-gray-200 bg-gray-50/90 p-4'>
            <div className='flex items-center gap-2 text-gray-800 font-bold'><FileCheck2 size={18} className='text-emerald-700' /> {item.fileName}</div>
            <p className='text-xs text-gray-500 mt-1'>Type: {item.documentType}</p>
            {item.verification?.classification && <p className='text-xs font-semibold text-emerald-800 mt-2'>{item.verification.classification.replaceAll('_', ' ')}</p>}
            <p className='text-sm text-gray-700 mt-2'>{item.aiAssessment?.directObservations?.[0] || item.verification?.userMessage || 'This file was processed for the case.'}</p>
            <button type='button' onClick={() => setExpandedEvidence((current) => ({ ...current, [item.evidenceId]: !current[item.evidenceId] }))} className='flex items-center gap-1 text-xs font-semibold text-gray-500 mt-3 hover:text-gray-800'>View technical details <ChevronDown size={14} className={expandedEvidence[item.evidenceId] ? 'rotate-180' : ''} /></button>
            {expandedEvidence[item.evidenceId] && <div className='mt-3 border-t border-gray-200 pt-3'>
              <div className='grid grid-cols-2 gap-2 text-xs text-gray-700'>
                <span className='flex items-center gap-1'><MapPin size={13} /> GPS: {item.exif?.latitude && item.exif?.longitude ? 'Available' : 'Unavailable'}</span>
                <span>Capture date: {item.exif?.timestamp ? 'Available' : 'Unavailable'}</span>
                <span>Date relation: {item.verification?.dateRelation?.replaceAll('_', ' ') || 'Unknown'}</span>
                <span>Metadata: {item.verification?.metadataAvailable ? 'Found' : 'Missing'}</span>
                {item.verification?.locationCheck?.message && <span className='col-span-2'>Location check: {item.verification.locationCheck.message}</span>}
              </div>
              {item.aiAssessment?.available && <div className='mt-3'>
                <p className='flex items-center gap-1 text-xs font-bold text-gray-700'><Sparkles size={13} className='text-emerald-700' /> Evidence assessment</p>
                <p className='text-xs text-gray-600 mt-1'>Type: {item.aiAssessment.evidenceType || 'Not determinable'}{item.aiAssessment.detectedCrop ? `. Crop observed: ${item.aiAssessment.detectedCrop}.` : ''}</p>
                {item.aiAssessment.directObservations?.length > 0 && <div className='mt-2'><p className='text-xs font-semibold text-gray-700'>Direct observations</p><ul className='list-disc pl-4 text-xs text-gray-600'>{item.aiAssessment.directObservations.map((observation) => <li key={observation}>{observation}</li>)}</ul></div>}
                {item.aiAssessment.extractedInformation?.length > 0 && <div className='mt-2'><p className='text-xs font-semibold text-gray-700'>Extracted information</p><ul className='list-disc pl-4 text-xs text-gray-600'>{item.aiAssessment.extractedInformation.map((information) => <li key={information}>{information}</li>)}</ul></div>}
                {item.aiAssessment.possibleInterpretation?.length > 0 && <div className='mt-2'><p className='text-xs font-semibold text-gray-700'>Possible interpretation</p><ul className='list-disc pl-4 text-xs text-gray-600'>{item.aiAssessment.possibleInterpretation.map((interpretation) => <li key={interpretation}>{interpretation}</li>)}</ul></div>}
                {item.aiAssessment.limitations?.length > 0 && <div className='mt-2'><p className='text-xs font-semibold text-gray-700'>What this file cannot establish</p><ul className='list-disc pl-4 text-xs text-gray-600'>{item.aiAssessment.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}</ul></div>}
              </div>}
              {(item.aiAssessment?.warnings?.length > 0 || item.aiAssessment?.reason) && <p className='text-xs text-amber-800 mt-2'>{item.aiAssessment.reason || item.aiAssessment.warnings.join(' ')}</p>}
              {item.verification?.userMessage && <p className='text-xs text-gray-700 mt-2'>{item.verification.userMessage}</p>}
            </div>}
          </article>
        ))}
        <p className='text-xs leading-4 text-gray-600'>This result describes what was found in the submitted files, what may be consistent with the reported case, and what still needs verification. It is not a final claim decision.</p>
        <div className='flex justify-between items-center pt-1'>
          <button type='button' onClick={Onback} className='flex items-center gap-2 text-gray-600 font-semibold'><ArrowLeft size={17} /> Back</button>
          <button type='button' onClick={onNext} disabled={!canProceedToAppeal} className='flex items-center gap-2 rounded-lg bg-emerald-700 px-5 py-2.5 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed'>{continueLabel} {canProceedToAppeal && <ArrowRight size={17} />}</button>
        </div>
      </div>
    </div>
  )
}

export default Verification
