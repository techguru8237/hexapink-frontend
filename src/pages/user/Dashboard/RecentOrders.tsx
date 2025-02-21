import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PiPackage } from "react-icons/pi";
import { GoArrowUpRight } from "react-icons/go";

import { orders } from "../data";

const filterOptions = ["All", "Unpaid", "Waiting", "Paid"];

interface Order {
  id: string;
  files: string;
  leads: string;
  price: string;
  status: string;
  date: string;
}

export default function OrdersTable() {
  const [currentFilter, setCurrentFilter] = useState<string>("All");
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

  useEffect(() => {
    const filtered =
      currentFilter === "All"
        ? orders
        : orders?.filter((order) => order.status === currentFilter);
    setFilteredOrders(filtered);
  }, [currentFilter, orders]);

  return (
    <div className="w-full flex flex-col gap-4 p-8 text-dark border-b-2 border-light-gray-1">
      <div className="w-full flex items-center">
        <div className="flex items-center gap-2 text-xl">
          <PiPackage />
          Recent Orders
        </div>
        <Link to="/user/orders" className="flex items-center gap-1 ml-2 underline text-xs">
          See All <GoArrowUpRight />
        </Link>

        {/* Filter */}
        <div className="flex items-center gap-2 ml-auto bg-light-gray-2 border border-light-gray-3 rounded-lg p-1">
          {filterOptions.map((item, index) => (
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
                <PiPackage className="inline-block text-xl mr-1" />
                ID
              </th>
              <th className="px-4 py-3">Files</th>
              <th className="px-4 py-3">Leads</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-light-gray-1">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-3 text-gray-500">
                  No orders available
                </td>
              </tr>
            ) : (
              filteredOrders.slice(0, 3).map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-light-dark">
                    <PiPackage className="inline-block mr-1 text-xl" />
                    {order.id}
                  </td>
                  <td className="px-4 py-3">{order.files}</td>
                  <td className="px-4 py-3">{order.leads}</td>
                  <td className="px-4 py-3">{order.price}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`border px-2 py-1 rounded-md text-xs ${
                        order.status === "Paid"
                          ? "bg-light-green-2 border-light-green-1 text-green"
                          : order.status === "Waiting"
                          ? "bg-[#FAFAFA] border-[#E6E6E6] text-dark"
                          : "bg-light-red-2 border-light-red-1 text-red"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{order.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
