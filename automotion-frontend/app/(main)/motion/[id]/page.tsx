"use client"
import { getMotionById } from '@/actions/motion'
import { Button } from '@/components/ui/button'
import ActionSidebar from '@/components/web/motion/action_sidebar'

import TriggerSidebar from '@/components/web/motion/tirgger_sidebar'
import { useAuthContext } from '@/context/AuthContext'
import { ActionType, MotionType } from '@/types'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const SingleMotion = ({ params }: { params: { id: string } }) => {
    const { user, fetchUser } = useAuthContext()
    const router = useRouter()
    const [variant, setvariant] = useState<"ACTION" | "TRIGGER">("TRIGGER")
    const [motion, setmotion] = useState<MotionType | null>(null)
    const [selectedAction, setselectedAction] = useState<ActionType | null>(null)
    useEffect(() => {
        fetchSingleMotion()
    }, [user])
    const fetchSingleMotion = async () => {
        if (!user) {
            await fetchUser()
            
        }
        if (user) {
            const data = await getMotionById(params.id)
            if (data.success) {
                console.log(data.data.motion)
                setmotion(data.data.motion)
            }
            else {
                alert("motion not found")
            }
        }
    }

    return (
        <div className='h-full flex flex-col w-full  p-4'>
      
            <div className="flex w-full h-full">

                <div className="flex w-full justify-center items-center flex-col space-y-2 my-8">
                    <h1 className='font-bold text-xl w-1/2 text-start px-2'>Trigger</h1>
                    <div className='bg-gray-300 text-zinc-900 cursor-pointer shadow-2xl text-xl font-semibold border-black border-2 w-1/2 rounded-2xl py-7 px-2  text-center' onClick={() => setvariant("TRIGGER")}>{motion?.trigger?.type.name}</div>

                    <h1 className='font-bold text-xl w-1/2 text-start px-2'>Actions</h1>
                    {motion?.actions && motion.actions.length === 0 && <h1 className='text-center text-2xl'>No Actions Found</h1>}
                    {(motion?.actions && motion.actions.length>0) && motion.actions.map((e, index)=>(
                        <div key={index} className='bg-gray-300 cursor-pointer text-gray-800 text-xl font-semibold shadow-2xl border-black border-2 w-1/2 rounded-2xl py-7 px-2 text-center' onClick={() => { setvariant("ACTION"); setselectedAction(e) }}>{index+1}. {e.name}</div>
                    ))}
                    {!motion?.actions && <h1 className='text-center text-2xl'>Loading...</h1>}
                </div>
                <div className="w-1/3 hidden bg-quarternary h-full p-4 lg:flex">

                    {variant == "TRIGGER" ? <TriggerSidebar trigger={motion?.trigger ? motion.trigger : null} /> : <ActionSidebar action={selectedAction} />}
                </div>
                
            </div>

        </div>

    )
}

export default SingleMotion