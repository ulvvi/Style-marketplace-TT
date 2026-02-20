import blackArrowIcon from "../../assets/icons/blackArrowIcon.svg";
import { useCart } from "../../contexts/CartProvider";

interface ReturnButtonProps {
  text: string;
  link: string;
  isCart?: boolean;
}

const ReturnButton = ({ text, link, isCart = false }: ReturnButtonProps) => {
  const { cart } = useCart();
  const totalAvailableItems = cart?.totalAvailableItems ?? 0;

  return (
    <div className="flex flex-row w-full h-16 items-center m-4 md:px-35 gap-4 md:gap-5">
      <a href={link}>
        <img
          src={blackArrowIcon}
          alt="Go back"
          className="rotate-180 size-5 hover:bg-gray-200 rounded-[5px]"
        />
      </a>

      <span className="font-black text-3xl">{text}</span>

      {isCart && totalAvailableItems > 0 && (
        <div className="flex items-center justify-center h-5 bg-gray-300 border-none rounded-xl px-2">
          <p className="text-black font-medium text-xs">
            {totalAvailableItems} {totalAvailableItems === 1 ? "item" : "items"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ReturnButton;