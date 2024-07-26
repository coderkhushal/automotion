"use client"
import {jwtDecode} from 'jwt-decode'


export const getIsTokenExpired= (token: string) => {
    
    if (token) {
        try{

            const {exp}= jwtDecode(token)
            if(exp && exp < Date.now( )/1000){
                return true;
            }
            return false;
        }
        catch(err){
            console.log("token decode error")
            return false;
        }
    }
    console.log("token not found")
    return false;
}