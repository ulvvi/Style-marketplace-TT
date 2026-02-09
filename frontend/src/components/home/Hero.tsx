import { Button } from "../Button";

interface HeroProps {
    imgSrc?: string
    imgAlt?: string
}

export function Hero({imgSrc="/src/assets/placeholder.svg", imgAlt}:HeroProps) {
    return (
        <>
            <section className="flex flex-col justify-center h-136.5 relative overflow-hidden ">
                <img className="w-full h-full absolute object-cover z-0 opacity-20" src={imgSrc} alt={imgAlt}></img>
                <div className="absolute inset-0 bg-linear-to-b from-[#F3F4F64D] to-[#F3F4F61A]"/>
                <div className="relative flex flex-col gap-6 px-4">
                    <h1 className="text-transparent text-center text-[3rem] font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text">Style Redefined</h1>
                    <p className="text-tertiary text-center text-[1.25rem]">Discover the latest trends in fashion.<br/>
                    Premium quality, sustainable materials, timeless designs.</p>
                    <div className="flex flex-col gap-4 mt-2">
                        <Button texto="Shop Now" link="" buttonClassName="h-[48px]" textClassName="text-[length:1.125rem]" iconSrc="/src/assets/icons/whiteArrowIcon.svg"/>
                        <Button texto="View Collection" color="white" link="" buttonClassName="h-[48px]" textClassName="text-[length:1.125rem]"/>
                    </div>
                </div>
            </section>
        </>
    )
}