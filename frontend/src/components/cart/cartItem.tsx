import { useCart, type CartVariantItem } from "../../contexts/CartProvider";

interface CartItemProps {
  cartVariant: CartVariantItem;
}

export const CartItem = ({ cartVariant }: CartItemProps) => {
  const { variant, quantity } = cartVariant;
  const { product } = variant;

  const { removeFromCart, updateQuantity } = useCart();

  const inStock = !product.isOutOfStock && variant.stock > 0;
  const hasSalePrice = product.SalePrice !== null && product.SalePrice !== undefined;

  const displayPrice = hasSalePrice ? product.SalePrice! : product.price;
  const savedAmount = hasSalePrice
    ? +(product.price - product.SalePrice!).toFixed(2)
    : 0;

  const handleAdd = () => {
    if (quantity < Math.min(variant.stock, 10)) {
      updateQuantity(variant.id, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(variant.id, quantity - 1);
    }
  };

  return (
    <div className="flex flex-col pr-4 pl-4">
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 pl-5 pb-10 pr-5">

        {/* Imagem do produto */}
        {product.photoUrl ? (
          <img
            src={product.photoUrl}
            alt={product.name}
            className="h-25 w-25 object-cover rounded-3xl"
          />
        ) : (
          <div className="h-25 w-25 bg-gray-300 rounded-3xl flex-shrink-0" />
        )}

        <div className="md:flex md:flex-col flex-1">

          {/* Nome + Preço */}
          <div className="flex flex-row items-center justify-between">
            <span className="font-bold">{product.name}</span>

            {hasSalePrice ? (
              <div className="flex flex-col items-end pr-2 gap-0.5">
                <div className="flex flex-row gap-1">
                  <span className="font-black">${displayPrice.toFixed(2)}</span>
                  <span className="line-through text-gray-400">${product.price.toFixed(2)}</span>
                </div>
                <span className="bg-red-400 rounded-xl px-2 py-0.5 text-white text-xs">
                  Save ${savedAmount}
                </span>
              </div>
            ) : (
              <span className="font-black pr-2">${displayPrice.toFixed(2)}</span>
            )}
          </div>

          {/* Brand (opcional) */}
          {product.brand && (
            <span className="text-base font-light text-gray-500">{product.brand}</span>
          )}

          {/* Tamanho e Cor */}
          <div className="flex flex-row gap-3 mt-1">
            <span className="text-sm font-light text-gray-600">Size: {variant.size}</span>
            <span className="text-sm font-light text-gray-600">Color: {variant.color}</span>
          </div>

          {/* Controles de quantidade / Notify */}
          <div className="flex flex-col md:flex-row md:justify-between mt-2">
            {inStock ? (
              <div className="flex flex-row border border-gray-500 rounded-xl px-2 gap-3 items-center w-max">
                <button
                  className="bg-transparent text-black text-2xl"
                  onClick={handleDecrement}
                  aria-label="Diminuir quantidade"
                >
                  −
                </button>
                <span className="text-black text-base px-3">{quantity}</span>
                <button
                  className="bg-transparent text-black text-2xl"
                  onClick={handleAdd}
                  aria-label="Aumentar quantidade"
                >
                  +
                </button>
              </div>
            ) : (
              <div className="flex flex-row border border-gray-500 rounded-md px-2 items-center w-max hover:bg-gray-300">
                <button className="text-black text-sm px-3 bg-transparent">
                  Notify When Available
                </button>
              </div>
            )}

            {/* Ações secundárias */}
            <div className="flex flex-row gap-5 mt-2">
              <button className="flex flex-row items-center bg-transparent hover:bg-gray-200 border-none rounded-2xl px-2">
                <img
                  src="src/assets/icons/wishlistButton.svg"
                  alt="wishlist"
                  className="size-5"
                />
                <span className="font-medium">Save for Later</span>
              </button>

              <button
                className="flex flex-row items-center bg-transparent hover:bg-gray-200 border-none rounded-2xl px-2"
                onClick={() => removeFromCart(variant.id)}
              >
                <img
                  src="src/assets/icons/removeButton.svg"
                  alt="remove"
                  className="size-5"
                />
                <span className="font-medium">Remove</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Divisor */}
      <span className="h-px w-full bg-gray-300" />
    </div>
  );
};