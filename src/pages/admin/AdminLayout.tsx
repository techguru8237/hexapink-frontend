import Sidebar from "../../components/Admin/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      if (localStorage.getItem("userType") != "Manager") {
        navigate('/user')
      }
    }
  }, [isAuthenticated]);

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
