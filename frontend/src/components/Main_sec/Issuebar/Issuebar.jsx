const Issuebar = (props) => {
  return (
    <button type='button' disabled={props.disabled} onClick={()=>props.click(props.status)} className='w-full h-fit flex p-4 text-left cursor-pointer hover:bg-gray-200 hover:scale-105 transition-transform duration-300 ease-in-out bg-gray-100 rounded-xl border-2 disabled:opacity-50 disabled:cursor-wait'>
                <div className={`w-18 h-18 ${props.image} bg-contain bg-no-repeat`}></div>
                <div className='flex-1 h-full ml-6 flex flex-col gap-2 justify-center items-center'>
                    <span className='text-gray-700 font-bold self-start text-2xl'>{props.text}</span>
                    <span className='text-amber-950 self-start  text-md'>{props.detail}</span>
                </div>
          </button>
  )
}

export default Issuebar