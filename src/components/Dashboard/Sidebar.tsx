import React from "react";
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
import {
  FaUserCircle,
  FaRegFolderOpen,
  FaFolderOpen,
} from "react-icons/fa";

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

  return (
    <div className="h-screen flex flex-col w-72 bg-white text-dark border-r border-light-gray3">
      <div className="h-20 border-b border-dashed p-2">
        <Link
          to="/"
          className="flex items-center gap-2 p-4 text-2xl font-bold cursor-pointer"
        >
          <img src={logo} alt="logo image" />
          <span>Hexapink</span>
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

        {isAuthenticated && <button
          onClick={logout}
          className="border border-dark-blue bg-transparent hover:bg-dark-blue text-dark hover:text-white"
        >
          Logout
        </button>}
      </div>
    </div>
  );
};

export default Sidebar;
