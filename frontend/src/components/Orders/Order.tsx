import { Button } from "../Button";
import { ContentBox } from "./ContentBox";
import { Situation } from "./Situation";

interface OrderProps {
    orderName?: string;
    totalPrice?: number;
    time?: string
    adress?: string;
    rastreio?: string;
}


export function Order({
    orderName = "ORD-000-000",
    totalPrice = 186,
    time = "14/01/2024",
    adress = "123 Main St, New York, NY 10001",
    rastreio = "TRK123456789"}:OrderProps) {

    

    return(
        <>
        <ContentBox className="!gap-0">
            <div className="flex items-center justify-between w-full">
                <div className="flex flex-col items-center gap-[8px]">
                    <div className="flex flex-row items-center gap-[12px]">
                        <h2 className="text-[16px]/6 font-semibold">Order {orderName}</h2>
                        <Situation situation="DELIVERED"/>
                    </div>

                    
                    <div className="flex flex-col items-start w-full">
                        <span className="text-[14px]/5 text-tertiary">Placed on {time}</span>
                        <span className="text-[14px]/5 text-tertiary">{adress}</span>
                        <span className="text-[14px]/5 text-tertiary">Tracking: {rastreio}</span>
                    </div>

                    

                </div>
                <div className="flex flex-col gap-[8px] ">
                    <div className="flex items-center justify-end">
                        <span className="text-[20px]/5 font-bold">${totalPrice} </span>
                    </div>
                    <div className="flex items-center gap-[8px]">
                        <Button texto="View Deatails" link="" iconSrc="src/assets/icons/showPassTrue.svg" color="white" iconPos="left" buttonClassName="!w-[132px] !h-[36px]"/>
                        <Button texto="Reorder" link="" buttonClassName="!w-[105px] !h-[36px] hidden lg:inline-block" color="white" iconSrc="src/assets/icons/PackageSmallIcon.svg" iconPos="left" />
                    </div>
                </div>
                
            </div>





        </ContentBox>
        
        </>
    )


}