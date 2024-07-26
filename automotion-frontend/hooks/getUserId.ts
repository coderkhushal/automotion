"use client"
import {jwtDecode} from 'jwt-decode'
import { getGetToken } from './getGetToken'


export const getUserId= (): string | null => {
    let token = getGetToken()
    if (token) {
        try{

            const {sub}= jwtDecode(token)
            if(sub){
                return sub;
            }
            else{
                return null;
            }
            
        }
        catch(err){
            console.log("token decode error")
            return null;
        }
    }
 
    return null;
}