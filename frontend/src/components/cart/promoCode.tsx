import { useState } from "react";
import { useCart } from "../../contexts/CartProvider"; // ← caminho correto

export const PromoCode = () => {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isApplying, setIsApplying] = useState(false);

  const { cart, applyCoupon } = useCart();

  const isButtonDisabled = code.trim().length === 0 || isApplying;
  const alreadyApplied = Boolean(cart?.promoCode);

  const handleApply = async () => {
    setIsApplying(true);
    setStatus("idle");
    const success = await applyCoupon(code.trim());
    setStatus(success ? "success" : "error");
    if (success) setCode("");
    setIsApplying(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isButtonDisabled) handleApply();
  };

  return (
    <div className="flex flex-col gap-3 pr-4 pl-4 pb-4 m-5 mt-0 border border-gray-300 rounded-xl md:w-full">

      <div className="flex flex-row gap-1 mt-2 items-center">
        <img src="src/assets/icons/targetPromo.svg" alt="target" />
        <span className="font-bold text-2xl">Promo Code</span>
      </div>

      {/* Cupom já aplicado */}
      {alreadyApplied && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-300 rounded-xl px-3 py-2">
          <span className="text-green-700 text-sm font-medium">
            ✓ Code <strong>{cart!.promoCode}</strong> applied — {cart!.discountPercent}% off
          </span>
        </div>
      )}

      <div className="flex flex-row gap-2 justify-between">
        <div className="flex-4">
          <input
            type="text"
            value={code}
            onChange={(e) => { setCode(e.target.value.toUpperCase()); setStatus("idle"); }}
            onKeyDown={handleKeyDown}
            placeholder="Enter promo code"
            disabled={isApplying}
            className={`border rounded-xl p-2 pl-3 w-full outline-none transition-colors
              ${status === "error" ? "border-red-400" : "border-gray-300 focus:border-black"}`}
          />
        </div>
        <div className="flex-1">
          <button
            disabled={isButtonDisabled}
            onClick={handleApply}
            className={`border border-gray-300 rounded-xl p-2 pr-3 pl-3 bg-black text-white w-full
              ${isButtonDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"}`}
          >
            {isApplying ? "..." : "Apply"}
          </button>
        </div>
      </div>

      {status === "success" && <span className="text-green-600 text-sm">✓ Coupon applied successfully!</span>}
      {status === "error"   && <span className="text-red-500 text-sm">✗ Invalid or expired coupon code.</span>}

      <span className="text-gray-400 font-light text-xs">Try: SAVE10, WELCOME20, STUDENTS15</span>
    </div>
  );
};