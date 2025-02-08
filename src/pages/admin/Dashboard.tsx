import AdminHeader from "../../components/Dashboard/AdminHeader";
import AdminCard from "../../components/Dashboard/AdminCard";
import { RiDashboard3Line } from "react-icons/ri";

export default function Dashboard() {
  return (
    <div className="h-full flex flex-col">
      <AdminHeader icon={<RiDashboard3Line />} label="Dashboard" />
      <div className="h-full flex flex-row gap-4 justify-between">
        <div className="h-20 px-8 py-4 flex-1 justify-between items-center"></div>
        <div className="w-80 px-4 py-4 border-l-2 border-light-gray1 flex justify-center">
          <AdminCard />
        </div>
      </div>
    </div>
  )
}
