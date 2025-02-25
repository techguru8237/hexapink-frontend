import { Outlet } from "react-router-dom";


import Sidebar from "../../components/Common/Sidebar";

const DashboardLayout = () => {

  return (
    <div className="h-full flex flex-row items-stretch border-b border-light-gray-3 font-raleway">
      <Sidebar type="admin" />
      <div className="flex flex-col flex-1 bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
