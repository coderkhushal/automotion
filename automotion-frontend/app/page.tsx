"use client"
import { Button } from '@/components/ui/button'
import { MediaModal } from '@/components/web/mediamodal/modal'
import { useAuthContext } from '@/context/AuthContext'
import { IconArrowLeft, IconArrowLeftFromArc, IconArrowRight } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const LandingPage = () => {
  const {user} = useAuthContext()
  return (
    <div className='bg-neutral-100 flex flex-col items-center w-full h-full'>
      <nav className='flex py-2 px-5 w-full justify-between bg-lime-100 h-14'>
        <div className="flex font-bold text-2xl space-x-1">
          
      <Image unoptimized src="/logo.png" height={5} width={6} alt="Logo" className="h-full w-auto" />
        Automotion

        </div>
      {user ? <Button className='bg-lime-500 hover:bg-lime-600 transition-all '><Link href="/dasboard" className='flex gap-x-2 font-bold py-2 '>Dashboard <IconArrowRight/></Link></Button> : <Button className='bg-white text-black font-bold '>Login</Button>}
      </nav>
      <h1 className='text-8xl mt-4 font-bold font-serif w-2/3 text-center'>Automate Work with</h1>
      <h1 className='text-8xl font-bold font-serif w-2/3 text-center text-lime-500'>Automotion</h1>
    <div className='relative h-full'>

      <div className='grid grid-cols-1 my-16 gap-2 h-full'>


        <MediaModal

          videoSrc={

            'https://videos.pexels.com/video-files/7710243/7710243-uhd_2560_1440_30fps.mp4'

          }

        />

      </div>

    </div>
      
    </div>
  )
}

export default LandingPage