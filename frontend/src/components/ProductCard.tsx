import { Button } from "./Button";

interface ProductCardProps {
    title: string;
    ratingAvg: number;
    ratingQuantity: number;
    currentPrice: number;
    oldPrice?: number;
    cardStyle?: 'Home' | 'ProductInfo'
    productBadge?: 'Best Seller' | 'New' | 'Sale' | 'Premium';
    imgSrc?: string;
    imgAlt?: string;
}

export function ProductCard({title="product", ratingAvg=0, ratingQuantity=0, currentPrice=0, oldPrice, productBadge="New", imgSrc="/src/assets/placeholder.svg", imgAlt, cardStyle="Home"}:ProductCardProps) {
    const badgeColor: string = productBadge==="Sale" ? "bg-[#EF4343]" : "bg-primary";
    return (
        <>
            <article className={`border-0 rounded-xl shadow-lg hover:shadow-xl relative
             ${cardStyle === 'ProductInfo' ? "w-85.75 h-117.75" : "w-89.5 h-122.5 lg:w-79.5 lg:h-112.5"}`}>
                <div className={`flex items-center absolute ${badgeColor} py-0.75 px-2.75 rounded-[100rem] h-5.5 top-3 left-3 z-1 
                    ${cardStyle === 'ProductInfo' ? "hidden" : "block"}`}>
                    <span className="text-secondary font-semibold text-[0.75rem]">{productBadge}</span>
                </div>
                <div className={` rounded-t-xl overflow-hidden 
                    ${cardStyle === 'ProductInfo' ? "h-85.75" : "h-89.5 lg:h-79.5"}`}>
                    <img className="w-full h-full hover:scale-105 object-cover" src={imgSrc} alt={imgAlt}></img>
                </div>
                <div className={`bg-secondary rounded-b-xl flex flex-col gap-2 p-4 
                    ${cardStyle === 'ProductInfo' ? "h-32" : "h-33"}`}>
                    <h3 className={`text-primary font-semibold
                        ${cardStyle === 'ProductInfo' ? "text-[1rem]" : "text-[1.125rem]"}`}>{title}</h3>
                    <div className="text-[0.875rem] flex items-center gap-1">
                        <img src="/src/assets/icons/starIcon.svg"></img>
                        <span className="font-semibold">{ratingAvg}</span>
                        <span className={`font-normal text-tertiary ml-1 
                        ${cardStyle === 'ProductInfo' ? "hidden" : "block"}`}>({ratingQuantity})</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <span className={`text-[1.25rem] font-bold 
                                ${cardStyle === 'ProductInfo' ? "text-[1rem]" : "text-[1.125rem]"}`}>${currentPrice}</span>
                            <span className={`text-[0.875rem] font-normal text-tertiary line-through ${oldPrice ? "inline-block" : "hidden"} `}>${oldPrice}</span>
                        </div>
                        <div className={`${cardStyle === 'ProductInfo' ? "w-14" : "w-25"}`}>
                            <Button texto={`${cardStyle === "ProductInfo" ? "View" : "Add to Cart"}`} color="white" link="" buttonClassName="h-[length:36px]"/>
                        </div>
                    </div>
                </div>
            </article>
        </>
    )
}