"use client"
import { getMotionsOfUser } from '@/actions/motion'
import UserMotionCard from '@/components/web/home/user_motion_card'
import { useAuthContext } from '@/context/AuthContext'
import { MotionType } from '@/types'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const HomePage = () => {
    const {user, fetchUser,logout} = useAuthContext()
    const [motions, setmotions] = useState<MotionType[] | null> (null)
    const router= useRouter()
    useEffect(()=>{
        fetchUserMotions()        
    },[user])
    const fetchUserMotions = async () => {
        if(!user){
            await fetchUser()
            
        }
        if(user){
            const data= await getMotionsOfUser();
            if(data.success){
                setmotions(data.data.motions)   
                
            }
            else{
                alert("motions not found")
            }
        }
    }
  return (
    <div className="w-full h-4/5 lg:h-full p-10 flex flex-col">
        <h1 className='w-full text-center font-bold text-2xl'>Automotion</h1>
        <h1 className='w-full  font-semibold text-2xl'>My Motions</h1>
        <LogOut className='absolute top-5 right-5 ' onClick={logout}/>
        {!motions && <h1 className='text-center text-2xl'>Loading...</h1>}
        {motions && motions.length===0 && <h1 className='text-center text-2xl'>No Motions Found</h1>}
        
        {(motions && motions.length>0 ) && 
            <div className='grid grid-cols-1 gap-4 my-10 lg:grid-cols-2 w-full'>
            {motions.map((motion, index)=>
                <UserMotionCard key={index} motion={motion}/>
            )}
        </div>
        }
  
  </div>
  )
}

export default HomePage