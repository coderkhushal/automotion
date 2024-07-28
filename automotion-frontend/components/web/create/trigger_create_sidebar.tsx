import { getAvailableActions, getAvailableTriggers } from '@/actions/motion'
import { ActionType, MotionCreateType, TriggerType } from '@/types'
import { Label } from '@radix-ui/react-label'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
const TriggerCreateSidebar = ({ motion, setmotion , setselectedTriggerName}: { motion: MotionCreateType, setmotion: (x: MotionCreateType) => void , setselectedTriggerName:(x: string)=>void }) => {
    const [availableTriggers, setavailableTriggers] = useState<{ id: string, name: string }[] | null>(null)

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
    const handleavailableTriggerChange = (value: string
    ) => {
        console.log(value)
        if (availableTriggers) {

            let x = availableTriggers.find((trigger) => trigger.name == value)
            if (x) {

                setmotion({ ...motion, availableTriggerId: x.id })
                setselectedTriggerName(value)
            }

        }
    }

    return (
        <div className="flex flex-col w-full h-full space-y-3">
            
            <Label className='font-semibold text-xl w-full text-start px-2 '>Available Triggers</Label>
            <Select onValueChange={handleavailableTriggerChange}>
                <SelectTrigger className="w-full bg-gray-200">
                    <SelectValue placeholder={ ""} />
                </SelectTrigger>
                <SelectContent>

                    {(availableTriggers && availableTriggers.length > 0) && availableTriggers.map((trigger, index) => (
                        <SelectItem key={index} value={trigger.name}>{trigger.name} </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Label className='text-xl w-full text-start px-2 '>Trigger</Label>
            <Input className='font-semibold bg-gray-200 p-2 rounded-xl text-lg w-full text-start px-2' value={(motion.availableTriggerId ?? "") && availableTriggers && availableTriggers.find((e) => e.id == motion.availableTriggerId)?.name.toString() || ""} />

        </div>
    )
}


export default TriggerCreateSidebar