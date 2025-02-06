import React from "react";
import { Link } from 'react-router-dom';

import { PiDatabaseLight, PiDatabaseFill, PiPackage, PiPackageFill, PiBinoculars, PiBinocularsFill, PiTableLight, PiTableFill, PiBankLight, PiBankFill } from "react-icons/pi";
import { RiDashboard3Line, RiDashboard3Fill } from "react-icons/ri";
import { FaRegUserCircle, FaUserCircle, FaRegFolderOpen, FaFolderOpen } from "react-icons/fa";


import { SidebarItemType } from "./types";
import logo from "../../assets/TheHomePage/image/logo.svg";
import SidebarItem from "./SidebarItem";

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
    icon: <FaRegUserCircle className="text-xl" />,
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
    icon: <FaRegFolderOpen className="text-xl" />,
    selectedIcon: <FaFolderOpen className="text-xl" />,
  },
  {
    type: "admin",
    label: "PaymentMethod",
    link: "paymentmethod",
    icon: <PiBankLight className="text-xl" />,
    selectedIcon: <PiBankFill className="text-xl" />,
  },
];

interface SidebarProps {
  type: string;
}

const Sidebar: React.FC<SidebarProps> = ({ type }) => {
  return (
    <div className="h-screen w-72 bg-white text-dark border-r border-light-gray3">
      <div className="dashboard-header h-20 border-b border-dashed p-2">
        <Link
          to="/"
          className="flex items-center gap-2 p-4 text-2xl font-bold cursor-pointer"
        >
          <img src={logo} alt="logo image" />
          <span>Hexapink</span>
        </Link>
      </div>
      <div className="dashboard-body flex flex-col gap-2 p-4">
        {items.filter(item => item.type === type).map((item, index) => (
          <SidebarItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
