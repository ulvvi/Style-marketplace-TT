import { ProductHeader } from "./ProductHeader";
import { VariantContainer } from "./VariantContainer";

export function ProductPurchasePanel() {
    const productColors = [{colorName: "Black", colorHex: "#030711"}]
    return (
        <>
            <section className="mt-8">
                <ProductHeader />
                <hr className=" border-(--border-primary)"/>
                <VariantContainer colors={productColors}/>
            </section>
        </>
    )
}