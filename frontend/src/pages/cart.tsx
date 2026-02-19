import { Header } from "../components/Header";
import ReturnButton from "../components/cart/ReturnButton";
import { CartSection } from "../components/cart/cartSection";
import { CartProvider } from "../components/cart/cartContext";

export function Cart() {

    return(
        <>
            <CartProvider>
                <Header/>
                <ReturnButton text="Shopping Cart" link="a" isCart={true} />
                <CartSection/>
            </CartProvider>
        </>
    );
}

