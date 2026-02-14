import { Header } from "../components/Header";

import { SalesHero } from "../components/Sales/SalesHero";

import { SalesStats } from "../components/Sales/SalesStats";
import { Filter } from "../components/Sales/Filter";
import { ProductSection } from "../components/Sales/ProductSection";
import { Footer } from "../components/home/Footer";

export function Sales(){
    return(
        <>
            <Header/>
            <SalesHero/>
            <SalesStats maxDiscount={70} totalItens={500} timeLeft={48} shippingDiscount={100}/>
            <section className="w-full px-4 lg:flex lg:justify-center">
                <Filter/>
                <ProductSection/>
            </section>
            <Footer footerStyle="Sales"/>
        </>
    )
}