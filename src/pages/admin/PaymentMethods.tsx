import { PiBankLight } from "react-icons/pi";

import { useState, useEffect } from "react";
import { CiFilter } from "react-icons/ci";
import AdminHeader from "../../components/Dashboard/AdminHeader";
import Pagination from "../../components/Pagination";
import NewPaymentSkeleton from "../../components/PaymentMethod/NewPaymentSkeleton";
import PaymentListHeader from "../../components/PaymentMethod/PaymentListHeader";
import { PaymentListItem } from "../../components/PaymentMethod/PaymentListItem";
import CreatePayment from "../../components/PaymentMethod/CreatePayment";
import { PaymentItem } from "../../types";
import api from "../../actions/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingElement from "../../components/Common/LoadingElement";
import { toast } from "react-toastify";
import { updateStatus } from "../../actions/payment";

export default function PaymentMethods() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [selectePayments, selectedPayments] = useState<string[]>([]);
  const [isNewPaymentPanelVisible, setIsNewPaymentPanelVisible] =
    useState(false);
  const [isFilterPanelVisible, setIsFilterPanelVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const currentPage = parseInt(searchParams.get("page") || "1");

  const fetchPaymentMethods = async () => {
    const queryParams = new URLSearchParams(searchParams);
    try {
      setLoading(true);
      const response = await api.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/payment?${queryParams.toString()}&limit=${rowsPerPage}`
      );
      setPayments(response.data.payments);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching payments:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, [searchParams]);

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page.toString());
    navigate(`/admin/tables?${newSearchParams.toString()}`);
  };

  const handleAddPaymentClick = () => {
    setIsNewPaymentPanelVisible(!isNewPaymentPanelVisible);
  };

  const handleCheckboxChange = (index: string) => {
    selectedPayments((prevSelectedPayments) =>
      prevSelectedPayments.includes(index)
        ? prevSelectedPayments.filter((payment) => payment !== index)
        : [...prevSelectedPayments, index]
    );
  };

  const handleClickFilter = () => {
    setIsFilterPanelVisible(!isFilterPanelVisible);
  };

  const handleChangePaymentStatus = (id: string) => {
    const payment = payments.find((payment) => payment._id === id);
    if (payment) {
      const newStatus = payment.status === "Active" ? "Inactive" : "Active";
      const onSuccess = () => {
        const updatedUsers = payments.map((payment) =>
          payment._id === id ? { ...payment, status: newStatus } : payment
        );
        setPayments(updatedUsers);
        toast.success("Changed user status successfully.");
      };

      updateStatus(id, newStatus, onSuccess);
    }
  };

  return (
    <div>
      <AdminHeader icon={<PiBankLight />} label="PaymentMethods" />

      <div className="bg-light-gray border-b border-light-gray-1 flex">
        <div className="flex flex-col flex-1 border-r border-light-gray-1">
          <div className="px-8 py-4 border-b border-light-gray-1 flex items-center justify-between text-light-dark">
            {selectedPayments.length > 0 && (
              <span>{selectedPayments.length} Selected</span>
            )}
            <div className="ml-auto flex items-center divide-x">
              <div className="pr-4 flex items-center gap-2">
                {payments && payments.length > 0 && (
                  <span>{payments.length} Results</span>
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
                  currentPage={currentPage}
                  totalPages={totalPages}
                  rowsPerPage={rowsPerPage}
                  pageSizeOptions={[5, 10, 20]}
                  onPageChange={handlePageChange}
                  onPageSizeChange={(value) => setRowsPerPage(value)}
                />
              </div>
            </div>
          </div>

          <NewPaymentSkeleton onAddPaymentClick={handleAddPaymentClick} />

          <div className="p-8 flex flex-col items-center gap-4">
            <PaymentListHeader />

            {loading ? (
              <LoadingElement width="32" color="#4040BF" />
            ) : (
              payments &&
              payments.map((item) => (
                <PaymentListItem
                  key={item._id}
                  data={item}
                  index={item._id}
                  isSelected={selectePayments.includes(item._id)}
                  setPayments={setPayments}
                  payments={payments}
                  handleStatusChange={handleChangePaymentStatus}
                  fetchPaymentMethods={fetchPaymentMethods}
                  onCheckboxChange={handleCheckboxChange}
                />
              ))
            )}
          </div>
        </div>

        {isNewPaymentPanelVisible && (
          <div className="w-96 px-4 py-4 border-l-2 border-light-gray-1 flex justify-center">
            <CreatePayment onClose={() => setIsNewPaymentPanelVisible(false)} />
          </div>
        )}

        {/* {isFilterPanelVisible && (
          <div className="p-6">
            <FilterPanel
              onClose={handleClickFilter}
              items={dummyData}
              setFilteredItems={setFilteredFiles}
            />
          </div>
        )} */}
      </div>
    </div>
  );
}
