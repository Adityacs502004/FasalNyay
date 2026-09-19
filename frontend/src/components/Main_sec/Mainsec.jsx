import Section1 from './Section1/Section1'
import Section2 from './Section2/Section2'
import Section3 from './Section3/Section3'
import Verification from './Section4/Verification'
import Section5 from './Section5/Section5'
import { useState } from 'react'

const Mainsec = () => {
    const initialClaim = {
        claimId: null,
        status: null,
        statusId: null,
        farmerName: '',
        state: '',
        district: '',
        crop: '',
        incidentDate: '',
        incidentEvent: ''
    };
    const [current_page , Setpage] = useState(1);
    const [claim, setClaim] = useState(initialClaim);

    const next_page = () => Setpage((prev)=> prev + 1);
    const previous_page = () => Setpage((prev)=> prev - 1);
    const resetClaim = () => {
        setClaim(initialClaim)
        Setpage(1)
    }

    function render_step() {
        switch (current_page) {
            case 1:
                return <Section1 claim={claim} setClaim={setClaim} onNext={next_page}/>
            case 2:
                return <Section2 claim={claim} setClaim={setClaim} onNext={next_page} Onback={previous_page}/>
            case 3:
                return <Section3 claim={claim} setClaim={setClaim} onNext={next_page} Onback={previous_page}/>
            case 4:
                return <Verification claim={claim} setClaim={setClaim} onNext={next_page} Onback={previous_page}/>
            case 5:
                return <Section5 claim={claim} Onback={previous_page} onReset={resetClaim}/>
            default:
                return <Section1 claim={claim} setClaim={setClaim} onNext={next_page}/>
        }
    }
  return (
    <div className='relative h-dvh bg-[url("/Green_crop_background.jpg")] bg-cover font-sans'>
    <div className="absolute inset-0 bg-white/30"></div>

    <div className="relative h-full flex justify-center items-center">
        {render_step()}
    </div>
</div>
  )
}

export default Mainsec