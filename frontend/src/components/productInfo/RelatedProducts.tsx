import { ProductCard } from "../ProductCard";

export function RelatedProducts() {
    return ( 
        <>
            <aside className="col-span-full my-8">
                <h2 className="mb-8 text-[1.5rem] font-bold">You Might Also Like</h2>
                <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-center">
                    <ProductCard cardStyle="ProductInfo"/>
                    <ProductCard cardStyle="ProductInfo"/>
                    <ProductCard cardStyle="ProductInfo"/>
                </div>
                
            </aside>
        </>
    )
}