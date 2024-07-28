import { deleteMotion } from '@/actions/motion'
import { MotionType } from '@/types'
import { ArrowRight, Trash } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const UserMotionCard = ({motion}:{motion: MotionType}) => {
  const handledelete= async()=>{
    const data= await deleteMotion(motion.id)
    if(data.success){
      alert("Motion Deleted")
      window.location.reload()
    }
    else{
      alert("Error in deleting motion")
    }
  }
  return (
    
    <div className='w-full h-full mx-auto relative   border-black bg-primarydark rounded-xl p-6 text-zinc-900 text-center '>
      <Link className='absolute right-5 top-5' href={`motion/${motion.id}`}>
      <ArrowRight className='transition-all hover:scale-110' />
      </Link>
        <Trash onClick={handledelete} className='bottom-5 cursor-pointer right-5 absolute'/>
    <h1 className='font-semibold'>

      {motion.id}
    </h1>
      <div className="flex w-full  h-2/3 lg:h-full p-4 space-x-4 overflow-x-auto ">
        <div className="flex h-full flex-col  bg-tertiary p-4 rounded-xl "> <span className='font-bold my-2'>Trigger:</span> {motion.trigger.type.name}</div>
       
     
        {motion.actions.map((action,index)=>(

          <div key={index} className="flex lg:w-[20vw] text-start lg:text-center  flex-col bg-tertiary rounded-xl p-4 pb-0 lg:pb-4"> <span className='font-bold my-2'>Action:</span> <span className='truncate'>
            {action.name} </span></div>
        ))}
        
      </div>
    </div>
  )
}

export default UserMotionCard