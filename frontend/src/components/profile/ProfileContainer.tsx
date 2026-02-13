import { TabList } from "./TabList";
import { ContentBox } from "./ContentBox";
import { InputText } from "../InputText";
import { Button } from "../Button";

interface ProfileContainerProps {
    orders?: number
    wishlist?: number
    rating?: number
}

export function ProfileContainer ({orders = 3,wishlist = 4,rating = 4.8}:ProfileContainerProps){
    return(
        <>
        <div className="w-full flex flex-col gap-[8px]">
            <TabList/>
            <div className="flex flex-col gap-[24px]">

            
                <ContentBox title="Personal Information" buttonColor="white" buttonName="Cancel" buttonIconPos="left" buttonIconSrc="src/assets/icons/pencilIcon.svg">
                    <InputText label="First Name" type="text" textClassName="text-primary"/>
                    <InputText label="Last Name" type="text" textClassName="text-primary"/>
                    <InputText label="Email" type="email" textClassName="text-primary"/>
                    <InputText label="Phone" type="tel" textClassName="text-primary"/>
                    <InputText label="Date of Birth" type="date" textClassName="text-primary"/>
                    <InputText label="Gender" texto="Genero" textClassName="text-primary" options={[
                        {label: "Male", value:"male"},
                        {label: "Woman", value:"woman"}
                    ]}/>
                    <div className="flex items-end justify-start w-full pt-[16px] gap-[16px]">
                        <div className="w-[120px]">
                            <Button texto="Save Changes" link="/Profile" />    
                        </div>
                        <div className="w-[76px]">
                            <Button texto="Cancel" link="/Profile" color="white" buttonClassName="w-1334"/>
                        </div>
                        
                    </div>
                </ContentBox>

                <ContentBox>
                    <div className="flex flex-col gap-[8px] items-center">
                        <img src="src/assets/icons/packageIcon.svg" alt="package" />
                        <span className="text-[24px]/8 font-bold">{orders}</span>
                        <span className="text-[14px]/5 text-tertiary">Total Orders</span>
                    </div>
                </ContentBox>

                <ContentBox>
                    <div className="flex flex-col gap-[8px] items-center">
                        <img src="src/assets/icons/redHeartIcon.svg" alt="Heart" />
                        <span className="text-[24px]/8 font-bold">{wishlist}</span>
                        <span className="text-[14px]/5 text-tertiary">Whishlist Items</span>
                    </div>
                </ContentBox>

                <ContentBox>
                    <div className="flex flex-col gap-[8px] items-center">
                        <img src="src/assets/icons/yellowStartIcon.svg" alt="Star" />
                        <span className="text-[24px]/8 font-bold">{rating}</span>
                        <span className="text-[14px]/5 text-tertiary">Avg. Rating</span>
                    </div>
                </ContentBox>
                
            </div>
        </div>
        
        
        </>
    )
}