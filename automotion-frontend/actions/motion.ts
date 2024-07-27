import { getGetAuthHeaders } from "@/hooks/getGetAuthHeaders";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getMotionsOfUser= async()=>{
    try{
        const res = await fetch(`${BASE_URL}/api/v1/motion/`,
        {
            method: 'GET',
            headers: getGetAuthHeaders()
        }
    )
    const data = await res.json()
    
    if(res.status === 200){
        return {success: true, data}
    }
    return {success: false, error: data.msg}
}
catch(err){
    return {success: false, error: "Internal Server Error"}

}
}

export const getMotionById= async(id: string)=>{
    try{
        const res = await fetch(`${BASE_URL}/api/v1/motion/${id}`,
        {
            method: 'GET',
            headers: getGetAuthHeaders()
        })

        const data = await res.json()
        if(res.status === 200 || data.motion==null){
            return {success: true, data}
        }
        return {success: false, error: data.msg}

    
    }
    catch(err){
        return {success: false, error: "Internal Server Error"}
    }
}

export const deleteMotion = async(id: string)=>{
    try{
        const res = await fetch(`${BASE_URL}/api/v1/motion/${id}`,
        {
            method: 'DELETE',
            headers: getGetAuthHeaders()
        })
        const data = await res.json()
        if(res.status === 200){
            return {success: true, data: data.message}
        }
        return {success: false, error: data.msg}
    }
    catch(err){
        return {success: false, error: "Internal Server Error"}
    }
}

export const getAvailableTriggers = async()=>{
    try{
        const res = await fetch(`${BASE_URL}/api/v1/trigger/available`,
        {
            method: 'GET',
            headers: getGetAuthHeaders()
        }
    )
    const data = await res.json()
    
    if(res.status === 200){
        return {success: true, data: data.availableTriggers}
    }
    return {success: false, error: data.msg}
}
catch(err){
    return {success: false, error: "Internal Server Error"}

}
}

export const getAvailableActions = async()=>{
    try{
        const res = await fetch(`${BASE_URL}/api/v1/action/available`,
        {
            method: 'GET',
            headers: getGetAuthHeaders()
        }
    )
    const data = await res.json()
    
    if(res.status === 200){
        return {success: true, data: data.actions}
    }
    return {success: false, error: data.msg}
}
catch(err){
    return {success: false, error: "Internal Server Error"}

}
}