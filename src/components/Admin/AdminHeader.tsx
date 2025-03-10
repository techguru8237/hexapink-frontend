import React, { JSX } from "react";
import { Link } from "react-router-dom";
import { PiPlusCircle } from "react-icons/pi";
import { useLocation } from "react-router-dom";
import { PiWalletLight, PiUserCircleLight } from "react-icons/pi";

interface HeaderProps {
  icon: JSX.Element;
  label: string;
}

export default function Header({ icon, label }: HeaderProps) {
  const location = useLocation();

  return (
    <div className="h-20 min-h-20 max-h-20 box-border px-4 sm:px-8 border-b border-light-gray-3 flex justify-between items-center">
      <div className="flex items-center gap-2 text-xl">
        {React.cloneElement(icon, {
          style: { color: "#4040BF" },
        })}
        <h2 className="text-dark-blue">{label}</h2>
      </div>

      <div className="flex items-center gap-8">
        {location.pathname.includes("/dashboard") && (
          <div className="hidden xl:flex justify-center items-center gap-4">
            <Link
              to="/admin/dashboard"
              className="rounded-full px-4 py-2 flex items-center gap-2 bg-dark-blue text-white"
            >
              <PiPlusCircle className="text-2xl" /> <span>Create Table</span>
            </Link>
            <Link
              to="/admin/dashboard"
              className="rounded-full px-4 py-2 flex items-center gap-2 bg-white text-dark-blue border border-dark-blue"
            >
              <PiPlusCircle className="text-2xl" />{" "}
              <span>Create Collection</span>
            </Link>
          </div>
        )}
        <div className="flex items-center gap-2 cursor-pointer">
          <PiWalletLight className="text-2xl" />
          <span>Wallet</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <PiUserCircleLight className="text-2xl" />
          <span className="hidden sm:flex">{localStorage.getItem("userName")}</span>
        </div>
      </div>
    </div>
  );
}
