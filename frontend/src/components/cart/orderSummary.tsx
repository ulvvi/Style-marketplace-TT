import { useCart } from "../../contexts/CartProvider"; // ← caminho corretoimport { Button } from "../Button";
import { Button } from "../Button";

export const OrderSummary = () => {
  const { cart } = useCart();

  if (!cart) return null;

  const {
    totalAvailableItems,
    subtotal,
    savings,          // desconto de itens em promoção (vem do backend)
    couponDiscountValue, // desconto do cupom (calculado no frontend)
    shipping,
    tax,
    totalCost,
  } = cart;

  const totalSavings = +(savings + couponDiscountValue).toFixed(2);

  return (
    <div className="flex flex-col gap-3 pr-4 pl-4 pb-4 pt-5 m-5 mt-0 border border-gray-300 rounded-xl md:w-full">
      <span className="font-bold text-2xl">Order Summary</span>

      {/* Subtotal */}
      <div className="flex flex-row justify-between items-center">
        <span>
          Subtotal ({totalAvailableItems}{" "}
          {totalAvailableItems === 1 ? "item" : "items"})
        </span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      {/* Savings (promoções + cupom) */}
      {totalSavings > 0 && (
        <div className="flex flex-row justify-between">
          <span className="text-green-600">Savings</span>
          <span className="text-green-600">-${totalSavings.toFixed(2)}</span>
        </div>
      )}

      {/* Shipping */}
      <div className="flex flex-row justify-between">
        <span>Shipping</span>
        <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
      </div>

      {/* Tax */}
      {tax > 0 && (
        <div className="flex flex-row justify-between">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      )}

      <span className="border border-gray-300 w-full" />

      {/* Total */}
      <div className="flex flex-row justify-between">
        <span className="font-black text-lg">Total</span>
        <span className="font-black text-lg">${totalCost.toFixed(2)}</span>
      </div>

      {/* CTAs */}
      <div className="flex flex-col mt-2 gap-2 pr-5 pl-5 items-center">
        <Button texto="Proceed to Checkout" link="Checkout" />
        <Button texto="Continue Shopping" link="Home" />
        <span className="text-gray-500 font-light text-xs">
          Secure checkout with SSL encryption
        </span>
        <span className="text-gray-500 font-light text-xs">
          30-day return policy • Free returns
        </span>
      </div>
    </div>
  );
};