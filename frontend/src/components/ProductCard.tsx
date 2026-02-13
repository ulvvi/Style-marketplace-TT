import { Button } from "./Button";
import { SvgIconProduct } from "./SvgIconProduct";

interface ProductCardProps {
    title: string;
    ratingAvg: number;
    ratingQuantity: number;
    currentPrice: number;
    oldPrice?: number;
    category?: 'Tops'| 'Bottoms' | 'Dresses' | 'Shoes' | 'Acessories';
    productBadge?: 'Best Seller' | 'New' | 'Sale' | 'Premium'
    cardStyle?: 'Home' | 'Sales';
    imgSrc?: string;
    imgAlt?: string;
}

export function ProductCard({title="product", ratingAvg=0, ratingQuantity=0, currentPrice=0, oldPrice, productBadge="New", imgSrc="/src/assets/placeholder.svg", imgAlt, cardStyle, category}:ProductCardProps) {
    let discount;
    if(cardStyle === 'Sales'){
        discount = Math.round( (1 - (currentPrice/(oldPrice as number)))*100 ) 
    }
    

    const badgeColor: string = productBadge==="Sale" || cardStyle === 'Sales'? "bg-[#EF4343]" : "bg-primary";
    const priceColor: string = cardStyle === 'Sales' ? "text-red-text" : "text-primary"
    const buttonColor: "default" | "white" | "red" = cardStyle != 'Home' ? "default" : "white"
    return (
        <>
            <article className="w-89.5 h-122.5 border-0 rounded-xl shadow-lg hover:shadow-xl relative
            lg:w-79.5 lg:h-112.5">
                <div className={`flex items-center absolute ${badgeColor} py-0.75 px-2.75 rounded-[100rem] h-5.5 top-3 left-3 z-1`}>
                    <span className="text-secondary font-semibold text-[0.75rem]">{discount === undefined ? productBadge : '-'+discount+'%'}</span>
                </div>
                <div className="h-89.5 rounded-t-xl overflow-hidden lg:h-79.5">
                    <img className="w-full h-full hover:scale-105 object-cover" src={imgSrc} alt={imgAlt}></img>
                </div>
                <div className=" bg-secondary rounded-b-xl flex flex-col gap-2 p-4">
                    
                    <div className={` ${cardStyle != 'Home' ? 'flex justify-between' : 'hidden'}`}>
                        <span className="font-semibold text-[0.75rem] py-0.5 border-(--border-primary) border rounded-full px-2.75">{category}</span>
                        <div className="text-[0.875rem] flex items-center gap-1">
                            <img src="/src/assets/icons/starIcon.svg"></img>
                            <span className="font-semibold">{ratingAvg}</span>
                            <span className="font-normal text-tertiary ml-1">({ratingQuantity})</span>
                        </div>
                    </div>

                    <h3 className="text-primary text-[1.125rem] font-semibold">{title}</h3>
                    {/*to escondendo essa div que mostra o rating caso n seja a home. pelo que eu vi so a tela de home e order
                    tem essa mesma disposicao do rating abaixo do nome, entao acho q da pra deixar assim. o estilo da tela de order,
                    inclusive, me parece o mesmo da de home*/}
                    <div className={`text-[0.875rem] flex items-center gap-1 ${cardStyle == 'Home' ? '' : 'hidden'}`}>
                        <img src="/src/assets/icons/starIcon.svg"></img>
                        <span className="font-semibold">{ratingAvg}</span>
                        <span className="font-normal text-tertiary ml-1">({ratingQuantity})</span>
                    </div>
                    <div className= {`flex  ${cardStyle != 'Home' ? 'flex-col gap-y-2' : 'justify-between '}`}>
                        <div className="flex gap-2 items-center">
                            <span className={`text-[1.25rem] font-bold ${priceColor}`}>${currentPrice}</span>
                            <span className={`text-[0.875rem] font-normal text-tertiary line-through ${oldPrice ? "inline-block" : "hidden"} `}>${oldPrice}</span>
                        </div>
                        <div className={`${cardStyle != 'Home' ? 'w-full flex gap-2' : 'w-25'}`}> 
                            <Button texto="Add to Cart" color={buttonColor} link="" buttonClassName="h-[length:36px]"  iconSrc={cardStyle != 'Home' ? "src/assets/icons/cartIconWhite.svg" : undefined} iconPos="left"/>
                            <SvgIconProduct path = "\src\assets\icons\heartIcon.svg" alt="Ícone para salvar na wishlist" border="true" className={`${cardStyle == 'Home' ? 'hidden' : ''}`}/>
                        </div>
                    </div>
                </div>
            </article>
        </>
    )
}