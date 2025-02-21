import React, { JSX } from "react";
import { Link } from "react-router-dom";
import { PiPlusCircle } from "react-icons/pi";
import { useLocation } from "react-router-dom";
import { PiWalletLight, PiUserCircleLight } from "react-icons/pi";

interface UserHeaderProps {
  icon: JSX.Element;
  label: string;
}

export default function UserHeader({ icon, label }: UserHeaderProps) {
  const location = useLocation();

  return (
    <div className="h-20 min-h-20 max-h-20 box-border px-4 sm:px-8 border-b border-light-gray-3 flex justify-between items-center font-raleway">
      <div className="flex items-center gap-2 text-xl">
        {React.cloneElement(icon, {
          style: { color: "#4040BF" },
        })}
        <span className="text-dark-blue text-2xl font-bold">{label}</span>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 cursor-pointer">
          <PiWalletLight className="text-2xl" />
          <span>Wallet</span>
          <span className="bg-light-gray-3 px-2 rounded-md">$1200</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <PiUserCircleLight className="text-2xl" />
          <span className="hidden sm:flex">
            {localStorage.getItem("userName")}
          </span>
        </div>
      </div>
    </div>
  );
}
