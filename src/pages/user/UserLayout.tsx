import Sidebar from "../../components/Admin/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="max-h-screen flex font-raleway">
      <Sidebar type="user" />
      <div className="min-h-screen flex-1 bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
