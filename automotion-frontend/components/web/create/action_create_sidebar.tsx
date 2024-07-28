"use client"
import { getAvailableActions } from '@/actions/motion'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ActionType, AvaialbleAction, MotionCreateType } from '@/types'

import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const ActionCreateSidebar = ({ motion, action, setmotion, actionnum }:
  {
    motion: MotionCreateType,
    action: { name: string, availableActionId: string, actionmetadata: any },
    setmotion: (x: MotionCreateType) => void,
    actionnum: number

  }) => {
  const [availableAction, setavailableAction] = useState<AvaialbleAction[] | null>(null)
  useEffect(() => {
    fetchAvailableActions()
  }, [])
  const fetchAvailableActions = async () => {
    const data = await getAvailableActions()
    if (data.success) {
      console.log(data.data)
      setavailableAction(data.data)
      
    }
    else {
      alert("actions not found")
    }
  }
  const handleOnchange = (value: any, variant: string) => {
    switch (variant) {
      case "ACTION_NAME":
        let x = { ...motion }
        x.actions[actionnum].name = value
        
        setmotion(x)
        break;
        case "AVAILABLE_ACTION":
          let y = { ...motion }
        let a: AvaialbleAction| undefined = availableAction?.find((action) => action.name == value)
        if(a){
          
          y.actions[actionnum].availableActionId = a?.id
          y.actions[actionnum].actionmetadata = availableAction?.find((action) => action.name == value)?.requiredfields || {}
          setmotion(y)
        }
        break;
      case "ACTION_METADATA":
        let z = { ...motion }
        z.actions[actionnum].actionmetadata[value.key] = value.value
        setmotion(z)
        break;
      default:
        break;
    }
    console.log(motion)

  }

  return (
    <div className="flex space-y-4 flex-col w-full h-full overflow-y-auto">
      <Label className='text-xl w-full text-start px-2'>Name</Label>
      <Input onChange={(e) => handleOnchange(e.target.value, "ACTION_NAME")} className='font-semibold bg-gray-200 p-2 rounded-xl text-xl w-full text-start px-2' value={motion.actions[actionnum].name} />
      <Label className='text-xl w-full text-start px-2'>Action Number</Label>
      <h1 className='font-semibold bg-gray-200 p-2 rounded-xl text-xl w-full text-start px-2'>{actionnum + 1}</h1>
      <Label className='font-semibold text-xl w-full text-start px-2 '>Available Action</Label>
            <Select onValueChange={(e)=>handleOnchange(e, "AVAILABLE_ACTION")}>
                <SelectTrigger className="w-full bg-gray-200">
                    <SelectValue  />
                </SelectTrigger>
                <SelectContent>

                    {(availableAction && availableAction.length > 0) && availableAction.map((action, index) => (
                        <SelectItem key={index} value={action.name}>{action.name} </SelectItem>
                    ))}
                </SelectContent>
            </Select>

      <Label className='text-xl w-full text-start px-2 font-semibold'>Metadata</Label>
      {availableAction?.find((e)=>e.id===(motion.actions[actionnum].availableActionId))?.name=="email" && <Link href={"https://gist.github.com/coderkhushal/a20706e03dbbf5ab30498d41bbd3c451"}><Button variant={"link"} className='text-green-500 py-0'>See how to generate</Button></Link>}
                    
        {motion.actions[actionnum].actionmetadata && Object.keys(motion.actions[actionnum].actionmetadata).length > 0 && Object.keys(motion.actions[actionnum].actionmetadata).map((key, index) => (
          <div className="flex w-full flex-col space-y-2" key={index} >
          <Label className='text-xl w-full text-start px-2 '>{key}</Label>
          
          <Input onChange={(e) => handleOnchange({key, value:e.target.value}, "ACTION_METADATA")} className='font-semibold bg-gray-200 p-2 rounded-xl text-xl w-full text-start px-2' value={motion.actions[actionnum].actionmetadata[key]} />
          </div>
        ))}

    </div>
  )

}

export default ActionCreateSidebar