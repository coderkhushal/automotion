"user client"
export const getGetToken = ()=>{
    // if(localStorage.getItem("token") === null){
    //     return null
    // }
    return localStorage.getItem("token")
}