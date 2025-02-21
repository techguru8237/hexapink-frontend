import React, { JSX } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { PiWalletLight, PiUserCircleLight, PiWalletFill } from "react-icons/pi";
import { useUserContext } from "../../contexts/User";

interface UserHeaderProps {
  icon: JSX.Element;
  label: string;
}

export default function UserHeader({ icon, label }: UserHeaderProps) {
  const location = useLocation();
  const {currentUser} = useUserContext();
  const isActive = location.pathname.includes(`/wallet`);

  return (
    <div className="h-20 min-h-20 max-h-20 box-border px-4 sm:px-8 border-b border-light-gray-3 flex justify-between items-center font-raleway">
      <div className="flex items-center gap-2 text-xl">
        {React.cloneElement(icon, {
          style: { color: "#4040BF" },
        })}
        <span className="text-dark-blue text-2xl font-bold">{label}</span>
      </div>

      <div className="flex items-center gap-8">
        <Link
          to="/user/wallet"
          className={`flex items-center gap-2 cursor-pointer ${isActive ? "p-2 bg-light-gray-1 border border-light-gray-3 rounded-lg" : ""}`}
        >
          {isActive ? (
            <PiWalletFill className="text-2xl text-dark-blue" />
          ) : (
            <PiWalletLight className="text-2xl" />
          )}

          <span className={`${isActive ? "text-dark-blue" : "text-dark"}`}>
            Wallet
          </span>
        </Link>
        <div className="flex items-center gap-2 cursor-pointer">
          <PiUserCircleLight className="text-2xl" />
          <span className="hidden sm:flex">
            {currentUser?.name}
          </span>
        </div>
      </div>
    </div>
  );
}
