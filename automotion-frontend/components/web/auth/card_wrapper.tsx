"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface CardWrapperProps {
    children: React.ReactNode
    backbuttonlabel: string
    backbuttonhref: string
    heading: string
}



const CardWrapper = ({ children, backbuttonhref, backbuttonlabel, heading }: CardWrapperProps) => {
    return (
        <>
            <Card className='w-[400px]'>

                <CardHeader className='text-center'>
                    <CardTitle className="w-full text-center specialtext h-full py-2">
                        Automotion
                    </CardTitle>
                    <CardDescription className='text-center'>
                        {heading}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {children}
                </CardContent>
                <CardFooter className='flex justify-center'>
                    <Link href={backbuttonhref}>
                        <Button variant={"link"} className='text-tertiary'>
                            {backbuttonlabel}
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </>
    )
}

export default CardWrapper