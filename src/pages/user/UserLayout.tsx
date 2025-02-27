import Sidebar from "../../components/Common/Sidebar";
import { Outlet } from "react-router-dom";


const UserLayout = () => {
  return (
    <div className="flex font-raleway">
      <Sidebar type="user" />
      <div className="min-h-screen flex-1 bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
