import { RiDashboard3Line } from "react-icons/ri";

import UserHeader from "../../../components/User/UserHeader";
import RecenOrders from "./RecentOrders";
import RecentFiles from "./RecentFiles";
import RecentTopUp from "./RecentTopup";

import StatCard from "./StateCard";
import { useUserContext } from "../../../contexts/User";

export default function Dashboard() {
  const { currentUser } = useUserContext();

  return (
    <div className="max-h-screen flex flex-col">
      <UserHeader
        icon={<RiDashboard3Line className="text-2xl" />}
        label="Dashborad"
      />

      <div className="h-full overflow-y-auto flex flex-1 bg-light-gray">
        <div className="h-full flex flex-1 flex-col border-r-2 border-light-gray-1">
          <RecenOrders />
          <RecentFiles />
          <RecentTopUp />
        </div>

        <div className="w-80 flex flex-col gap-6 p-4">
          <StatCard
            title="Balance"
            value={currentUser?.balance ?? 0}
            link="/user/wallet"
          />
          <StatCard title="Files" value={15} link="/user/files" />
          <StatCard title="Leads" value={15000} />
          <StatCard title="Look Ups" value={75} link="/user/lookups" />
        </div>
      </div>
    </div>
  );
}
