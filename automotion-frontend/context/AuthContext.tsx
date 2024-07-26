"use client"

import {  getUserByToken } from "@/actions/user";

import { getGetToken } from "@/hooks/getGetToken";
import { getRemoveToken } from "@/hooks/getRemoveToken";

import { UserType } from "@/types";
import { useParams, usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
    fetchUser: ()=>Promise<void>
    logout: ()=>void
    user : UserType | null
    setShowCitizenInsights : (value:boolean)=>void
    showCitizenInsights: boolean
}

export const AuthContext = createContext<AuthContextType>({
    fetchUser: async()=>{},
    logout: ()=>{},
    user: null,
    setShowCitizenInsights: (value:boolean)=>{},
    showCitizenInsights: false
})

const AuthState = ({children}:{children:React.ReactNode})=>{
    const [user, setuser] = useState<UserType | null>(null)
    const [showCitizenInsights, setShowCitizenInsights] = useState<boolean>(true)
    const router = useRouter()
    const pathname = usePathname()
    const fetchUser=async()=>{
        // check if public or not
        if(pathname=="/redirect"){
            return;
        }
        const token =getGetToken()
        
        if( !token){
            router.push("/auth/login")
            return;
        }
        const user: UserType | null= await getUserByToken({token})
       
        if(!user){
            getRemoveToken()

            return;
        }
       
     
        setuser((value)=>user)
    }
    const logout=()=>{
        getRemoveToken()
        router.push("/auth/login")
        setuser(null)
    
    }
    useEffect(()=>{
        fetchUser()
    },[])
    return(
        <AuthContext.Provider value={{fetchUser,user, logout, showCitizenInsights, setShowCitizenInsights}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthState
export const useAuthContext = ()=> useContext(AuthContext)