import React from "react";
import { CiCircleInfo } from "react-icons/ci";
import { PiUserCircleLight } from "react-icons/pi";
import { PiPencilSimpleLight } from "react-icons/pi";
import Checkbox from "../Checkbox";
import { UserItem } from "../../types";

interface UserListItemProps {
  index: number;
  data: UserItem;
  isSelected: boolean;
  onCheckboxChange: (id: string) => void;
}

export const UserListItem: React.FC<UserListItemProps> = ({
  data,
  index,
  isSelected,
  onCheckboxChange,
}) => {
  return (
    <div className="w-full flex items-center gap-2 text-light-dark">
      <Checkbox
        checked={isSelected}
        onChange={() => onCheckboxChange(data._id)}
      />
      {/* User Item */}
      <div
        className={`w-full bg-[#F7F7FC] flex justify-around border ${
          isSelected ? "border-dark-blue" : "border-light-gray3"
        } rounded-lg`}
        onClick={() => onCheckboxChange(data._id)}
      >
        <div className="w-[15%] p-3 flex items-center">
          <PiUserCircleLight className="text-2xl mr-2" />
          <span>{`User_${index}`}</span>
          <CiCircleInfo className="text-xl ml-auto border rounded-md p-1 box-content" />
        </div>
        <div className="w-[15%] p-3 flex items-center border-l border-dashed border-light-gray3">
          <span>{data.firstName + " " + data.lastName}</span>
        </div>
        <div className="w-[20%] p-3 flex items-center gap-2 border-l border-dashed border-light-gray3">
          <span>{data.email}</span>
          <button className="bg-light-green rounded-lg px-2 py-1 text-green">
            Verified
          </button>
        </div>
        <div className="w-[20%] p-3 flex items-center gap-2 border-l border-dashed border-light-gray3">
          <span>{data.phone}</span>
        </div>
        <div className="w-[15%] p-3 flex items-center gap-2 border-l border-dashed border-light-gray3">
          <button className="bg-light-green rounded-lg px-2 py-1 text-light-dark">
            Suspended
          </button>
          <PiPencilSimpleLight className="text-xl ml-auto border rounded-md p-1 box-content" />
        </div>
        <div className="w-[15%] p-3 flex items-center border-l border-dashed border-light-gray3">
          {data.createdAt.split("T")[0]}
        </div>
      </div>
    </div>
  );
};
