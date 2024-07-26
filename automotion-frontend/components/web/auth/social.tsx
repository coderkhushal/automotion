"use client"
import React, { useEffect } from 'react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { fetchOauthLink } from '@/actions/register'




const Social =() => {
  const router = useRouter()
  const handleGoogle =async ()=>{
    const link = await fetchOauthLink()
    // const link ="https://accounts.google.com/o/oauth2/auth?client_id=957468320773-c64nfdujuk8dc7s2pbo4am2rm7vmd83p.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Fec2-65-2-175-219.ap-south-1.compute.amazonaws.com%3A8080%2Foauth%2Flogin%2Fcallback&response_type=code&scope=openid+email+profile"
    if(link){

      router.push(link)
    }
    else{
      alert("Sorry Oauth is not available right now")
    }
  } 
  useEffect(()=>{
    console.log(window.URL)
  }, [])
  return (
    <div className='flex w-full gap-x-4'>
        <Button variant={"outline"} className='w-full' onClick={handleGoogle}>
            <FcGoogle className='text-2xl w-full'/>

        </Button>
        
    </div>
  )
}

export default Social