"use client"
import { getMotionById } from '@/actions/motion'
import ActionSidebar from '@/components/web/motion/action_sidebar'

import TriggerSidebar from '@/components/web/motion/tirgger_sidebar'
import { useAuthContext } from '@/context/AuthContext'
import { toast, useToast } from '@/hooks/use-toast'
import { ActionType, MotionType } from '@/types'
import { CopyIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const SingleMotion = ({ params }: { params: { id: string } }) => {
    const { user, fetchUser } = useAuthContext()
    const router = useRouter()
    const [variant, setvariant] = useState<"ACTION" | "TRIGGER">("TRIGGER")
    const [motion, setmotion] = useState<MotionType | null>(null)
    const [selectedAction, setselectedAction] = useState<ActionType | null>(null)
    const toast = useToast()
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
                toast.toast({ title: "Motion not found !" })
            }
        }
    }

    return (
        <div className='h-full  flex flex-col w-full  p-4'>
            {user && 
            <div className=" justify-between font-bold text-gray-600 p-4 font-sans cursor-pointer shadow-xl text-sm lg:text-xl   rounded-xl flex w-full bg-lime-100 ">
                <div></div>

            <div 
>

                POST : https://hookservice.onrender.com/hooks/catch/{user?.id}/{params.id}  
            </div>
            <span className='text-black'
            
            onClick={() => {
                navigator.clipboard.writeText(`curl --request POST \
                --url https://hookservice.onrender.com/hooks/catch/${user.id}/${params.id} \
  --header 'content-type: application/json' \
  --data '{
      "motionId": "",
  "metadata":{
    "to":"",
    "subject":"",
    "text":"" 
}
}
`); toast.toast({ title: "Curl Copied , Please Edit sample Fields" })
}}
            ><CopyIcon/></span>

                </div>
            }
            <div className="flex w-full h-full">

                <div className="flex w-full items-center flex-col space-y-2 my-8">
                    {motion?.actions &&
                        <>
                            <h1 className='font-bold text-xl w-1/2 text-start px-2'>Trigger</h1>

                            <div className='bg-gradient-to-r from-red-300 to-lime-300 text-zinc-900 cursor-pointer shadow-2xl text-xl font-semibold  w-1/2 rounded-2xl py-7 px-2  text-center' onClick={() => setvariant("TRIGGER")}>{motion?.trigger?.type.name}</div>

                            <h1 className='font-bold text-xl w-1/2 text-start px-2'>Actions</h1>
                        </>
                    }                    {motion?.actions && motion.actions.length === 0 && <h1 className='text-center text-2xl'>No Actions Found</h1>}
                    {(motion?.actions && motion.actions.length > 0) && motion.actions.map((e, index) => (
                        <div key={index} className='cursor-pointer text-gray-800 text-xl font-semibold shadow-2xl bg-gradient-to-r from-orange-300 to-amber-400 w-1/2 rounded-2xl py-7 px-2 text-center' onClick={() => { setvariant("ACTION"); setselectedAction(e) }}>{index + 1}. {e.name}</div>))}
                    {!motion?.actions && <h1 className='text-center text-2xl'>

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
                    </h1>}
                </div>
                <div className={`w-1/3 rounded-2xl rounded-br-sm hidden border-muted-foreground border-black border ${variant=="TRIGGER" ? "bg-gradient-to-tr from-red-300 to-lime-300"  :"bg-gradient-to-tr from-orange-300 to-amber-200"} h-full p-4 lg:flex`}>

                    {variant == "TRIGGER" ? <TriggerSidebar trigger={motion?.trigger ? motion.trigger : null} /> : <ActionSidebar action={selectedAction} />}
                </div>
            </div>

        </div>

    )
}

export default SingleMotion