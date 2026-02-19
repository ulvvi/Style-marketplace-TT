import { ProductInfoContext } from "../../pages/ProductInfo";
import { useContext } from "react";

export function ProductHeader() {
    const product  = useContext(ProductInfoContext)
    const discount = product?.SalePrice === undefined ? 0 : product.price - product.SalePrice;
    const formatedProductName = product?.name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

    return (
        <>
            <div className="flex flex-col gap-6 mb-6"> 
                <div>
                    <div className="flex gap-2"> 
                        {product?.categories.map((category, _) => (
                            <div className={`flex items-center py-0.75 px-2.75 rounded-[100rem] h-5.5 top-3 left-3 z-1 
                            ${{
                                "Tops": "bg-secondary border border-(--border-primary)",
                                "Limited_Time": "bg-[#F3F4F6]",
                            }[category.type]}`}>
                                <span className="text-primary font-semibold text-[0.75rem]">{category.type}</span>
                            </div>
                        ))}
                    </div>
                    <h1 className="text-[1.875rem] font-bold text-primary">{formatedProductName}</h1>
                    <h2 className="text-[1rem] text-tertiary">Style Premium</h2>
                </div>
                <div className="flex flex-row text-[1rem]">
                    <div className="flex flex-row flex-wrap">
                        {Array.from({length: 5}).map((_, i) => (
                            <img src={`${i <= (product?.rating ?? 1) - 1 ? "/src/assets/icons/starIcon.svg" : "/src/assets/icons/starOutlineIcon.svg"}`} className="w-5"/>
                        ))}
                    </div>
                    <span className="font-semibold text-primary ml-2">{product?.rating.toFixed(1)}</span>
                    <span className="font-regular text-tertiary ml-4">({product?.numOfReviews} reviews)</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-[1.875rem] font-bold text-[#DC2626]">${product?.SalePrice ?? product?.price}</span>
                    <span className={`text-[1.25rem] text-tertiary line-through ${product?.SalePrice ? "inline-block" : "hidden"}`}>${product?.price}</span>
                    <div className={`flex items-center bg-[#EF4343] px-2.75 rounded-[100rem] h-6 z-1 ${product?.SalePrice ? "inline-block" : "hidden"}`}>
                        <span className={`text-secondary font-semibold text-[0.75rem]`}>Save ${discount}</span>
                    </div>
                </div>
            </div>
        </>
    )
}