import React from "react";
import { PiPackage } from "react-icons/pi";
import { CiCircleInfo } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { GoPaperclip } from "react-icons/go";
import Checkbox from "../Checkbox";

interface OrderListItemProps {
  index: number;
  isSelected: boolean;
  onCheckboxChange: (index: number) => void;
}

export const OrderListItem: React.FC<OrderListItemProps> = ({
  index,
  isSelected,
  onCheckboxChange,
}) => {
  return (
    <div className="w-full flex items-center gap-2 text-light-dark">
      <Checkbox checked={isSelected} onChange={() => onCheckboxChange(index)} />
      {/* Order Item */}
      <div
        className={`w-full bg-[#F7F7FC] flex justify-around border ${
          isSelected ? "border-dark-blue" : "border-light-gray3"
        } rounded-lg`}
      >
        <div className="w-full p-3 flex items-center">
          <PiPackage className="text-2xl mr-2" />
          <span>ord_{index + 1}</span>
        </div>
        <div className="w-full p-3 flex items-center border-l border-dashed border-light-gray3">
          <FaRegUserCircle className="text-2xl mr-2" />
          <span>Unreal User</span>
        </div>
        <div className="w-full p-3 flex items-center gap-2 border-l border-dashed border-light-gray3">
          <span>2</span>
          <CiCircleInfo className="text-xl ml-auto border rounded-md p-1 box-content" /> 
        </div>
        <div className="w-full p-3 flex items-center gap-2 border-l border-dashed border-light-gray3">
          <span>1538</span>
        </div>
        <div className="w-full p-3 flex items-center gap-2 border-l border-dashed border-light-gray3">
          <span>$3,599.4</span>
        </div>
        <div className="w-full p-3 flex items-center gap-2 border-l border-dashed border-light-gray3">
          <span>Credit Card</span>
        </div>
        <div className="w-full p-3 flex items-center gap-2 border-l border-dashed border-light-gray3">
          <button className="bg-light-green rounded-lg px-2 py-1 text-green">
            Ready
          </button>
          <Checkbox checked={isSelected} onChange={() => onCheckboxChange(index)} />
          <GoPaperclip className="text-xl ml-auto border rounded-md p-1 box-content" /> 
        </div>
        <div className="w-full p-3 flex items-center border-l border-dashed border-light-gray3">
          11 Nov 2024
        </div>
      </div>
    </div>
  );
};
