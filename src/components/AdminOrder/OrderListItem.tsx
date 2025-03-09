import React from "react";
import { PiPackage } from "react-icons/pi";
import { CiCircleInfo } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { GoPaperclip } from "react-icons/go";
import Checkbox from "../Common/Checkbox";
import { Order } from "../../types";

interface OrderListItemProps {
  data: Order;
  index: string;
  isSelected: boolean;
  onCheckboxChange: (index: string) => void;
}

export const OrderListItem: React.FC<OrderListItemProps> = ({
  data,
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
          isSelected ? "border-dark-blue" : "border-light-gray-3"
        } rounded-lg`}
      >
        <div className="w-full p-3 flex items-center">
          <PiPackage className="text-2xl mr-2" />
          <span>ord_{data._id.slice(-5)}</span>
        </div>
        <div className="w-full p-3 flex items-center border-l border-dashed border-light-gray-3">
          <FaRegUserCircle className="text-xl mr-2" />
          <span>{data.user.firstName + " " + data.user.lastName}</span>
        </div>
        <div className="w-full p-3 flex items-center gap-2 border-l border-dashed border-light-gray-3">
          <span>{data.files.length}</span>
          <CiCircleInfo className="text-xl ml-auto border rounded-md p-1 box-content" />
        </div>
        <div className="w-full p-3 flex items-center gap-2 border-l border-dashed border-light-gray-3">
          <span>{data.volume}</span>
        </div>
        <div className="w-full p-3 flex items-center gap-2 border-l border-dashed border-light-gray-3">
          <span>{data.prix}</span>
        </div>
        <div className="w-full p-3 flex items-center gap-2 border-l border-dashed border-light-gray-3">
          <span>{}</span>
        </div>
        <div className="w-full p-3 flex items-center gap-2 border-l border-dashed border-light-gray-3">
          {data.paid === "Paid" ? (
            <span className="text-green border border-light-green-1 bg-light-green-2 p-1 rounded-md">
              Paid
            </span>
          ) : (
            <div className="flex items-center gap-1">
              <span className="border border-light-gray-1 bg-light-gray-2 p-1 rounded-sm">
                Waiting
              </span>
              <Checkbox
                checked={isSelected}
                onChange={() => onCheckboxChange(index)}
              />
              <GoPaperclip className="text-xl ml-auto border rounded-md p-1 box-content" />
            </div>
          )}
        </div>
        <div className="w-full p-3 flex items-center border-l border-dashed border-light-gray-3">
          {data.createdAt.split("T")[0]}
        </div>
      </div>
    </div>
  );
};
