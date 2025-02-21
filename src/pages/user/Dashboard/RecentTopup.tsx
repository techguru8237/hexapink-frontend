import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PiWallet } from "react-icons/pi";
import { GoArrowUpRight } from "react-icons/go";

interface TopUp {
  id: string;
  paymentMethod: string;
  price: number;
  status: string;
  date: string;
}

const RecentTopUp: React.FC = () => {
  const [topUps, setTopUps] = useState<TopUp[]>([]);
  const [filteredTopUps, setFilteredTopUps] = useState<TopUp[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>("All");

  useEffect(() => {
    // Fetch top-up data from an API or other data source
    const fetchedTopUps: TopUp[] = [
      {
        id: "top_255",
        paymentMethod: "Credit Card",
        price: 500,
        status: "Waiting",
        date: "11 Nov 2024",
      },
      {
        id: "top_201",
        paymentMethod: "Credit Card",
        price: 200,
        status: "Completed",
        date: "11 Nov 2024",
      },
      {
        id: "top_255",
        paymentMethod: "Credit Card",
        price: 500,
        status: "Completed",
        date: "11 Nov 2024",
      },
    ];
    setTopUps(fetchedTopUps);
    setFilteredTopUps(fetchedTopUps);
  }, []);

  useEffect(() => {
    const filtered =
      currentFilter === "All"
        ? topUps
        : topUps.filter((topUp) => topUp.status === currentFilter);
    setFilteredTopUps(filtered);
  }, [currentFilter, topUps]);

  return (
    <div className="w-full flex flex-col gap-4 p-8 text-dark border-b-2 border-light-gray-1">
      <div className="w-full flex items-center">
        <div className="flex items-center gap-2 text-xl">
          <PiWallet />
          Recent Top Ups
        </div>
        <Link
          to="/user/top-ups"
          className="flex items-center gap-1 ml-2 underline text-xs"
        >
          See All <GoArrowUpRight />
        </Link>

        {/* Filter */}
        <div className="flex items-center gap-2 ml-auto bg-light-gray-2 border border-light-gray-3 rounded-lg p-1">
          {["All", "Waiting", "Completed"].map((item, index) => (
            <button
              key={index}
              onClick={() => setCurrentFilter(item)}
              className={`px-2 py-0.5 bg-transparent outline-light-gray-3 focus:outline-light-gray-3 ${
                item === currentFilter
                  ? "bg-white border border-light-gray-3 rounded-md"
                  : ""
              } text-sm`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white text-dark">
          <thead>
            <tr className="text-left text-xs font-semibold tracking-wider">
              <th className="px-4 py-3">
                <PiWallet className="inline-block text-xl mr-1" />
                ID
              </th>
              <th className="px-4 py-3">Payment Method</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-light-gray-1">
            {filteredTopUps.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-3 text-gray-500">
                  No top-ups available
                </td>
              </tr>
            ) : (
              filteredTopUps.slice(0, 3).map((topUp, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-light-dark">
                    <PiWallet className="inline-block mr-1 text-xl" />
                    {topUp.id}
                  </td>
                  <td className="px-4 py-3">{topUp.paymentMethod}</td>
                  <td className="px-4 py-3">${topUp.price.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`border px-2 py-1 rounded-md text-xs ${
                        topUp.status === "Completed"
                          ? "bg-light-green-2 border-light-green-1 text-green"
                          : "bg-[#FAFAFA] border-[#E6E6E6] text-dark"
                      }`}
                    >
                      {topUp.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{topUp.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTopUp;
