import { useState, useEffect } from "react"
import type { userInfo } from "../contexts/userContext"

export function useUserData(){
    const [userData, setUserData] = useState<userInfo | null>(null)
        useEffect(()=>{
            const getUserInfo = async() =>{
                const token = localStorage.getItem('styleToken');
                const userId = localStorage.getItem('styleUserId');
                const url = `http://localhost:3333/user/${userId}`

                try {
                    const response = await fetch(url,{ 
                        method:"GET",
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                if(!response.ok){
                    throw new Error(`Response status: ${response.status}`)
                }
                const result = await response.json();
                setUserData(result)
                } catch (error:any) {
                    console.error(error.message)
                }
            
            }
            getUserInfo()
        }, [])

    return userData
}