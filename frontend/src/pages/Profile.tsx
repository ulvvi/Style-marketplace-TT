import { userContext, } from "../contexts/userContext"
import { useState, useEffect } from 'react';
import { PrincipalContainer } from "../components/profile/PrincipalContainer"
import type {userInfo} from "../contexts/userContext"




export function Profile() {
    const [userData, setUserData] = useState<userInfo | null>(null)
    useEffect(()=>{
        const getUserInfo = async() =>{
            
            const id = 3
            const url = `http://localhost:3333/user/${id}`
            const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjN9LCJpYXQiOjE3NzE0MzM2NTAsImV4cCI6MTc3MjAzODQ1MH0.WBbq3ZOjRhAtFvv9Q9FGwBIvu5TMbfTSppfQofWzsVzki1y049hYSgVQS0Px4H7VugyLMS-l8xcjJTEZNPc8Rn_CBXFvnEFLgf2H7Pk9MYkc2rWeNAjfAhjCeZWp8kTt3FoCBna2bdeUfa1kDUQ1mG-PlqvUczdqp427yqIRHNrYzXaVrxEUmiwKE0k6ThojNmnn5D4igcIjFnLrFwIS4jep3xDpcttLvTvzgz2XcdLKwwhnE2tOBpvfqQtTPlsuyPBVjcatpeVob1SO7dpnlQWaL1Ddx5a8JX_xViUU0F_ZZfkXGdk2QbzWaRB3dFcWtEgmIGKa9lE9dXixtxUQg2RwBt6Upt9Jt01bv2LjdMHGgVIBNcnVIzrZJ44Z2e9dxXDFHLsT2j2O93c0lexTrSvAP_vaqZvlAVTPiy973FDuAQ-XlejpNKt3WiTqqbuYPVMzIb0spF-rHjeYWu-9VECu6a7Tj69NkfBDJ4qU6io1K02DTKQMEjciFPqgGaw3JEAe5-Kk83e1GBrHWzPpAuG_myjECjm2jPRWPXVBAsUCpRqT88lqsKeIfBD1nXeijjVq8yDnjwVzAXvk3hzmlFyDG7knORziVRveWJiTFBtE3sOGB3oAcxCijAiOTLf9dTVYYSsYOLEZzIp8PP9DqcAXYSBiqN7qVT6y-c8ahHk"
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
    if(!userData) return;
    console.log(userData)
    return (
        <>  
            <userContext.Provider value = {userData}>
                <div className="w-full min-h-[780px] lg:pr-[260px] lg:pb-[346px] lg:pl-[260px] lg:min-h-[1200px]">
                    <PrincipalContainer/>    
                </div>
            </userContext.Provider>
            
        </>
    )
}

