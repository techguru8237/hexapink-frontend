import React from "react";
import Sidebar from "../../components/Dashboard/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar type="user"/>
      <div className="flex-1 bg-white">{children}</div>
    </div>
  );
};

export default DashboardLayout;
