import { useContext, useEffect, useState } from "react";
import { ProductCard } from "../ProductCard";
import { ProductInfoContext } from "../../pages/ProductInfo";
import type { Product } from "../../hooks/useProduct";

export function RelatedProducts() {

    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
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
                setRelatedProducts(allProductsData.slice(0, 3));

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
            <aside className="col-span-full my-8">
                <h2 className="mb-8 text-[1.5rem] font-bold">You Might Also Like</h2>
                <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-center">
                    {relatedProducts.map((product) => (
                        <ProductCard key={product.id} product={product}  cardStyle="ProductInfo"/>

                        ))}
                </div>
                
            </aside>
        </>
    )
}