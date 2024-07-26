
"use client"
import { getGetToken } from "./getGetToken"

export const getGetAuthHeaders = () => {
    const token = getGetToken() ? getGetToken() : null
    if(token){
        return {
            'Content-Type': 'application/json',
            Authorization : `${token}`
        }

    }
    
}