import React, { JSX } from "react";
import { Link } from 'react-router-dom';
import { PiPlusCircle } from "react-icons/pi";
import { useLocation } from 'react-router-dom';
import {
  PiWalletLight,
  PiUserCircleLight,
} from "react-icons/pi";

interface HeaderProps {
  icon: JSX.Element;
  label: string;
}

export default function Header({ icon, label }: HeaderProps) {
  const location = useLocation();

  return (
    <div className="h-20 px-8 py-4 border-b border-light-gray3 flex justify-between items-center">
      <div className="flex items-center gap-2 text-xl">
        {React.cloneElement(icon, {
          style: { color: "#4040BF" },
        })}
        <h2 className="text-dark-blue">{label}</h2>
      </div>

      <div className="flex items-center gap-8">
        {location.pathname.includes("/dashboard") && (
            <div className="flex justify-center items-center gap-4">
              <Link to="/admin/dashboard" className="rounded-full px-4 py-2 flex items-center gap-2 bg-dark-blue text-white">
                <PiPlusCircle className="text-2xl" /> <span>Create Table</span>
              </Link>
              <Link to="/admin/dashboard" className="rounded-full px-4 py-2 flex items-center gap-2 bg-white text-dark-blue border border-dark-blue">
                <PiPlusCircle className="text-2xl" /> <span>Create Collection</span>
              </Link>
            </div>
          )
        }
        <div className="flex items-center gap-2 cursor-pointer">
          <PiWalletLight className="text-2xl" />
          <span>Wallet</span>
          <span className="bg-light-gray3 px-2 rounded-md">$1200</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <PiUserCircleLight className="text-2xl" />
          <span>Unreal Manager</span>
        </div>
      </div>
    </div>
  );
}
