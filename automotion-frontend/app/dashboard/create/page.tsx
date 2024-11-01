"use client"

import { createMotion } from '@/actions/motion'
import { Button } from '@/components/ui/button'
import ActionCreateSidebar from '@/components/web/create/action_create_sidebar'
import TriggerCreateSidebar from '@/components/web/create/trigger_create_sidebar'

import { useToast } from '@/hooks/use-toast'
import { MotionCreateType } from '@/types'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const SingleMotion = ({ params }: { params: { id: string } }) => {
  const toast = useToast()
  const router = useRouter()
  const [variant, setvariant] = useState<"ACTION" | "TRIGGER">("TRIGGER")
  const [loading, setloading]  = useState<boolean>(false)
  const [motion, setmotion] = useState<MotionCreateType>({
    "availableTriggerId": "",
    "triggerMetadata": {},
    "actions": [{
      "availableActionId": "",
      "name": "",
      "actionmetadata": {}
    }]
  })
  const [selectedActionnum, setselectedActionnum] = useState<number>(0)
  const [selectedTriggerName, setselectedTriggerName] = useState<string>("")
  const handleCreateMotion = async () => {
    const data = await createMotion(motion)
    if (data.success) {
      // alert("Motion Created Successfully")
      toast.toast({
        title:"Motion Created Successfully"
      })
      router.push("/dashboard")

    }
    else {
      toast.toast({
         title:"Error Creating motion"
      })
    }
  }

  return (
    <div className='h-full flex flex-col w-full  p-4'>

      <div className="flex w-full h-full">

        <div className="flex w-full h-4/5  items-center flex-col space-y-3 my-8">
          <h1 className='font-bold text-xl w-1/2 text-start px-2'>Trigger</h1>
          <div className={`bg-gradient-to-r from-red-300 to-lime-300  transition-all text-zinc-900 cursor-pointer shadow-2xl text-xl font-semibold  w-1/2 rounded-2xl py-7 px-2  text-center ${variant=="TRIGGER" && "scale-110"}`} onClick={() => setvariant("TRIGGER")}>{selectedTriggerName}</div>
          <h1 className='font-bold text-xl w-1/2 text-start px-2'>Actions</h1>
          {motion?.actions && motion.actions.length === 0 && <h1 className='text-center text-2xl'>No Actions Found</h1>}
          {(motion?.actions && motion.actions.length > 0) && motion.actions.map((e, index) => (
            <div key={index} className={`bg-gray-300 bg-gradient-to-r from-orange-300 to-amber-400 transition-all cursor-pointer text-gray-800 text-xl font-semibold shadow-2xl  w-1/2 rounded-2xl py-7 px-2 text-center ${variant=="ACTION" && selectedActionnum==index && "scale-110"}`}onClick={() => { setvariant("ACTION"); setselectedActionnum(index) }}>{index + 1}. {e.name}</div>
          ))}
          {!motion?.actions && <h1 className='text-center text-2xl'>Loading...</h1>}
      <Button onClick={handleCreateMotion} className='mx-auto w-1/2 bg-green-400 hover:bg-green-500 font-bold text-lg ' variant={"default"}>Create</Button>
        </div>
                <div className={`w-1/3 rounded-2xl rounded-br-sm hidden border-muted-foreground border-black border ${variant=="TRIGGER" ? "bg-gradient-to-tr from-red-300 to-lime-300"  :"bg-gradient-to-tl from-orange-300 to-amber-200"} h-full p-4 lg:flex`}>
          {variant == "TRIGGER" ? <TriggerCreateSidebar setmotion={setmotion} setselectedTriggerName={setselectedTriggerName} motion={motion} /> : <ActionCreateSidebar motion={motion} action={motion.actions[selectedActionnum]} setmotion={setmotion} actionnum={selectedActionnum} />}
        </div>
      </div>

    </div>

  )
}

export default SingleMotion