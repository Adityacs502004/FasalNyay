import { useState } from 'react'
import Issuebar from '../Issuebar/Issuebar'
import Api from '../../../Service/api'

const Section1 = ({ setClaim, onNext }) => {
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function onclick_status(status){
        if (isSubmitting) return
        setIsSubmitting(true)
        try {
            const send_status = await Api.post('/claims', {
                status : status
            })
            if(send_status.data.success){
                setClaim((current) => ({
                    ...current,
                    ...send_status.data.data
                }))
                onNext()
            }
        } catch {
            console.log("Error sending status data")
        } finally {
            setIsSubmitting(false)
        }
    }

  return (
    <div className='w-full md:w-3/5 h-[90vh] border-2 border-gray-600 bg-amber-100/80 rounded-xl flex overflow-hidden'>
        {/* Left picture section */}
        <div className='hidden md:block md:w-[40%] h-full bg-[url("/Section1_image.png")] 
        bg-cover bg-no-repeat rounded-bl-xl rounded-tl-xl'></div>
        {/* Right section */}
        <div className='w-full md:w-[60%] h-full flex flex-col p-4 justify-around overflow-y-auto'>
            <span className='text-gray-600 font-extrabold self-end-safe'>1 of 5</span>
            <Issuebar disabled={isSubmitting} click={onclick_status} status={"Rejected"} text={"My claim was rejected"} image={'bg-[url("/decline.png")]'} detail={"My claim was not accepted despite valid document"}/>
            <Issuebar disabled={isSubmitting} click={onclick_status} status={"Delayed"} text={"Payment is delayed"} image={"bg-[url('/timer.png')]"} detail={"It has been a long time and i haven't received the payment yet"}/>
            <Issuebar disabled={isSubmitting} click={onclick_status} status={"No inspection"} text={"No field survey was conducted"} detail ={"No officals came to inspect my field"} image={"bg-[url('/farm_survey.png')]"}/>
            <Issuebar disabled={isSubmitting} click={onclick_status} status={"calculation error"} text ={"Yield assessment dispute"} detail={"I dispute the reported yield or crop-loss assessment"} image ={"bg-[url('/calculator.png')]"}/>
        </div>
    </div>
  )
}

export default Section1