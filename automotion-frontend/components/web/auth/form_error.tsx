import { TriangleAlert } from 'lucide-react'
import React from 'react'

interface FormErrorProps{
    message ?: string
}

const FormError = ({ message}: FormErrorProps) => {
    if(!message){
        return (
            <span></span>
        )
    }
  return (
    <div className='w-full px-4 py-4 flex gap-x-2 rounded-lg  bg-red-400'>
        <TriangleAlert/> 
        {message}
    </div>
  )
}

export default FormError