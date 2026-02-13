import { Header } from "../components/Header"
import { PrincipalContainer } from "../components/profile/PrincipalContainer"

export function Profile() {
    return (
        <>  
            <Header/>
            <div className="w-full pr-[260px] pb-[346px] pl-[260px] min-h-[1200px]">
                <PrincipalContainer/>    
            </div>
            
        </>
    )
}

