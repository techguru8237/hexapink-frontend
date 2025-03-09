import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { CiFilter } from "react-icons/ci";
import { PiPackage } from "react-icons/pi";

import api from "../../actions/api";

import AdminHeader from "../../components/Admin/AdminHeader";
import Pagination from "../../components/Common/Pagination";
import LoadingElement from "../../components/Common/LoadingElement";
import OrderListHeader from "../../components/AdminOrder/OrderListHeader";
import { OrderListItem } from "../../components/AdminOrder/OrderListItem";
import { Order } from "../../types";

export default function Orders() {
  const [searchParams] = useSearchParams();

  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterPanelVisible, setIsFilterPanelVisible] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const itemsPerPage = 3; // Number of items per page

  useEffect(() => {
    const fetchOrders = async () => {
      const queryParams = new URLSearchParams(searchParams);
      queryParams.set("limit", itemsPerPage.toString());

      try {
        setLoading(true);
        const response = await api.get(`/api/order?${queryParams.toString()}`);

        setFilteredOrders(response.data.orders);
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
    setCurrentPage(page);
  };

  const handleCheckboxChange = (index: string) => {
    setSelectedFiles((prevSelectedFiles) =>
      prevSelectedFiles.includes(index)
        ? prevSelectedFiles.filter((fileIndex) => fileIndex !== index)
        : [...prevSelectedFiles, index]
    );
  };

  const handleClickFilter = () => {
    setIsFilterPanelVisible(!isFilterPanelVisible);
  };

  // Calculate the start and end indices for slicing the filteredOrders array
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFiles = filteredOrders.slice(startIndex, endIndex);

  return (
    <div className="h-full flex flex-col">
      <AdminHeader icon={<PiPackage />} label="Orders" />

      <div className="h-full bg-light-gray border-b border-light-gray-1 flex">
        <div className="flex flex-col flex-1 border-r border-light-gray-1">
          <div className="px-8 py-4 border-b border-light-gray-1 flex items-center justify-between text-light-dark">
            {selectedFiles.length > 0 && (
              <span>{selectedFiles.length} Selected</span>
            )}
            <div className="ml-auto flex items-center divide-x">
              <div className="pr-4 flex items-center gap-2">
                {filteredOrders.length > 0 && (
                  <span>{filteredOrders.length} Results</span>
                )}
                <button
                  onClick={handleClickFilter}
                  className="flex items-center border border-light-gray-3 rounded-md px-2 py-1 text-dark cursor-pointer"
                >
                  <CiFilter />
                  <span>Filter</span>
                </button>
              </div>
              <div className="pl-4">
                <Pagination
                  onPageSizeChange={() => {}}
                  rowsPerPage={itemsPerPage}
                  pageSizeOptions={[5, 10, 20, 50]}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>

          <div className="p-8 flex flex-col gap-4">
            <OrderListHeader />
            {loading ? (
              <div className="w-full h-full flex items-center justify-center">
                <LoadingElement width="32" color="blue" />
              </div>
            ) : (
              currentFiles.map((item) => (
                <OrderListItem
                  data={item}
                  key={item._id}
                  index={item._id}
                  isSelected={selectedFiles.includes(item._id)}
                  onCheckboxChange={handleCheckboxChange}
                />
              ))
            )}
          </div>
        </div>
        {/* {isFilterPanelVisible && (
          <div className="p-6">
            <FilterPanel
              onClose={handleClickFilter}
              items={dummyData}
              setFilteredItems={setFilteredOrders}
            />
          </div>
        )} */}
      </div>
    </div>
  );
}
