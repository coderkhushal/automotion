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
    <div className="w-full flex-1 h-4/5 lg:h-full p-10 flex flex-col">
        <h1 className='w-full text-center font-bold text-4xl'>DashBoard</h1>
        <h1 className='w-full  font-semibold text-2xl'>My Motions</h1>
{/* <Button onClick={()=>signIn("Google")}>demo</Button> */}
        {!motions && <div className='flex h-full w-full items-center justify-center'>  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
  </svg></div>}
        {motions && motions.length===0 && <h1 className='text-center text-2xl'>No Motions Found</h1>}
        
        {(motions && motions.length>0 ) && 
            <div className='grid grid-cols-1 gap-8 my-10 lg:grid-cols-3 w-full'>
            {motions.map((motion, index)=>
                <UserMotionCard key={index} motion={motion}/>
            )}
        </div>
        }
  
  </div>
  )
}

export default HomePage