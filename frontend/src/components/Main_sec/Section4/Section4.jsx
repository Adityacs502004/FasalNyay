import { useEffect, useState } from 'react'
import { ArrowLeft, BookOpen, ExternalLink, FileText, ShieldCheck } from 'lucide-react'
import Api from '../../../Service/api'

const Section4 = ({ claim, Onback }) => {
  const [guidelines, setGuidelines] = useState([])
  const [source, setSource] = useState(null)
  const [status, setStatus] = useState('loading')

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
    <div className='w-3/5 min-h-[560px] max-h-[85vh] border-2 border-gray-600 bg-amber-100/80 rounded-xl flex overflow-hidden'>
      <div className='w-[40%] bg-[url("/Section3_image.png")] bg-cover bg-no-repeat rounded-bl-xl rounded-tl-xl' />
      <div className='w-[60%] flex flex-col gap-4 p-6 overflow-y-auto'>
        <div className='flex items-center justify-between'>
          <div>
            <span className='text-xs tracking-[0.18em] text-gray-500 font-bold'>GROUNDED REVIEW</span>
            <h2 className='text-2xl text-gray-800 font-extrabold mt-1'>PMFBY provisions</h2>
          </div>
          <span className='text-gray-600 font-extrabold'>4 of 4</span>
        </div>
        <div className='rounded-xl border border-emerald-200 bg-emerald-50/70 p-4'>
          <div className='flex items-center gap-2 text-emerald-800 font-bold'><ShieldCheck size={18} /> Evidence context</div>
          <p className='text-sm text-emerald-950 mt-2'>These provisions are relevant to the selected claim status, but they do not decide eligibility or compensation.</p>
        </div>
        <div className='rounded-xl border border-gray-200 bg-gray-50/90 p-4'>
          <div className='flex items-center gap-2 text-gray-700 font-bold'><FileText size={18} /> Case summary</div>
          <div className='grid grid-cols-2 gap-x-4 gap-y-2 mt-3 text-sm text-gray-700'>
            <span>Case type</span><strong>{claim.status || 'Not provided'}</strong>
            <span>Crop</span><strong>{claim.crop || 'Not provided'}</strong>
            <span>Incident date</span><strong>{claim.incidentDate || 'Not provided'}</strong>
            <span>Evidence examined</span><strong>{claim.evidence?.length || 0} item(s)</strong>
          </div>
          <p className='text-xs leading-4 text-gray-600 mt-3'>This summary separates what was submitted from what can be independently established. A missing record is not proof that an event did not occur.</p>
        </div>
        <div className='rounded-xl border border-amber-200 bg-amber-50/70 p-4'>
          <p className='text-xs tracking-[0.12em] text-amber-800 font-bold'>CURRENT ASSESSMENT</p>
          <p className='text-sm leading-5 text-amber-950 mt-2'>The case has been structured for review. The available material may support the reported issue, but final verification requires checking the submitted records and any applicable official process.</p>
          <p className='text-xs leading-4 text-amber-900 mt-2'>Human review is recommended where evidence is incomplete, contradictory, or materially affects compensation.</p>
        </div>
        {status === 'loading' && <p className='text-sm text-gray-600'>Loading source-grounded provisions...</p>}
        {status === 'error' && <p className='text-sm text-red-700'>The PMFBY source could not be loaded. Do not generate a guideline-based conclusion.</p>}
        {status === 'ready' && guidelines.map((guideline) => (
          <article key={guideline.id} className='rounded-xl border border-gray-200 bg-gray-50/90 p-4'>
            <div className='flex items-start gap-3'>
              <BookOpen size={19} className='text-emerald-700 mt-0.5' />
              <div>
                <p className='text-xs tracking-[0.12em] text-gray-500 font-bold'>{guideline.reference}</p>
                <h3 className='font-bold text-gray-800 mt-1'>{guideline.title}</h3>
                <p className='text-sm leading-5 text-gray-700 mt-2'>{guideline.text}</p>
                <p className='text-xs leading-4 text-gray-600 mt-2'><span className='font-bold'>How FasalNyay uses it:</span> {guideline.appUse}</p>
              </div>
            </div>
          </article>
        ))}
        {source && <a href={source.url} target='_blank' rel='noreferrer' className='flex items-center gap-2 text-xs text-emerald-800 underline'>
          <ExternalLink size={14} /> Source: {source.title} ({source.publisher})
        </a>}
        <div className='flex justify-start pt-1'>
          <button type='button' onClick={Onback} className='flex items-center gap-2 text-gray-600 font-semibold'><ArrowLeft size={17} /> Back</button>
        </div>
      </div>
    </div>
  )
}

export default Section4