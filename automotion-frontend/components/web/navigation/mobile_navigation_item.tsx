import Link from 'next/link'
import React from 'react'

const MobileNavigationItem = ({ Icon, href }: { Icon: any, href: string }) => {
  return (
    <div className="flex-1 group">
      <Link href={href}  className='flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-white group-hover:text-gray-500 border-b-2 border-transparent group-hover:border-gray-500'>

        <span className="block px-1 pt-1 pb-2">
          <Icon className="size-5"/>

        </span>

      </Link>
    </div>
  )
}

export default MobileNavigationItem