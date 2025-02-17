import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  PiDatabaseLight,
  PiDatabaseFill,
  PiPackage,
  PiPackageFill,
  PiBinoculars,
  PiBinocularsFill,
  PiTableLight,
  PiTableFill,
  PiBankLight,
  PiBankFill,
} from "react-icons/pi";
import { RiDashboard3Line, RiDashboard3Fill } from "react-icons/ri";
import { PiUserCircleLight } from "react-icons/pi";
import { FaUserCircle, FaRegFolderOpen, FaFolderOpen } from "react-icons/fa";
import {
  TbLayoutSidebarLeftExpand,
  TbLayoutSidebarRightExpand,
} from "react-icons/tb";
import { BiLogOutCircle } from "react-icons/bi";

import { SidebarItemType } from "./types";
import logo from "../../assets/TheHomePage/image/logo.svg";
import SidebarItem from "./SidebarItem";
import useAuth from "../../hooks/useAuth";

const items: SidebarItemType[] = [
  {
    type: "user",
    label: "Dashboard",
    link: "dashboard",
    icon: <RiDashboard3Line className="text-xl" />,
    selectedIcon: <RiDashboard3Fill className="text-xl" />,
  },
  {
    type: "user",
    label: "Files",
    link: "files",
    icon: <PiDatabaseLight className="text-xl" />,
    selectedIcon: <PiDatabaseFill className="text-xl" />,
  },
  {
    type: "user",
    label: "Orders",
    link: "orders",
    icon: <PiPackage className="text-xl" />,
    selectedIcon: <PiPackageFill className="text-xl" />,
  },
  {
    type: "user",
    label: "Look up",
    link: "lookup",
    icon: <PiBinoculars className="text-xl" />,
    selectedIcon: <PiBinocularsFill className="text-xl" />,
  },
  {
    type: "admin",
    label: "Dashboard",
    link: "dashboard",
    icon: <RiDashboard3Line className="text-xl" />,
    selectedIcon: <RiDashboard3Fill className="text-xl" />,
  },
  {
    type: "admin",
    label: "Orders",
    link: "orders",
    icon: <PiPackage className="text-xl" />,
    selectedIcon: <PiPackageFill className="text-xl" />,
  },
  {
    type: "admin",
    label: "Users",
    link: "users",
    icon: <PiUserCircleLight className="text-2xl" />,
    selectedIcon: <FaUserCircle className="text-xl" />,
  },
  {
    type: "admin",
    label: "Tables",
    link: "tables",
    icon: <PiTableLight className="text-xl" />,
    selectedIcon: <PiTableFill className="text-xl" />,
  },
  {
    type: "admin",
    label: "Collections",
    link: "collections",
    icon: <FaRegFolderOpen className="text-lg" />,
    selectedIcon: <FaFolderOpen className="text-lg" />,
  },
  {
    type: "admin",
    label: "PaymentMethod",
    link: "paymentmethod",
    icon: <PiBankLight className="text-lg" />,
    selectedIcon: <PiBankFill className="text-lg" />,
  },
];

interface SidebarProps {
  type: string;
}

const Sidebar: React.FC<SidebarProps> = ({ type }) => {
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility

  return (
    <div>
      {/* Mobile Toggle Button */}
      <div
        className={`sm:hidden p-2 text-dark text-2xl border border-light-gray-3 rounded-full bg-white cursor-pointer absolute top-14 ${isOpen? "left-12" : "-left-4"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <TbLayoutSidebarRightExpand />
        ) : (
          <TbLayoutSidebarLeftExpand />
        )}
      </div>

      {/* Sidebar */}
      <div
        className={`min-h-screen h-full flex flex-col lg:w-72 bg-white text-dark border-r border-light-gray-3 ${
          isOpen ? "flex" : "hidden"
        } sm:flex`}
      >
        <div className="h-20 border-b border-dashed p-2 flex items-center justify-center lg:justify-start">
          <Link
            to="/"
            className="flex items-center gap-2 lg:p-4 text-2xl font-bold cursor-pointer"
          >
            <img src={logo} alt="logo image" className="py-2 lg:py-0" />
            <span className="hidden lg:flex text-dark">Hexapink</span>
          </Link>
        </div>
        <div className="h-full p-4 flex flex-col justify-between">
          <div className="flex flex-col justify-between items-start">
            <div className="w-full flex flex-col gap-2">
              {items
                .filter((item) => item.type === type)
                .map((item, index) => (
                  <SidebarItem key={index} {...item} />
                ))}
            </div>
          </div>

          {isAuthenticated && (
            <button
              onClick={logout}
              className="border border-dark-blue bg-transparent hover:bg-dark-blue text-dark hover:text-white flex items-center gap-2 p-1 sm:p-2"
            >
              <BiLogOutCircle />
              <span className="hidden lg:flex">Logout</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
