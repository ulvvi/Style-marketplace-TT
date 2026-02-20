import { createContext, useContext, useEffect, useState, useCallback, useRef, type ReactNode } from "react";
import { UserContext } from "./UserProvider";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CartVariantItem {
  quantity: number;
  variant: {
    id: number;
    color: string;
    size: string;
    stock: number;
    product: {
      id: number;
      name: string;
      price: number;
      SalePrice: number | null;
      photoUrl: string | null;
      isOutOfStock: boolean;
      brand?: string;
    };
  };
}

interface ApiCart {
  id: number;
  subtotal: number;
  savings: number;
  shipping: number;
  tax: number;
  promoCode: string | null;
  totalCost: number;
  cartVariants: CartVariantItem[];
}

export interface Cart extends ApiCart {
  cartQuantity: number;
  totalAvailableItems: number;
  totalOutOfStockItems: number;
  couponDiscountValue: number;
  discountPercent: number;
}

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  refreshCart: () => Promise<void>;
  addToCart: (variantId: number) => Promise<void>;
  removeFromCart: (variantId: number) => Promise<void>;
  updateQuantity: (variantId: number, quantity: number) => Promise<void>;
  applyCoupon: (code: string) => Promise<boolean>;
}

// ─── Context ──────────────────────────────────────────────────────────────────

export const CartContext = createContext({} as CartContextType);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const API = "http://localhost:3333";

const VALID_COUPONS: Record<string, number> = {
  SAVE10: 10,
  WELCOME20: 20,
  STUDENTS15: 15,
};

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("styleToken")}`,
  };
}

function enrichCart(raw: ApiCart, discountPercent: number): Cart {
  const cartQuantity = raw.cartVariants.reduce((acc, cv) => acc + cv.quantity, 0);

  const totalAvailableItems = raw.cartVariants
    .filter((cv) => !cv.variant.product.isOutOfStock)
    .reduce((acc, cv) => acc + cv.quantity, 0);

  const totalOutOfStockItems = raw.cartVariants.filter(
    (cv) => cv.variant.product.isOutOfStock
  ).length;

  const couponDiscountValue = raw.subtotal * (discountPercent / 100);

  return {
    ...raw,
    cartQuantity,
    totalAvailableItems,
    totalOutOfStockItems,
    couponDiscountValue,
    discountPercent,
  };
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  const [rawCart, setRawCart] = useState<ApiCart | null>(null);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { user, isLogged } = useContext(UserContext);

  // Ref para sempre ter acesso ao userId atual sem precisar de stale closure
  const userIdRef = useRef<number | null>(null);
  userIdRef.current = user?.id ?? null;

  const cart: Cart | null = rawCart ? enrichCart(rawCart, discountPercent) : null;

  // ── refreshCart ───────────────────────────────────────────────────────────
  // Lê userIdRef.current em vez de depender de closure — nunca fica stale.
  const refreshCart = useCallback(async () => {
    const uid = userIdRef.current;
    if (!uid) return; // usuário ainda não carregou ou não está logado

    setIsLoading(true);
    try {
      const res = await fetch(`${API}/cart/${uid}`, { headers: authHeaders() });

      if (!res.ok) {
        console.error(`GET /cart/${uid} retornou ${res.status}`);
        return;
      }

      const data: ApiCart = await res.json();
      setRawCart(data);

      // Restaura o desconto do cupom se já estava salvo no banco
      if (data.promoCode) {
        setDiscountPercent(VALID_COUPONS[data.promoCode.toUpperCase()] ?? 0);
      }
    } catch (err) {
      console.error("Erro ao buscar carrinho:", err);
    } finally {
      setIsLoading(false);
    }
  }, []); // sem dependências → função estável, nunca recriada

  // ── Fetch automático quando isLogged ou user.id muda ─────────────────────
  useEffect(() => {
    if (isLogged && user?.id) {
      refreshCart();
    } else {
      setRawCart(null);
      setDiscountPercent(0);
    }
  }, [isLogged, user?.id]);

  // ── Add ───────────────────────────────────────────────────────────────────
  async function addToCart(variantId: number) {
    const uid = userIdRef.current;
    if (!uid) return;
    const res = await fetch(`${API}/cart/${uid}`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ variantId }),
    });
    if (res.ok) setRawCart(await res.json());
    else console.error("addToCart falhou:", res.status);
  }

  // ── Remove ────────────────────────────────────────────────────────────────
  async function removeFromCart(variantId: number) {
    const uid = userIdRef.current;
    if (!uid) return;
    const res = await fetch(`${API}/cart/${uid}`, {
      method: "DELETE",
      headers: authHeaders(),
      body: JSON.stringify({ variantId }),
    });
    if (res.ok) setRawCart(await res.json());
    else console.error("removeFromCart falhou:", res.status);
  }

  // ── Update Quantity ───────────────────────────────────────────────────────
  async function updateQuantity(variantId: number, newQty: number) {
    const uid = userIdRef.current;
    if (!uid) return;
    const res = await fetch(`${API}/cart/${uid}`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ variantId, quantity: newQty }),
    });
    if (res.ok) setRawCart(await res.json());
    else console.error("updateQuantity falhou:", res.status);
  }

  // ── Apply Coupon ──────────────────────────────────────────────────────────
  async function applyCoupon(code: string): Promise<boolean> {
    const uid = userIdRef.current;
    if (!uid) return false;
    const res = await fetch(`${API}/cart/${uid}/promo`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ code }),
    });
    if (res.ok) {
      const data: { discountPercent: number; cart: ApiCart } = await res.json();
      setDiscountPercent(data.discountPercent);
      setRawCart(data.cart);
      return true;
    }
    console.error("applyCoupon falhou:", res.status);
    return false;
  }

  return (
    <CartContext.Provider
      value={{ cart, isLoading, refreshCart, addToCart, removeFromCart, updateQuantity, applyCoupon }}
    >
      {children}
    </CartContext.Provider>
  );
}