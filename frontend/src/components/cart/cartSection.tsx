import { useEffect } from "react";
import { CartItem } from "./cartItem";
import { useCart } from "../../contexts/CartProvider";
import { UserContext } from "../../contexts/UserProvider";
import { useContext } from "react";

export function CartSection() {
  const { cart, isLoading, refreshCart } = useCart();
  const { isLogged, user } = useContext(UserContext);

  // Chama refreshCart SOMENTE quando o usuário já está disponível.
  // Isso evita a race condition onde refreshCart era chamado antes
  // do UserProvider terminar de restaurar a sessão do localStorage.
  useEffect(() => {
    if (isLogged && user?.id) {
      refreshCart();
    }
  }, [isLogged, user?.id]);

  if (isLoading) {
    return (
      <div className="flex flex-col md:pl-30 animate-pulse">
        {[1, 2].map((i) => (
          <div key={i} className="h-32 bg-gray-100 rounded-xl m-5 mt-0 max-w-210" />
        ))}
      </div>
    );
  }

  if (!cart || cart.cartVariants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 m-10 text-gray-400">
        <span className="text-5xl">🛒</span>
        <span className="text-xl font-semibold">Your cart is empty</span>
        <span className="text-sm">Add some items to get started!</span>
      </div>
    );
  }

  const availableItems = cart.cartVariants.filter(
    (cv) => !cv.variant.product.isOutOfStock && cv.variant.stock > 0
  );
  const outOfStockItems = cart.cartVariants.filter(
    (cv) => cv.variant.product.isOutOfStock || cv.variant.stock === 0
  );

  return (
    <div className="flex flex-col md:pl-30">

      {/* ── Available Items ────────────────────────────────────────────────── */}
      {availableItems.length > 0 && (
        <div className="flex flex-col border border-gray-300 rounded-xl m-5 mt-0 max-w-210">
          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-3 ml-5 mt-2 items-center">
              <p className="rounded-full bg-green-500 text-xs h-3 w-3" />
              <p className="text-black font-black text-xl">
                Available Items ({cart.totalAvailableItems})
              </p>
            </div>

            {availableItems.map((cv) => (
              <CartItem key={cv.variant.id} cartVariant={cv} />
            ))}
          </div>
        </div>
      )}

      {/* ── Out of Stock ──────────────────────────────────────────────────── */}
      {outOfStockItems.length > 0 && (
        <div className="flex flex-col border border-red-600 rounded-xl m-5 mt-0 max-w-210">
          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-3 ml-5 mt-2 items-center">
              <p className="rounded-full text-red-700 bg-white border border-red-700 text-xs h-5 w-5 flex items-center justify-center font-bold">
                !
              </p>
              <p className="text-red-700 font-black text-xl">
                Out of Stock ({cart.totalOutOfStockItems})
              </p>
            </div>

            <div className="opacity-60 grayscale">
              {outOfStockItems.map((cv) => (
                <CartItem key={cv.variant.id} cartVariant={cv} />
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}