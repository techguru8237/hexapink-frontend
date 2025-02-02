import React, { JSX } from "react";
import {
  PiShoppingCartLight,
  PiWalletLight,
  PiUserCircleLight,
} from "react-icons/pi";

interface HeaderProps {
  icon: JSX.Element;
  label: string;
}

export default function Header({ icon, label }: HeaderProps) {
  return (
    <div className="h-20 px-8 py-4 border-b border-light-gray3 flex justify-between items-center">
      <div className="flex items-center gap-2 text-xl">
        {React.cloneElement(icon, {
          style: { color: "#4040BF" },
        })}
        <h2 className="text-dark-blue">{label}</h2>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 cursor-pointer">
            <PiShoppingCartLight className="text-2xl" />
            <span>Cart</span>
          </div>
          <span className="bg-light-gray3 px-2 rounded-md">6</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <PiWalletLight className="text-2xl" />
          <span>Wallet</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <PiUserCircleLight className="text-2xl" />
          <span>User</span>
        </div>
      </div>
    </div>
  );
}
