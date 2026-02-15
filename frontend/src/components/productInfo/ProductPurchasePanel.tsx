import { InfoBarProduct } from "./InfoBarProduct";
import { ProductHeader } from "./ProductHeader";
import { PurchaseActionButtons } from "./PurchaseActionButtons";
import { VariantContainer } from "./VariantContainer";
import type { productBadge } from "./ProductHeader";

export function ProductPurchasePanel() {
    const productCategories:productBadge[] = ["Tops", "Limited Time"]
    return (
        <>
            <section className="mt-8 col-span-full lg:col-span-1">
                <ProductHeader title="Premium Cotton T-Shirt" collection="STYLE Premium" ratingAvg={4.8} ratingQuantity={124} currentPrice={29} oldPrice={49} stock={12} productBadges={productCategories}/>
                <hr className=" border-(--border-primary)"/>
                <VariantContainer variants={[{id: 1, color: 'black', size: 'XS', stock: 10, productId: 2}, {id: 1, color: 'red', size: 'M', stock: 10, productId: 2}, {id: 1, color: 'red', size: 'L', stock: 10, productId: 2}]}/>
                <hr className=" border-(--border-primary)"/>
                <PurchaseActionButtons/>
                <hr className=" border-(--border-primary)"/>
                <InfoBarProduct/>
                <hr className=" border-(--border-primary)"/>
            </section>
        </>
    )
}