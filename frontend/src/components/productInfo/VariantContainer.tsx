import { Button } from "../Button";
import { IconButton } from "../IconButton";

interface VariantContainerProps {
    colors: Color[];

}

interface Color {
    colorName: string;
    colorHex: string;
}

export function VariantContainer({colors}:VariantContainerProps) {
    return (
        <>
            <div className="flex flex-col gap-6 my-6">
                <fieldset>
                    <legend className="text-[1rem] font-semibold mb-3">Color:</legend>
                    <div className="flex gap-3">
                        {colors.map((color, i) =>(
                            <button className={`w-10 h-10 bg-[${color.colorHex}] rounded-full border-2 border-[#D1D5DB] cursor-pointer`}></button>
                        ))}
                    </div>
                </fieldset>
                <fieldset>
                    <legend className="text-[1rem] font-semibold mb-3">Size:</legend>
                    <div className="flex gap-2 mb-3">
                        <Button link="/" color="white" texto="XS" buttonClassName="!h-12.5" textClassName="!font-normal !text-[1rem]"/>
                        <Button link="/" color="white" texto="S" buttonClassName="!h-12.5" textClassName="!font-normal !text-[1rem]"/>
                        <Button link="/" color="white" texto="M" buttonClassName="!h-12.5" textClassName="!font-normal !text-[1rem]"/>
                        <Button link="/" color="white" texto="L" buttonClassName="!h-12.5" textClassName="!font-normal !text-[1rem]"/>
                        <Button link="/" color="white" texto="XL" buttonClassName="!h-12.5" textClassName="!font-normal !text-[1rem]"/>
                    </div>
                    <span className="text-[0.875rem] font-semibold">Size Guide</span>
                </fieldset>
                <fieldset>
                    <legend className="text-[1rem] font-semibold mb-3">Quantity</legend>
                    <div className="flex gap-3 items-center">
                        <div className="flex justify-evenly items-center w-35.5 h-10.5 border border-(--border-primary) rounded-[10px] overflow-hidden">
                            <IconButton iconSrc="/src/assets/icons/minusIcon.svg" buttonClassName="hover:bg-[#F3F4F6] !w-full !h-full flex justify-center"/>
                            <span className="w-full h-full flex items-center justify-center">1</span>
                            <IconButton iconSrc="/src/assets/icons/plusIcon.svg" buttonClassName="hover:bg-[#F3F4F6] !w-full !h-full flex justify-center"/>
                        </div>
                        <span className="text-[0.875rem] text-tertiary">Max 12 items</span>
                    </div>
                </fieldset>
            </div>
        </>
    )
}