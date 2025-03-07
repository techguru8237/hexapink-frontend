import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PiPackage } from "react-icons/pi";
import { CiFilter } from "react-icons/ci";
import { Order } from "../../types";
import api from "../../actions/api";

import UserHeader from "../../components/User/UserHeader";
import Pagination from "../../components/Common/Pagination";
import OrderFilterPanel, {
  FilterValues,
} from "../../components/User/Order/FilterPanel";
import OrderItem from "../../components/User/Order/OrderItem";
import LoadingElement from "../../components/Common/LoadingElement";

export default function UserOrders() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isFilterPanelVisible, setIsFilterPanelVisible] = useState(false);

  const [itemsPerPage, setItemsPerPage] = useState<number>(6);
  const currentPage = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    const fetchOrders = async () => {
      const queryParams = new URLSearchParams(searchParams);
      queryParams.set("limit", itemsPerPage.toString());

      try {
        setLoading(true);
        const response = await api.get(`/api/order?${queryParams.toString()}`);

        console.log(response.data.orders);

        setOrders(response.data.orders);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [searchParams, itemsPerPage]);

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page.toString());
    navigate(`/user/orders?${newSearchParams.toString()}`);
  };

  const handleFilterChange = (filters: FilterValues) => {
    const newSearchParams = new URLSearchParams();

    // Add existing non-filter params
    for (const [key, value] of searchParams.entries()) {
      if (
        ![
          "paid",
          "minVolume",
          "maxVolume",
          "minPrix",
          "maxPrix",
          "minDate",
          "maxDate",
          "page",
        ].includes(key)
      ) {
        newSearchParams.set(key, value);
      }
    }

    // Add filter params
    if (filters.paid && filters.paid.length > 0) {
      newSearchParams.set("paid", filters.paid.join(","));
    }

    if (filters.minVolume) newSearchParams.set("minVolume", filters.minVolume);
    if (filters.maxVolume) newSearchParams.set("maxVolume", filters.maxVolume);
    if (filters.minPrix) newSearchParams.set("minPrix", filters.minPrix);
    if (filters.maxPrix) newSearchParams.set("maxPrix", filters.maxPrix);
    if (filters.minDate) newSearchParams.set("minDate", filters.minDate);
    if (filters.maxDate) newSearchParams.set("maxDate", filters.maxDate);

    // Reset to page 1 when filters change
    newSearchParams.set("page", "1");

    navigate(`/user/orders?${newSearchParams.toString()}`);
  };

  return (
    <div className="h-full flex flex-col">
      <UserHeader icon={<PiPackage />} label="Orders" />

      <div className="h-full bg-light-gray border-b border-light-gray-1 flex">
        <div className="flex flex-col flex-1 border-r border-light-gray-1">
          <div className="px-8 py-4 border-b border-light-gray-1 flex items-center justify-between text-light-dark">
            <div className="ml-auto flex items-center divide-x">
              <div className="pr-4 flex items-center gap-2">
                {orders.length > 0 && <span>{orders.length} Results</span>}
                <button
                  onClick={() => setIsFilterPanelVisible(true)}
                  className="flex items-center border rounded-md px-2 py-1 text-dark cursor-pointer"
                >
                  <CiFilter />
                  <span>Filter</span>
                </button>
              </div>
              <div className="pl-4">
                <Pagination
                  onPageSizeChange={(size) => setItemsPerPage(size)}
                  rowsPerPage={itemsPerPage}
                  pageSizeOptions={[6, 10, 20, 50]}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
          {loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <LoadingElement width="32" color="blue" />
            </div>
          ) : (
            <div className="p-8 flex flex-wrap gap-4">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <OrderItem key={order._id} orderData={order} />
                ))
              ) : (
                <div className="w-full text-center py-8 text-gray-500">
                  No orders found matching your criteria
                </div>
              )}
            </div>
          )}
        </div>

        {isFilterPanelVisible && (
          <div className="p-6 transition duration-300 ease-in">
            <OrderFilterPanel
              onClose={() => setIsFilterPanelVisible(false)}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
