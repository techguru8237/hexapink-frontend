import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { CiFilter } from "react-icons/ci";
import { PiArrowFatUpLight, PiBinoculars, PiPackage } from "react-icons/pi";

import api from "../../actions/api";
import { formatDate } from "../../utils/formatDate";

import UserHeader from "../../components/User/UserHeader";
import Pagination from "../../components/Common/Pagination";
import LoadingElement from "../../components/Common/LoadingElement";
import LookupPanel from "../../components/User/Lookup/LookupPanel";

export interface transactionItem {
  _id: string;
  price: number;
  type: string;
  paymentmethod: string;
  status: string;
  createdAt: string;
}

export interface lookupItem {
  _id: string;
  phoneNumber: string;
  country: string;
  result: string;
  lastCheck: string;
}

export default function Lookup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [walletTransactions, setWalletTransactions] = useState<
    transactionItem[]
  >([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isFilterPanelVisible, setIsFilterPanelVisible] = useState(false);
  const [lookupData, setLookupData] = useState<lookupItem | null>(null);

  const itemsPerPage = 5;
  const currentPage = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    const fetchWalletTransactions = async () => {
      const queryParams = new URLSearchParams(searchParams);

      try {
        setLoading(true);
        const response = await api.get(
          `/api/transaction/transactions?${queryParams.toString()}&limit=${itemsPerPage}`
        );

        setWalletTransactions(response.data.transactions);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching wallet transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletTransactions();
  }, [searchParams]);

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page.toString());
    navigate(`/user/wallet?${newSearchParams.toString()}`);
  };

  const handleClickFilter = () => {
    setIsFilterPanelVisible(!isFilterPanelVisible);
  };

  const getActiveFiltersCount = () => {
    const filterParams = [
      "operationType",
      "paymentMethod",
      "minPrice",
      "maxPrice",
      "startDate",
      "endDate",
    ];
    return filterParams.filter((param) => searchParams.has(param)).length;
  };

  const handleLookup = async (country: string, phoneNumber: string) => {
    try {
      setLoading(true);
      const response = await api.post("/api/lookup", { country, phoneNumber });
      setLookupData(response.data);
    } catch (error) {
      console.error("Error performing lookup:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <UserHeader icon={<PiBinoculars />} label="Lookup" />

      <div className="h-full bg-light-gray flex flex-row">
        <div className="h-full flex flex-col flex-1 border-r border-light-gray-1">
          <div className="px-8 py-4 border-b border-light-gray-1 flex items-center justify-between text-light-dark">
            <span>{walletTransactions.length} Operations</span>
            <div className="ml-auto flex items-center divide-x">
              <div className="pr-4 flex items-center gap-2">
                {getActiveFiltersCount() > 0 && (
                  <span>{getActiveFiltersCount()} Active Filters</span>
                )}
                <button
                  onClick={handleClickFilter}
                  className={`flex items-center border rounded-md px-2 py-1 text-dark cursor-pointer ${
                    getActiveFiltersCount() > 0
                      ? "border-dark-blue text-dark-blue"
                      : "border-light-gray-3"
                  }`}
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

          {/* Main Table */}
          <div className="min-w-full h-full p-4 sm:p-8 flex flex-col items-center gap-4">
            <table className="w-full bg-white text-dark">
              <thead>
                <tr className="text-left text-xs font-semibold tracking-wider">
                  <th className="px-4 py-3">
                    <PiPackage className="inline-block text-xl mr-1" />
                    Operation
                  </th>
                  <th className="px-4 py-3">Payment Method</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light-gray-1">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      <div className="flex justify-center">
                        <LoadingElement width="24" color="#4040BF" />
                      </div>
                    </td>
                  </tr>
                ) : walletTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-3 text-gray-500">
                      No transactions available
                    </td>
                  </tr>
                ) : (
                  walletTransactions.map((transaction) => (
                    <tr key={transaction._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-light-dark">
                        {transaction.type === "Topup" ? (
                          <PiArrowFatUpLight className="inline-block mr-1 text-xl" />
                        ) : transaction.type === "Order" ? (
                          <PiPackage className="inline-block mr-1 text-xl" />
                        ) : (
                          <PiBinoculars className="inline-block mr-1 text-xl" />
                        )}
                        {transaction._id.slice(-5)}
                      </td>
                      <td className="px-4 py-3">{transaction.paymentmethod}</td>
                      <td className="px-4 py-3">{transaction.price}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`border px-2 py-1 rounded-md text-xs ${
                            transaction.status === "Completed"
                              ? "bg-light-green-2 border-light-green-1 text-green"
                              : transaction.status === "Waiting"
                              ? "bg-light-gray-2 border-light-gray-1 text-dark-blue"
                              : "bg-[#FAFAFA] border-[#E6E6E6] text-dark"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {formatDate(transaction.createdAt)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Always show the TopUpForm */}
        <div className="w-80 p-4 border-l border-light-gray-1 flex flex-col">
          <LookupPanel onLookup={handleLookup} />
          {loading && <LoadingElement width="24" color="#4040BF" />}
          {lookupData && (
            <div className="mt-4">
              <p>Country: {lookupData.country}</p>
              <p>Number: {lookupData.phoneNumber}</p>
              <p>Result: {lookupData.result}</p>
              <p>Last Check: {lookupData.lastCheck}</p>
            </div>
          )}
        </div>

        {/* {isFilterPanelVisible && (
          <div className="h-screen w-96 px-4 py-4 border-l-2 border-light-gray-1 flex justify-center">
            <FilterPanel onClose={handleClickFilter} />
          </div>
        )} */}
      </div>
    </div>
  );
}
