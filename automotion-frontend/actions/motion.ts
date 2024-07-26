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
