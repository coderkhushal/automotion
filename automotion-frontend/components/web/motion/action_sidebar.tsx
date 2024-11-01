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
    return <h1 className='text-2xl text-center'>

              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <style>
      {`.spinner {
          transform-origin: center;
          animation: rotate 0.75s infinite linear;
        }
        @keyframes rotate {
          100% { transform: rotate(360deg); }
        }`}
    </style>
    <path
      d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
      className="spinner"
    />
  </svg>
    </h1>

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