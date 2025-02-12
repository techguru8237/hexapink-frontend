import Sidebar from "../../components/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar type="user" />
      <div className="min-h-screen flex-1 bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
