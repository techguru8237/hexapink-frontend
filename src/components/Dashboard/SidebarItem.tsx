// import Link from "next/link";
import { Link } from 'react-router-dom';
import React from "react";
import { SidebarItemType } from "./types";
// import { usePathname } from "next/navigation";
import { useLocation } from 'react-router-dom';

export default function SidebarItem(data: SidebarItemType) {
  // const pathName = usePathname();
  const location = useLocation();
  const isActive = location.pathname === `/${data.type}/${data.link}`;

  return (
    <Link to={`/${data.type}/${data.link}`}>
      <div
        className={`w-full flex items-center gap-2 p-2 ${
          isActive ? "border border-light-gray3 bg-light-gray rounded-lg" : ""
        }`}
      >
          {isActive
            ? React.cloneElement(data.selectedIcon, {
                style: { color: "#4040BF" },
              })
            : React.cloneElement(data.icon, {
                style: { color: "black" },
              })}
        <span className={`${isActive ? "text-dark-blue" : ""} text-lg`}>
          {data.label}
        </span>
      </div>
    </Link>
  );
}
