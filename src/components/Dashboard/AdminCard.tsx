import React from "react";
import { JSX } from "react";
import { PiWalletThin, PiDatabaseLight, PiBinoculars, PiArrowUpRightThin } from "react-icons/pi";
import { CiGrid2H } from "react-icons/ci";

interface AdminCardType {
  type: string;
  value: string;
  moreinfo: boolean;
  icon: JSX.Element;
}

const items: AdminCardType[] = [
  {
    type: "Balance",
    value: "$ 5,200",
    moreinfo: true,
    icon: <PiWalletThin className="text-xl" />,
  },
  {
    type: "Files",
    value: "15",
    moreinfo: true,
    icon: <PiDatabaseLight className="text-xl" />,
  },
  {
    type: "Leads",
    value: "15 000",
    moreinfo: false,
    icon: <CiGrid2H className="text-xl" />,
  },
  {
    type: "Look Ups",
    value: "75",
    moreinfo: true,
    icon: <PiBinoculars className="text-xl" />,
  },
];

const AdminCard: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex flex-col border-2 border-light-gray3 items-center justify-center bg-white rounded-xl"
        >
          <div className="flex flex-row border-b-2 w-full m-1 justify-between">
            {/* Adjusted icon and type container */}
            <div className="flex items-center justify-center p-2 rounded-full gap-2">
              {item.icon}
              <span className="text-sm font-semibold text-gray-500">
                {item.type}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center m-4">
              {item.moreinfo && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-500">
                    More
                  </span>
                  <PiArrowUpRightThin />
                </div>
              )}
            </div>
          </div>
          {/* Adjusted value container with padding */}
          <span className="text-2xl text-blue-700 font-bold w-full text-left px-4 py-5">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default AdminCard;
