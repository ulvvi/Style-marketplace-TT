import { InfoBarProduct } from "./InfoBarProduct";
import { ProductHeader } from "./ProductHeader";
import { PurchaseActionButtons } from "./PurchaseActionButtons";
import { VariantContainer } from "./VariantContainer";

export function ProductPurchasePanel() {

    return (
        <>
            <section className="mt-8 col-span-full lg:col-span-1">
                <ProductHeader/>
                <VariantContainer />
                <hr className=" border-(--border-primary)"/>
                <InfoBarProduct/>
                <hr className=" border-(--border-primary)"/>
            </section>
        </>
    )
}