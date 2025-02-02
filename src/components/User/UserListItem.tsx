import React from "react";
// import {PiDatabaseLight} from "react-icons/pi";
// import { PiPackage } from "react-icons/pi";
import { CiCircleInfo } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { PiPencilSimpleLight } from "react-icons/pi";
// import { GoPaperclip } from "react-icons/go";
// import samlpeImg from "../../assets/collection.png";
// import Image from "next/image";
import Checkbox from "../Checkbox";

interface UserListItemProps {
  index: number;
  isSelected: boolean;
  onCheckboxChange: (index: number) => void;
}

export const UserListItem: React.FC<UserListItemProps> = ({
  index,
  isSelected,
  onCheckboxChange,
}) => {
  return (
    <div className="w-full flex items-center gap-2 text-light-dark">
      <Checkbox checked={isSelected} onChange={() => onCheckboxChange(index)} />
      {/* User Item */}
      <div
        className={`w-full bg-[#F7F7FC] flex justify-around border ${
          isSelected ? "border-dark-blue" : "border-light-gray3"
        } rounded-lg`}
      >
        <div className="w-full p-3 flex items-center">
          <FaRegUserCircle className="text-2xl mr-2" />
          <span>user_{index + 1}</span>
          <CiCircleInfo className="text-xl ml-auto border rounded-md p-1 box-content" /> 
        </div>
        <div className="w-full p-3 flex items-center border-l border-dashed border-light-gray3">
          <span>Unreal User</span>
        </div>
        <div className="w-full p-3 flex items-center gap-2 border-l border-dashed border-light-gray3">
          <span>unreal.user@example.com</span>
          <button className="bg-light-green rounded-lg px-2 py-1 text-green">
            Verified
          </button>
        </div>
        <div className="w-full p-3 flex items-center gap-2 border-l border-dashed border-light-gray3">
          <span>+33 12 34 56 78</span>
        </div>
        <div className="w-full p-3 flex items-center gap-2 border-l border-dashed border-light-gray3">
          <button className="bg-light-green rounded-lg px-2 py-1 text-light-dark">
            Suspended
          </button>
          <PiPencilSimpleLight className="text-xl ml-auto border rounded-md p-1 box-content"/>
        </div>
        <div className="w-full p-3 flex items-center border-l border-dashed border-light-gray3">
          11 Nov 2024
        </div>
      </div>
    </div>
  );
};
