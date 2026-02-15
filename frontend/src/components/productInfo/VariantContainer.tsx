import { useMemo, useState } from "react";
import { Button } from "../Button";
import { IconButton } from "../IconButton";

interface Variant {
    id: number;
    color: string;
    size: string;
    stock: number;
    productId: number;
}

interface VariantContainerProps {
    variants: Variant[];
}

const colorMap: Record<string, string> = {
    "black": "#030711",
    "red": "#DC2626"
}

const sizes: string[] = ["XS", "S", "M", "L", "XL"]

export function VariantContainer({variants}:VariantContainerProps) {
    const [currentColor, setCurrentColor] = useState<string | null>(null)
    const [currentSize, setCurrentSize] = useState<string | null>(null)

    const productColors = useMemo(() => {
        return Array.from(new Set(variants.map((variant) => variant.color)))
    },[variants])

    const isSizeOnStock = ((size: string | null) => {
        if (!currentColor) return false;
        return variants.some((variant) => variant.color == currentColor && variant.size === size && variant.stock > 0)
    })

    const isColorOnStock = ((color: string) => {
        return variants.some((variant) => variant.color === color && variant.stock > 0)
    })

    const handleChangeColor = ((color: string) => {
        setCurrentColor(color);
        if (!isSizeOnStock(currentSize)) {
            setCurrentSize(null);
        }
        
    })

    const handleChangeSize = ((size: string) => {
        setCurrentSize(size);
    })

    return (
        <>
            <div className="flex flex-col gap-6 my-6">
                <fieldset>
                    <legend className="text-[1rem] font-semibold mb-3">Color:</legend>
                    <div className="flex gap-3">
                        {productColors.map((color) =>(
                            <button className={`w-10 h-10 bg-[${colorMap[color]}] rounded-full border-2 border-[#D1D5DB] cursor-pointer`} onClick={() => handleChangeColor(color)} disabled={!isColorOnStock}></button>
                        ))}
                    </div>
                </fieldset>
                <fieldset>
                    <legend className="text-[1rem] font-semibold mb-3">Size:</legend>
                    <div className="flex gap-2 mb-3">
                        {sizes.map((size) => (
                            <Button color="white" texto={size} buttonClassName="!h-12.5 disabled:cursor-default disabled:opacity-50 disabled:hover:bg-secondary" onClick={() => handleChangeSize(size)} textClassName="!font-normal !text-[1rem]" disabled={!isSizeOnStock(size)}/>
                        ))}
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