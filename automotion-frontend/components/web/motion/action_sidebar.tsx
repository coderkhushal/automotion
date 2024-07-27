"use client"
import { getAvailableActions } from '@/actions/motion'
import { Label } from '@/components/ui/label'
import { ActionType } from '@/types'
import React, { useEffect, useState } from 'react'

const ActionSidebar = ({action}:{action: ActionType| null}) => {
  const [availableAction, setavailableAction] = useState<ActionType[] | null>(null)
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
  if(!action)
    return <h1 className='text-2xl text-center'>Loading</h1>

  else if( action.type.name=="email"){
    return (
      <div className="flex space-y-4 flex-col w-full h-full">
        <Label className='text-xl w-full text-start px-2'>Name</Label>
        <h1 className='font-semibold bg-gray-200 p-2 rounded-xl text-xl w-full text-start px-2'>{action.name}</h1>
        <Label className='text-xl w-full text-start px-2'>Action Number</Label>
        <h1 className='font-semibold bg-gray-200 p-2 rounded-xl text-xl w-full text-start px-2'>{action.sortingOrder}</h1>
        
        <Label className='text-xl w-full text-start px-2 font-semibold'>Metadata</Label>
        
        {(action.actionmetadata && Object.keys(action.actionmetadata).length>0 ) &&Object.keys(action.actionmetadata).map((key, index)=>(
          <div className="flex w-full flex-col space-y-2" key={index}>

        <Label className='text-xl w-full text-start px-2 '>{key}</Label>
        <h1 className='font-semibold bg-gray-200 p-2 rounded-xl text-xl w-full text-start px-2'> {action.actionmetadata[key]} </h1>
        </div>
        ))}

        
      </div>
    )
  }
}

export default ActionSidebar