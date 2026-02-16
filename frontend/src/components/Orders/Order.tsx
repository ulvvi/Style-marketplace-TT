import { Button } from "../Button";
import { ContentBox } from "./ContentBox";
import { Situation } from "./Situation";

interface OrderProps {
    orderName?: string;
    totalPrice?: number;
    time?: string
    adress?: string;
    rastreio?: string;
    situations?: "DELIVERED" | "SHIPPED" | "PROCESSING";
}


export function Order({
    orderName = "ORD-2024-001",
    totalPrice = 186,
    time = "14/01/2024",
    adress = "123 Main St, New York, NY 10001",
    rastreio = "TRK123456789",
    situations}:OrderProps) {

    

    return(
        <>
        <ContentBox className="!gap-0 !pr-[15px]">
            <div className="flex flex-col w-full gap-[16px]">
                <div className="flex justify-between w-full gap-[40px]">
                <div className="flex flex-col items-center gap-[8px]">
                    <div className="flex flex-row items-center flex-wrap gap-[12px]">
                        <h2 className="text-[16px]/6 font-semibold">Order {orderName}</h2>
                        <Situation situation={situations ? situations : "DELIVERED"}/>
                    </div>

                    
                    <div className="flex flex-col items-start w-full gap-[4px]">
                        <span className="text-[14px]/5 text-tertiary">Placed on {time}</span>
                        <span className="text-[14px]/5 text-tertiary">{adress}</span>
                        <span className={`${situations === "PROCESSING" ? "hidden" : "inline-block"} text-[14px]/5 text-tertiary`}>Tracking: {rastreio}</span>
                    </div>

                    

                </div>
                <div className="flex flex-col gap-[8px] ">
                    <div className="flex items-center justify-end">
                        <span className="text-[20px]/5 font-bold">${totalPrice} </span>
                    </div>
                    <div className="flex items-center gap-[8px]">
                        <Button texto="View Deatails" link="" iconSrc="src/assets/icons/showPassTrue.svg" color="white" iconPos="left" buttonClassName="!w-[132px] !h-[36px]"/>
                        <Button texto="Reorder" link="" buttonClassName={` ${situations === "DELIVERED" ? "!w-[105px] !h-[36px] hidden lg:inline-block":  "hidden"} `} color="white" iconSrc="src/assets/icons/PackageSmallIcon.svg" iconPos="left" />
                    </div>
                </div>
                
                </div>

                <hr/>


            </div>
            





        </ContentBox>
        
        </>
    )


}