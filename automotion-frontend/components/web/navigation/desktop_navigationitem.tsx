"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const DeskTopNavigationItem = ({name, Icon, href, isExpanded}:{name: string, Icon: any,href: string, isExpanded: boolean}) => {
  const pathname= usePathname()
  return (
    <li className="opcion-con-desplegable">
      <Link href={href}>
          <div className={`flex ${pathname==href && "bg-gray-700"} rounded-lg items-center justify-between p-2 hover:bg-gray-700`}>
            <div className="flex space-x-4 items-center">
              <Icon className="size-6" />
              {isExpanded && <span className='text-xl'>{name}</span>}
            </div>
            <i className="fas fa-chevron-down text-xs"></i>
          </div>
      </Link>
          
        </li>
  )
}

export default DeskTopNavigationItem