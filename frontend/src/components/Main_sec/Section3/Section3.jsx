import { useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, FileCheck2, FileUp, LoaderCircle, ShieldAlert, ShieldCheck } from 'lucide-react'
import Api from '../../../Service/api'

const uploadRequirements = {
  REJECTED: [
    { label: 'Rejection letter', value: 'communication_record' },
    { label: 'Field damage photos', value: 'field_photo' },
    { label: 'Insurance policy document', value: 'assessment_record' },
  ],
  DELAYED: [
    { label: 'Claim acknowledgement', value: 'claim_acknowledgement' },
    { label: 'Payment or bank statement proof', value: 'payment_record' },
  ],
  NO_INSPECTION: [
    { label: 'Field damage photos', value: 'field_photo' },
    { label: 'Claim acknowledgement', value: 'claim_acknowledgement' },
  ],
  CALCULATION_ERROR: [
    { label: 'Field damage photos', value: 'field_photo' },
    { label: 'Yield assessment document', value: 'yield_record' },
    { label: 'Insurance policy document', value: 'assessment_record' },
  ],
}
const maxFileSize = 25 * 1024 * 1024
const allowedFileTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']

const Section3 = ({ claim, setClaim, onNext, Onback }) => {
  const [files, setFiles] = useState([])
  const [documentType, setDocumentType] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [processedEvidence, setProcessedEvidence] = useState([])
  const [hasConsent, setHasConsent] = useState(false)
  const requiredDocuments = uploadRequirements[claim.statusId] || []

  const uploadEvidence = async () => {
    if (!files.length || !claim.claimId || !documentType) {
      setErrorMessage('Choose an evidence type and select at least one file.')
      return
    }
    if (!hasConsent) {
      setErrorMessage('Please provide consent before sending the file for evidence analysis.')
      return
    }

    setIsUploading(true)
    setErrorMessage('')
    try {
      const uploadedEvidence = []
      let latestClaim = claim
      for (const file of files) {
        const body = new FormData()
        body.append('file', file)
        body.append('documentType', documentType)
        const response = await Api.post(`/claims/${claim.claimId}/evidence`, body)
        const evidence = response.data.data.evidence
        latestClaim = response.data.data.claim
        if (evidence.verification.accepted) uploadedEvidence.push(evidence)
        setProcessedEvidence((current) => [...current, evidence])
      }

      setClaim((current) => ({
        ...current,
        caseStatus: latestClaim.caseStatus,
        evidenceAttempts: latestClaim.evidenceAttempts,
        evidence: [...(current.evidence || []), ...uploadedEvidence],
      }))
      setFiles([])
    } catch (error) {
      console.log('Error uploading evidence', error)
      setErrorMessage(error.response?.data?.message || 'Upload failed. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const continueToReview = () => {
    if (claim.evidence?.length) onNext()
    else setErrorMessage('Add at least one accepted, relevant file before continuing.')
  }

  const selectFiles = (event) => {
    const selectedFiles = Array.from(event.target.files || [])
    const invalidType = selectedFiles.find((file) => !allowedFileTypes.includes(file.type))
    const oversizedFile = selectedFiles.find((file) => file.size > maxFileSize)
    const hashes = selectedFiles.map((file) => `${file.name}:${file.size}:${file.lastModified}`)
    const hasDuplicateSelection = new Set(hashes).size !== hashes.length

    if (invalidType) {
      setFiles([])
      setErrorMessage('This file type is not supported. Use JPG, PNG, WEBP, or PDF.')
      return
    }
    if (oversizedFile) {
      setFiles([])
      setErrorMessage('Each file must be 25 MB or smaller.')
      return
    }
    if (hasDuplicateSelection) {
      setFiles([])
      setErrorMessage('The same file was selected more than once.')
      return
    }

    setFiles(selectedFiles)
    setErrorMessage('')
  }

  return (
    <div className='w-full md:w-3/5 min-h-[560px] border-2 border-gray-600 bg-amber-100/80 rounded-xl flex overflow-hidden'>
      <div className='hidden md:block md:w-[40%] bg-[url("/Section3_image.png")] bg-cover bg-no-repeat rounded-bl-xl rounded-tl-xl' />
      <div className='w-full md:w-[60%] flex flex-col gap-5 p-6'>
        <div className='flex items-center justify-between'>
          <div>
            <span className='text-xs tracking-[0.18em] text-gray-500 font-bold'>SUPPORTING EVIDENCE</span>
            <h2 className='text-2xl text-gray-800 font-extrabold mt-1'>Upload claim documents</h2>
          </div>
          <span className='text-gray-600 font-extrabold'>3 of 5</span>
        </div>
        <div className='rounded-xl border border-emerald-200 bg-emerald-50/70 p-4'>
          <div className='flex items-center gap-2 text-emerald-800 font-bold'><ShieldCheck size={18} /> {claim.status}</div>
          <p className='text-sm text-emerald-950 mt-2'>For this claim type, useful evidence includes:</p>
          <ul className='list-disc pl-5 mt-2 text-sm text-emerald-950'>{requiredDocuments.map((document) => <li key={document.value}>{document.label}</li>)}</ul>
        </div>
        <div>
          <label htmlFor='documentType' className='block text-sm text-gray-700 font-semibold mb-1'>What are you uploading?</label>
          <select id='documentType' value={documentType} onChange={(event) => { setDocumentType(event.target.value); setErrorMessage('') }} className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-emerald-500'>
            <option value=''>Select evidence type</option>
            {requiredDocuments.map((document) => <option key={document.value} value={document.value}>{document.label}</option>)}
          </select>
        </div>
        <label htmlFor='evidenceFiles' className={`flex flex-1 min-h-[150px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-emerald-300 bg-gray-50/80 ${isUploading ? 'cursor-wait bg-emerald-50' : 'cursor-pointer hover:bg-emerald-50'}`}>
          {isUploading ? <LoaderCircle size={30} className='text-emerald-700 animate-spin' /> : <FileUp size={30} className='text-emerald-700' />}
          <span className='font-bold text-gray-700'>{isUploading ? 'Uploading and checking your evidence...' : files.length ? `${files.length} file${files.length > 1 ? 's' : ''} selected` : 'Choose evidence files'}</span>
          <span className='text-xs text-gray-500'>{isUploading ? 'Extracting file details and asking Gemini to assess the evidence' : 'Original photos preserve EXIF metadata'}</span>
          <input id='evidenceFiles' type='file' accept='image/jpeg,image/png,image/webp,application/pdf' multiple disabled={isUploading} onChange={selectFiles} className='hidden' />
        </label>
        <label className='flex items-start gap-2 text-xs leading-4 text-gray-700'>
          <input type='checkbox' checked={hasConsent} disabled={isUploading} onChange={(event) => { setHasConsent(event.target.checked); setErrorMessage('') }} className='mt-0.5 accent-emerald-700' />
          <span>I consent to sending this selected evidence to FasalNyay's secure backend for EXIF extraction and Gemini evidence analysis. I understand the result is for review and is not a final claim decision.</span>
        </label>
        {processedEvidence.length > 0 && <div className='space-y-2'>
          <p className='text-xs tracking-[0.14em] text-gray-500 font-bold'>EVIDENCE SUBMITTED</p>
          {processedEvidence.map((evidence) => {
            const accepted = evidence.verification?.accepted
            const limited = evidence.verification?.status === 'ACCEPTED_WITH_LIMITATIONS'
            return <article key={evidence.evidenceId} className={`rounded-xl border p-3 ${accepted ? 'border-emerald-200 bg-emerald-50/70' : 'border-red-200 bg-red-50/70'}`}>
              <div className='flex items-center gap-2'>{accepted ? <CheckCircle2 size={17} className='text-emerald-700' /> : <ShieldAlert size={17} className='text-red-700' />}<FileCheck2 size={16} className='text-gray-600' /><span className='text-sm font-bold text-gray-800 truncate'>{evidence.fileName}</span></div>
              <p className='text-xs text-gray-700 mt-1'>{accepted ? (limited ? 'Accepted with limitations' : 'Evidence accepted') : evidence.verification?.classification?.replaceAll('_', ' ')}</p>
              <p className='text-xs text-gray-600 mt-1'>{evidence.verification?.userMessage}</p>
            </article>
          })}
        </div>}
        {errorMessage && <p className='text-sm text-red-700'>{errorMessage}</p>}
        <div className='flex justify-between items-center'>
          <button type='button' onClick={Onback} disabled={isUploading} className='flex items-center gap-2 text-gray-600 font-semibold disabled:opacity-40'><ArrowLeft size={17} /> Back</button>
          <button type='button' onClick={isUploading ? undefined : files.length ? uploadEvidence : continueToReview} disabled={isUploading} className='flex items-center gap-2 rounded-lg bg-emerald-700 px-5 py-2.5 text-white font-bold hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-wait'>{isUploading ? <LoaderCircle size={17} className='animate-spin' /> : <ArrowRight size={17} />} {isUploading ? 'Checking...' : files.length ? 'Analyze evidence' : 'Continue to review'}</button>
        </div>
      </div>
    </div>
  )
}

export default Section3