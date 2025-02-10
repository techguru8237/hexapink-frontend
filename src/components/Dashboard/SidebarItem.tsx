import { Link } from 'react-router-dom';
import React from "react";
import { SidebarItemType } from "./types";
import { useLocation } from 'react-router-dom';

export default function SidebarItem(data: SidebarItemType) {
  const location = useLocation();
  const isActive = location.pathname.includes(`/${data.type}/${data.link}`);

  return (
    <Link to={`/${data.type}/${data.link}`}>
      <div
        className={`flex items-center gap-2 p-2 ${
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
        <span
          className={`text-lg ${
            isActive ? "text-dark-blue" : "text-dark"
          } hidden lg:block`}
        >
          {data.label}
        </span>
      </div>
    </Link>
  );
}

