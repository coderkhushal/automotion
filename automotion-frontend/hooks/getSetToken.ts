"use client"
export const getSetToken = (token: string) => {
    
    window.localStorage.setItem("token", token)
}