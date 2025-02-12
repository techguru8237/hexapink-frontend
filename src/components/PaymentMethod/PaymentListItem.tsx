import React from "react";
import { PiTableLight, PiPencilSimpleLight } from "react-icons/pi";
import { CiCircleInfo } from "react-icons/ci";
import samlpeImg from "../../assets/payment.png";
import Checkbox from "../Checkbox";

interface PaymentListItemProps {
  index: number;
  isSelected: boolean;
  onCheckboxChange: (index: number) => void;
}

export const PaymentListItem: React.FC<PaymentListItemProps> = ({
  index,
  isSelected,
  onCheckboxChange,
}) => {
  return (
    <div className="w-full flex items-center gap-2 text-light-dark">
      <Checkbox checked={isSelected} onChange={() => onCheckboxChange(index)} />
      {/* Payment Item */}
      <div
        className={`w-full bg-[#F7F7FC] flex justify-around border ${
          isSelected ? "border-dark-blue" : "border-light-gray-3"
        } rounded-lg`}
      >
        <div className="w-full p-3 flex items-center">
          <PiTableLight className="text-2xl mr-2" />
          <span> bank_{index + 1}</span>
          <CiCircleInfo className="text-xl ml-auto border rounded-md p-1 box-content" /> 
        </div>
        <div className="w-full p-3 flex items-center justify-between gap-2 border-l border-dashed border-light-gray-3">
          <div className="w-12 h-12 bg-[#F0F0FA] border border-light-gray-3 rounded-l-lg flex items-center justify-center rounded-lg">
            {/* <PiImageSquareLight className="text-2xl" /> */}
            <img src={samlpeImg} alt="file image" className="rounded-lg"/>
          </div>
          <span>Bank of Africa</span>
        </div>
        <div className="w-full p-3 flex items-center divide-x border-l border-dashed border-light-gray-3">
          <span>John Doe</span>
        </div>
        <div className="w-full p-3 flex items-center gap-2 border-l border-dashed border-light-gray-3">
          <button className="h-8 bg-[#F0F0FA] border border-light-gray-3 rounded-l-lg flex items-center justify-center rounded-lg">
            Suspended
          </button>
          <PiPencilSimpleLight className="text-xl ml-auto border rounded-md p-1 box-content" />
        </div>
        <div className="w-full p-3 flex items-center border-l border-dashed border-light-gray-3">
          11 Nov 2024
        </div>
      </div>
    </div>
  );
};
