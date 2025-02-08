import Sidebar from "../../components/Dashboard/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } 
  }, [isAuthenticated]);

  return (
    <div className="h-full flex flex-row border-b border-light-gray3">
      <Sidebar type="admin" />
      <div className="min-h-screen flex-1 bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
