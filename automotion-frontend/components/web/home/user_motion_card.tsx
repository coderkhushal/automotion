import { deleteMotion } from '@/actions/motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MotionType } from '@/types'
import { ArrowRight, Trash } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
  const router= useRouter()
  return (
    
    <Card onClick={()=>router.push("/dashboard/motion/"+motion.id)} className='w-full cursor-pointer transition-all hover:scale-105 h-full mx-auto relative   border-muted-foreground bg-neutral-100 rounded-xl p-6 text-zinc-900 text-center '>
      <Link className='absolute right-5 top-5' href={`motion/${motion.id}`}>
      <ArrowRight className='transition-all hover:scale-110' />
      </Link>
        <Trash onClick={handledelete} className='bottom-5 cursor-pointer right-5 absolute'/>
        <CardHeader>
          <CardTitle>

          {motion.id}
          </CardTitle>
        </CardHeader>
        <CardContent>

      <div className="flex w-full  h-2/3 lg:h-full p-4 space-x-4 overflow-x-auto ">
        <div className="flex h-full flex-col bg-gradient-to-r from-lime-50 to-lime-200 p-4 rounded-xl font-bold "> <span className='font-bold text-gray-600 my-2'>Trigger:</span> {motion.trigger.type.name}</div>
        
     
        {motion.actions.map((action,index)=>(
          
          <div key={index} className="font-bold flex lg:w-[20vw] text-start lg:text-center  flex-col bg-gradient-to-r from-lime-200 to-yellow-300 rounded-xl p-4 pb-0 lg:pb-4"> <span className='font-bold my-2 text-gray-600'>Action:</span> <span className='truncate'>
            {action.name} </span></div>
        ))}
        
      </div>
        </CardContent>
    </Card>
  )
}

export default UserMotionCard