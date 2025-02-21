import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";

interface LookUp {
  id: string;
  phoneNumber: string;
  country: string;
  result: string;
  lastCheck: string;
}

const RecentLookUps = () => {
  const [lookUps, setLookUps] = useState<LookUp[]>([]);
  const [filteredLookUps, setFilteredLookUps] = useState<LookUp[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>("All");

  useEffect(() => {
    // Fetch look-up data from an API or other data source
    const fetchedLookUps: LookUp[] = [
      {
        id: "look_134",
        phoneNumber: "+1 257 892 891",
        country: "France",
        result: "Valid",
        lastCheck: "11 Nov 2024",
      },
      {
        id: "look_135",
        phoneNumber: "+1 257 892 892",
        country: "France",
        result: "Unvalid",
        lastCheck: "11 Nov 2024",
      },
      {
        id: "look_136",
        phoneNumber: "+1 257 892 893",
        country: "Belgique",
        result: "Valid",
        lastCheck: "11 Nov 2024",
      },
    ];
    setLookUps(fetchedLookUps);
    setFilteredLookUps(fetchedLookUps);
  }, []);

  useEffect(() => {
    const filtered =
      currentFilter === "All"
        ? lookUps
        : lookUps.filter((lookUp) => lookUp.result === currentFilter);
    setFilteredLookUps(filtered);
  }, [currentFilter, lookUps]);

  return (
    <div className="w-full flex flex-col gap-4 p-8 text-dark border-b-2 border-light-gray-1">
      <div className="w-full flex items-center">
        <div className="flex items-center gap-2 text-xl">
          <FaPhoneAlt />
          Recent Look Ups
        </div>
        <Link
          to="/user/look-ups"
          className="flex items-center gap-1 ml-2 underline text-xs"
        >
          See All <GoArrowUpRight />
        </Link>

        {/* Filter */}
        <div className="flex items-center gap-2 ml-auto bg-light-gray-2 border border-light-gray-3 rounded-lg p-1">
          {["All", "Valid", "Unvalid"].map((item, index) => (
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
                <FaPhoneAlt className="inline-block text-xl mr-1" />
                ID
              </th>
              <th className="px-4 py-3">Phone Number</th>
              <th className="px-4 py-3">Country</th>
              <th className="px-4 py-3">Result</th>
              <th className="px-4 py-3">Last Check</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-light-gray-1">
            {filteredLookUps.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-3 text-gray-500">
                  No look-ups available
                </td>
              </tr>
            ) : (
              filteredLookUps.slice(0, 3).map((lookUp, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-light-dark">
                    <FaPhoneAlt className="inline-block mr-1 text-xl" />
                    {lookUp.id}
                  </td>
                  <td className="px-4 py-3">{lookUp.phoneNumber}</td>
                  <td className="px-4 py-3">{lookUp.country}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`border px-2 py-1 rounded-md text-xs ${
                        lookUp.result === "Valid"
                          ? "bg-light-green-2 border-light-green-1 text-green"
                          : "bg-light-red-2 border-light-red-1 text-red"
                      }`}
                    >
                      {lookUp.result}
                    </span>
                  </td>
                  <td className="px-4 py-3">{lookUp.lastCheck}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentLookUps;
