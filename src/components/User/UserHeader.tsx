import React, { JSX } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  PiWalletLight,
  PiUserCircleLight,
  PiWalletFill,
  PiShoppingCartFill,
  PiShoppingCartLight,
} from "react-icons/pi";

import { useUserContext } from "../../contexts/User";
import useCartStore from "../../Store/useCartStore";
import { GoArrowRight } from "react-icons/go";

interface UserHeaderProps {
  icon: JSX.Element;
  label: string;
}

export default function UserHeader({ icon, label }: UserHeaderProps) {
  const location = useLocation();
  const { currentUser } = useUserContext();
  const carts = useCartStore((state) => state.carts);

  const isWallet = location.pathname.includes(`/wallet`);
  const isCart = location.pathname.includes(`/cart`);
  const isDashboard = location.pathname.includes(`/dashboard`);

  return (
    <div className="h-20 min-h-20 max-h-20 box-border px-4 sm:px-8 border-b border-light-gray-3 flex justify-between items-center font-raleway">
      <div className="flex-1 flex items-center gap-2 text-xl">
        {React.cloneElement(icon, {
          style: { color: "#4040BF" },
        })}
        <span className="text-dark-blue text-xl">{label}</span>
      </div>

      <div className="flex items-center gap-2">
        {isDashboard && (
          <Link
            to="/user/files/new"
            className="w-full flex items-center gap-2 justify-center bg-dark-blue text-white rounded-full p-2"
          >
            Create File <GoArrowRight />
          </Link>
        )}
        <Link
          to="/user/cart"
          className={`p-2 flex items-center gap-2 cursor-pointer whitespace-nowrap box-border ${
            isCart
              ? "bg-light-gray-2 border border-light-gray-3 rounded-lg"
              : ""
          }`}
        >
          {isCart ? (
            <PiShoppingCartFill className="text-2xl text-dark-blue" />
          ) : (
            <PiShoppingCartLight className="text-2xl text-dark" />
          )}

          <span className={`${isCart ? "text-dark-blue" : "text-dark"}`}>
            Cart{" "}
            <span
              className={`px-2 py-1 rounded-md ${
                isCart ? "bg-white" : "bg-light-gray-1"
              }`}
            >
              {carts.length}
            </span>
          </span>
        </Link>
        <Link
          to="/user/wallet"
          className={`p-2 flex items-center gap-2 cursor-pointer box-border ${
            isWallet
              ? "bg-light-gray-2 border border-light-gray-3 rounded-lg"
              : ""
          }`}
        >
          {isWallet ? (
            <PiWalletFill className="text-2xl text-dark-blue" />
          ) : (
            <PiWalletLight className="text-2xl text-dark" />
          )}

          <span className={`${isWallet ? "text-dark-blue" : "text-dark"}`}>
            Wallet
          </span>
        </Link>
        <div className="flex items-center gap-2 cursor-pointer whitespace-nowrap">
          <PiUserCircleLight className="text-2xl" />
          <span className="hidden sm:flex">{currentUser?.name}</span>
        </div>
      </div>
    </div>
  );
}
