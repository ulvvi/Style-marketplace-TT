import { useEffect, useState } from "react";
import { Button } from "../Button";
import { ProductCard } from "../ProductCard";
import type { Product } from "../../hooks/useProduct";

export function FeatureProducts() {

    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
        const [loading, setLoading] = useState(true);
        
        useEffect(() => {
            async function requestProducts() {
                setLoading(true);
                try {
                    const response = await fetch(`http://localhost:3333/products`, {
                                method: "GET",
                                headers: {
                                "Content-type": "application/json",
                                }
                            })
                    
                    if (!response.ok) throw new Error();
    
                    const allProductsData = await response.json();
                    setFeaturedProducts(allProductsData.slice(0, 4));
    
                } catch (err) {
                    console.error("Erro ao conseguir dados dos produtos")
                } finally {
                    setLoading(false)
                }   
            }
            requestProducts()
        },[])

    return (
        <>  
            <section className="bg-[#F3F4F633] mb-20 mt-20 px-4">
                <h2 className="text-primary text-center text-[2.25rem] font-bold mb-4">Featured Products</h2>
                <p className="text-tertiary text-center text-[1.25rem] mb-16">Handpicked favorites from our latest collection</p>
                <div className="flex flex-col gap-8 items-center justify-center  w-full mb-12 lg:flex-row">
                    {featuredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} productBadge={["Best Seller"]} cardStyle="Home"/>

                        ))}
                </div>
                <div className="px-18.5 flex justify-center">
                    <Button texto="View All Products" color="white" link="" buttonClassName="min-w-[180px] lg:w-52.5" iconSrc="/src/assets/icons/blackArrowIcon.svg"/>
                </div>
            </section>
        </>
    )
}