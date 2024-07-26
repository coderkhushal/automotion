"use client"
import { routes} from '@/constants'
import React from 'react'
import MobileNavigationItem from './mobile_navigation_item'
import { useAuthContext } from '@/context/AuthContext'

const MobileNavigation = () => {
    const {showCitizenInsights} = useAuthContext()
    return (
        <div className='lg:hidden fixed bottom-0 w-full '>

      
        <div className='lg:hidden w-full m-auto '>

            <div className=" bg-gray-600 shadow-lg ">
                <div className="flex">


                    {routes.map((e, index) =>
                    {
                        if(e.name==="Citizen Insights"){
                            if(showCitizenInsights)
                            return <MobileNavigationItem key={index} Icon={e.Icon} href={e.href} />
                        }
                        else{
                            return <MobileNavigationItem key={index} Icon={e.Icon} href={e.href} />
                        }
                    }
                    )}

                </div>
            </div>
        </div>
        </div>
    )
}

export default MobileNavigation