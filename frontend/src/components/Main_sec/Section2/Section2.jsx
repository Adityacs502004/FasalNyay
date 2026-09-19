import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, CalendarDays, MapPin, Sprout } from 'lucide-react'
import Api from '../../../Service/api'

const cropOptions = [
  'Wheat', 'Rice', 'Maize', 'Bajra', 'Jowar', 'Barley', 'Mustard', 'Groundnut',
  'Soybean', 'Cotton', 'Sugarcane', 'Chickpea (Gram)', 'Pigeon Pea (Arhar)',
  'Lentil (Masoor)', 'Potato', 'Onion', 'Tomato', 'Other',
]

const Section2 = ({ claim, setClaim, onNext, Onback }) => {
  const [locationOptions, setLocationOptions] = useState({})
  const [locationStatus, setLocationStatus] = useState('loading')
  const [formData, setFormData] = useState(() => ({
    farmerName: claim.farmerName || '',
    state: claim.state || '',
    district: claim.district || '',
    crop: claim.crop || '',
    customCrop: claim.customCrop || '',
    incidentDate: claim.incidentDate || '',
    incidentEvent: claim.incidentEvent || '',
  }))
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const response = await Api.get('/locations/india')
        setLocationOptions(response.data.data)
        setLocationStatus('ready')
      } catch {
        setLocationStatus('error')
      }
    }

    loadLocations()
  }, [])

  const updateField = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    setShowError(false)
  }

  const continueToEvidence = () => {
    const requiredDetails = { ...formData }
    delete requiredDetails.customCrop
    const hasRequiredDetails = Object.values(requiredDetails).every(Boolean)
    const hasCropName = formData.crop !== 'Other' || Boolean(formData.customCrop.trim())
    if (!hasRequiredDetails || !hasCropName) {
      setShowError(true)
      return
    }

    send_input_data()
  }

  async function send_input_data() {
    try {
      const send_data = await Api.patch(`/claims/${claim.claimId}`, {
        ...formData,
        crop: formData.crop === 'Other' ? formData.customCrop.trim() : formData.crop,
      })
      if(send_data?.data?.success){
        setClaim((current) => ({
          ...current,
          ...send_data.data.data,
          customCrop: formData.customCrop,
          ...(send_data.data.data.caseStatus === null ? {
            evidence: [],
            evidenceAttempts: [],
            weather: null
          } : {})
        }))
        onNext()
      }
    } catch (error) {
      setShowError(true)
      console.log('Error sending data to backend', error)
      return
    }
  }

  return (
    <div className='w-full md:w-3/5 h-[90vh] min-h-[680px] max-h-[820px] border-2 border-gray-600 bg-amber-100/80 rounded-xl flex overflow-hidden'>
      {/* Left picture section */}
      <div className='hidden md:block md:w-[40%] h-full bg-[url("/Section2_image.png")] 
        bg-cover bg-no-repeat rounded-bl-xl rounded-tl-xl'></div>
        {/* Right section */}
        <div className='w-full md:w-[60%] h-full flex flex-col justify-between gap-4 p-6 overflow-y-auto'>
          <div className='flex items-center justify-between'>
            <div>
              <span className='text-xs tracking-[0.18em] text-gray-500 font-bold'>EVIDENCE DETAILS</span>
              <h2 className='text-2xl text-gray-800 font-extrabold mt-1'>Tell us about your claim</h2>
            </div>
            <span className='text-gray-600 font-extrabold'>2 of 5</span>
          </div>

          <div className='rounded-xl bg-gray-50/90 border border-gray-200 p-4'>
            <div className='flex items-center gap-2 text-gray-600 text-xs tracking-[0.14em] font-bold mb-3'>
              <MapPin size={15} /> FARMER DETAILS
            </div>
            <label className='block text-sm text-gray-700 font-semibold mb-1' htmlFor='farmerName'>Farmer name</label>
            <input id='farmerName' name='farmerName' value={formData.farmerName} onChange={updateField} placeholder='e.g. Ram Singh' className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-emerald-500' />
            <div className='grid grid-cols-2 gap-3 mt-3'>
              <div>
                <label className='block text-sm text-gray-700 font-semibold mb-1' htmlFor='state'>State / UT</label>
                <select id='state' name='state' value={formData.state} disabled={locationStatus !== 'ready'} onChange={(event) => {
                  setFormData((current) => ({ ...current, state: event.target.value, district: '' }))
                  setShowError(false)
                }} className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-emerald-500'>
                  <option value=''>{locationStatus === 'loading' ? 'Loading states...' : 'Select state'}</option>
                  {Object.keys(locationOptions).sort().map((state) => <option key={state}>{state}</option>)}
                </select>
              </div>
              <div>
                <label className='block text-sm text-gray-700 font-semibold mb-1' htmlFor='district'>District</label>
                <select id='district' name='district' value={formData.district} onChange={updateField} disabled={!formData.state} className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-emerald-500 disabled:bg-gray-100'>
                  <option value=''>{locationStatus === 'error' ? 'Location data unavailable' : formData.state ? 'Select district' : 'Select state first'}</option>
                  {(locationOptions[formData.state] || []).map((district) => <option key={district}>{district}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className='rounded-xl bg-gray-50/90 border border-gray-200 p-4'>
            <div className='flex items-center gap-2 text-gray-600 text-xs tracking-[0.14em] font-bold mb-3'>
              <Sprout size={15} /> INCIDENT CONTEXT
            </div>
            <div className='grid grid-cols-2 gap-3'>
              <div>
                <label className='block text-sm text-gray-700 font-semibold mb-1' htmlFor='crop'>Crop type</label>
                <select id='crop' name='crop' value={formData.crop} onChange={updateField} className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-emerald-500'>
                  <option value=''>Select crop</option>
                  {cropOptions.map((crop) => <option key={crop}>{crop}</option>)}
                </select>
              </div>
              <div>
                <label className='block text-sm text-gray-700 font-semibold mb-1' htmlFor='incidentDate'>Incident date</label>
                <div className='relative'>
                  <CalendarDays size={16} className='absolute left-3 top-3 text-gray-400' />
                  <input id='incidentDate' name='incidentDate' type='date' value={formData.incidentDate} onChange={updateField} className='w-full rounded-lg border border-gray-300 bg-white pl-9 pr-2 py-2.5 outline-none focus:border-emerald-500' />
                </div>
              </div>
            </div>
            <label className='block text-sm text-gray-700 font-semibold mt-3 mb-1' htmlFor='incidentEvent'>What happened?</label>
            <select id='incidentEvent' name='incidentEvent' value={formData.incidentEvent} onChange={updateField} className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-emerald-500'>
              <option value=''>Select incident</option>
              <option>Unseasonal rainfall</option>
              <option>Drought or rainfall shortage</option>
              <option>Hailstorm</option>
              <option>Pest or disease damage</option>
              <option>Other crop damage</option>
            </select>
            {formData.crop === 'Other' && <input name='customCrop' value={formData.customCrop} onChange={updateField} placeholder='Enter crop name' className='w-full mt-3 rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-emerald-500' />}
          </div>

          <div className='flex flex-1 min-h-[84px] items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4'>
            <div className='rounded-lg bg-white p-2 text-emerald-700 shadow-sm'><MapPin size={19} /></div>
            <p className='text-sm leading-5 text-emerald-950'><span className='font-bold'>Why location matters:</span> we use your district and incident date to compare the claim with independent weather records in the next step.</p>
          </div>

          {showError && <p className='text-sm text-red-700'>Please complete every field and choose a crop name before continuing.</p>}

          <div className='flex justify-between items-center pt-1'>
            <button type='button' onClick={Onback} className='flex items-center gap-2 text-gray-600 font-semibold hover:text-gray-900'><ArrowLeft size={17} /> Back</button>
            <button type='button' onClick={continueToEvidence} className='flex items-center gap-2 rounded-lg bg-emerald-700 px-5 py-2.5 text-white font-bold hover:bg-emerald-800 transition-colors'>Continue <ArrowRight size={17} /></button>
          </div>
        </div>
    </div>
  )
}

export default Section2