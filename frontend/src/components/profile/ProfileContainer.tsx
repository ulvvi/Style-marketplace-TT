import { TabList } from "./TabList";
import { ContentBox } from "./ContentBox";

export function ProfileContainer (){
    return(
        <>
        <div className="w-full gap-[8px]">
        <TabList/>
        <ContentBox>
            
        </ContentBox>
        </div>
        
        
        
        </>
    )
}