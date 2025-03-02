import React from "react";
import { PiDatabaseLight } from "react-icons/pi";
import { GiPositionMarker } from "react-icons/gi";
import Checkbox from "../../Common/Checkbox";
import { Cart } from "../../../types";
import { useCurrency } from "../../../contexts/Currency";

interface CartListItemProps {
  index: number;
  cart: Cart;
  isSelected: boolean;
  onCheckboxChange: (index: string) => void;
}

export const CartListItem: React.FC<CartListItemProps> = ({
  cart,
  isSelected,
  onCheckboxChange,
}) => {
  const { currency } = useCurrency();
  return (
    <div className="w-full flex items-center gap-2 text-light-dark">
      <Checkbox checked={isSelected} />
      {/* File Item */}
      <div
        className={`w-full bg-[#F7F7FC] flex border ${
          isSelected ? "border-dark-blue" : "border-light-gray-3"
        } rounded-lg cursor-pointer`}
        onClick={() => onCheckboxChange(cart.id)}
      >
        <div className="w-[40%] p-2 flex items-center gap-2">
          <div className="w-12 h-12 bg-[#F0F0FA] rounded-l-lg flex items-center justify-center rounded-lg">
            {/* <PiImageSquareLight className="text-2xl" /> */}
            <img
              src={
                import.meta.env.VITE_BACKEND_URL +
                cart.image?.replace("uploads", "")
              }
              alt="file image"
            />
          </div>
          <div className="flex flex-col items-start">
            <span className="font-bold">Insurance Companies</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <PiDatabaseLight className="text-md" />
                <span>Particuliers</span>
              </div>
              <div className="flex items-center">
                <GiPositionMarker className="text-md" />
                <span>Belgique</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[20%] p-2 flex items-center border-l border-dashed border-light-gray-3">
          {cart.volume}
        </div>
        <div className="w-[20%] p-2 flex items-center border-l border-dashed border-light-gray-3">
          {currency}&nbsp;{cart.unitPrice}
        </div>
        <div className="w-[20%] p-2 flex items-center gap-2 border-l border-dashed border-light-gray-3">
          {currency}&nbsp;{cart.volume * (cart.unitPrice || 1)}
        </div>
      </div>
    </div>
  );
};
