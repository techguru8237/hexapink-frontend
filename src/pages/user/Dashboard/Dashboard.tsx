import { RiDashboard3Line } from "react-icons/ri";

import UserHeader from "../../../components/User/UserHeader";
import RecenOrders from "./RecentOrders";
import RecentFiles from "./RecentFiles";
import RecentTopUp from "./RecentTopup";

import StatCard from "./StateCard";

export default function Dashboard() {
  return (
    <div className="h-full flex flex-col">
      <UserHeader
        icon={<RiDashboard3Line className="text-2xl" />}
        label="Dashborad"
      />

      <div className="w-full h-full overflow-y-auto flex bg-light-gray">
        <div className="w-full h-full flex flex-col">
          <RecenOrders />
          <RecentFiles />
          <RecentTopUp />
        </div>

        <div className="w-80 h-full flex flex-col gap-6 p-4 border-l-2 border-light-gray-1">
          <StatCard title="Balance" value="$5,200" link="/user/wallet" />
          <StatCard title="Files" value="15" link="/user/files" />
          <StatCard title="Leads" value="15000" />
          <StatCard title="Look Ups" value="75" link="/user/lookups" />
        </div>
      </div>
    </div>
  );
}
