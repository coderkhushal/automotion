import { getAvailableActions, getAvailableTriggers } from '@/actions/motion'
import { ActionType, TriggerType } from '@/types'
import { Label } from '@radix-ui/react-label'
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
const TriggerSidebar = ({ trigger }: { trigger: TriggerType | null }) => {
  const [availableTriggers, setavailableTriggers] = useState<{id: string, name:string}[] | null>(null)
  useEffect(() => {
    fetchAvailableActions()
  }, [])
  const fetchAvailableActions = async () => {
    const data = await getAvailableTriggers()
    if (data.success) {
      console.log(data.data)
      setavailableTriggers(data.data)
    }
    else {
      alert("actions not found")
    }
  }
  if (!trigger)
    return <h1 className='text-2xl text-center'>Loading</h1>

  else if (trigger.type.name == "webhook") {
    return (
      <div className="flex flex-col w-full h-full space-y-3">
        <Label className='text-xl w-full text-start px-2 '>Trigger</Label>
        <h1 className='font-semibold bg-gray-200 p-2 rounded-xl text-xl w-full text-start px-2'> {trigger.type.name} </h1>
        <Label className='font-semibold text-xl w-full text-start px-2 '>Available Triggers</Label>
        <Select >
          <SelectTrigger className="w-full bg-gray-200">
            <SelectValue placeholder={(availableTriggers && availableTriggers[0].name) ? availableTriggers[0].name : ""} />
          </SelectTrigger>
          <SelectContent>

            {(availableTriggers && availableTriggers.length > 0) && availableTriggers.map((trigger, index) => (
              <SelectItem key={index} value={trigger.name}>{trigger.name} </SelectItem>
            ))}
          </SelectContent>
        </Select>


      </div>
    )
  }
}

export default TriggerSidebar