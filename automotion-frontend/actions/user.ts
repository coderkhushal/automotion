import { getGetAuthHeaders } from "@/hooks/getGetAuthHeaders"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
export const getUserByToken= async({token}:{token:string})=>{
    try{

        const res = await fetch(`${BASE_URL}/api/v1/user/`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "authorization": token
            }
        }
    )
    const data = await res.json()
    
    if(res.status === 200){
        return data
    }
    return null
}
catch(err){
    return null

}
}