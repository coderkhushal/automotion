import { CheckCircle, TriangleAlert } from 'lucide-react'
import React from 'react'

interface FormSuccessProps{
    message ?: string
}

const FormSuccess= ({ message}:FormSuccessProps) => {
    if(!message){
        return (
            <span></span>
        )
    }
  return (
    <div className='w-full px-4 py-4 flex gap-x-2 rounded-lg  bg-green-300'>
        <CheckCircle /> 
        {message}
    </div>
  )
}

export default FormSuccess