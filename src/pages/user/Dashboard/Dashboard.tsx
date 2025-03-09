import { useEffect, useState } from "react";
import { RiDashboard3Line } from "react-icons/ri";

import UserHeader from "../../../components/User/UserHeader";
import RecenOrders from "./RecentOrders";
import RecentFiles from "./RecentFiles";
import RecentTopUp from "./RecentTopup";

import StatCard from "./StateCard";
import { useUserContext } from "../../../contexts/User";
import api from "../../../actions/api";

export default function Dashboard() {
  const { currentUser } = useUserContext();

  const [countofFiles, setCountofFiles] = useState(0);
  const [countofLeads, setCountofLeads] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const response = await api.get('/api/file/count');
      setCountofFiles(response.data.totalFiles);
      setCountofLeads(response.data.totalLeads);
    }
    fetchCounts();
  }, []);

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
          <StatCard title="Files" value={countofFiles} link="/user/files" />
          <StatCard title="Leads" value={countofLeads} />
          {/* <StatCard title="Look Ups" value={0} link="/user/lookups" /> */}
        </div>
      </div>
    </div>
  );
}
