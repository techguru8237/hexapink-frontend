import Sidebar from "../../components/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex flex-row">
      <Sidebar type="admin" />
      <div className="flex-1 bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
