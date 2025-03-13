import React, { useState } from "react";
import { PiTableLight } from "react-icons/pi";
import { CiCircleInfo } from "react-icons/ci";
import { BiPencil } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";
import { toast } from "react-toastify";

import api from "../../actions/api";
import { formatDate } from "../../utils/formatDate";
import { BankItem } from "../../types";

import Checkbox from "../Common/Checkbox";
import ConfirmDialog from "../Common/ConfirmDialog";
import LoadingElement from "../Common/LoadingElement";

interface PaymentListItemProps {
  index: string;
  data: BankItem;
  isSelected: boolean;
  payments: BankItem[];
  setPayments: (updatedTables: BankItem[]) => void;
  fetchPaymentMethods: () => Promise<void>;
  onCheckboxChange: (index: string) => void;
  handleStatusChange: (id: string) => void;
  handleEditClick: (id: string) => void;
}

export const PaymentListItem: React.FC<PaymentListItemProps> = ({
  index,
  data,
  isSelected,
  onCheckboxChange,
  handleStatusChange,
  fetchPaymentMethods,
  handleEditClick,
}) => {
  const [openStatusChangeConfirmDialog, setOpenStatusChangeConfirmDialog] =
    useState(false);
  const [openDeleteConfirmDialog, setOpenDeleteConfirmDialog] = useState(false);

  const [loading, setLoading] = useState<boolean>(false);

  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(
    null
  );

  const onClickStatus = (event: React.MouseEvent, id: string) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedPaymentId(id);
    setOpenStatusChangeConfirmDialog(true);
  };

  const handleConfirmChange = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (selectedPaymentId) {
      handleStatusChange(selectedPaymentId);
    }
    setOpenStatusChangeConfirmDialog(false);
  };

  const handleDelete = () => {
    setOpenDeleteConfirmDialog(true); // Open the delete confirmation dialog
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      await api.delete(`/api/bank/delete/${data._id}`);
      toast.success("Collection deleted successfully.");
      fetchPaymentMethods();
      setLoading(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
      setOpenDeleteConfirmDialog(false);
    }
  };

  return (
    <div
      onClick={() => onCheckboxChange(index)}
      className="w-full flex items-center gap-2 text-light-dark cursor-pointer"
    >
      <Checkbox checked={isSelected} />
      {/* Payment Item */}
      <div
        className={`w-full bg-[#F7F7FC] flex justify-around border ${
          isSelected ? "border-dark-blue" : "border-light-gray-3"
        } rounded-lg`}
      >
        <div className="w-full p-3 flex items-center">
          <PiTableLight className="text-2xl mr-2" />
          <span> bank_{data._id.slice(-5)}</span>
          <CiCircleInfo className="text-xl ml-auto border rounded-md p-1 box-content" />
        </div>
        <div className="w-full p-3 flex items-center justify-start gap-2 border-l border-dashed border-light-gray-3">
          <div className="w-12 h-12 bg-[#F0F0FA] border border-light-gray-3 rounded-l-lg flex items-center justify-center rounded-lg">
            <img
              src={`${
                import.meta.env.VITE_BACKEND_URL
              }/${data.bankLogo?.replace("uploads", "")}`}
              alt="Bank Logo"
              className="rounded-lg"
            />
          </div>
          <span>{data.bankName}</span>
        </div>
        <div className="w-full p-3 flex items-center divide-x border-l border-dashed border-light-gray-3">
          <span>{data.accountOwner}</span>
        </div>
        <div className="w-full p-3 flex items-center gap-2 border-l border-dashed border-light-gray-3">
          <button
            onClick={(e) => onClickStatus(e, data._id)}
            className={`rounded-lg px-2 py-1 text-sm ${
              data.status === "Active"
                ? "bg-light-green-2 border-light-green-1 text-green hover:bg-green hover:border-none hover:text-white"
                : "bg-[#FAFAFA] border-[#E6E6E6] text-dark hover:bg-light-dark hover:border-none hover:text-white"
            }`}
          >
            {data.status}
          </button>
        </div>
        <div className="w-full p-3 flex items-center border-l border-dashed border-light-gray-3">
          {formatDate(data.createdAt)}
        </div>
      </div>

      {isSelected &&
        (loading ? (
          <LoadingElement width="32" color="blue" />
        ) : (
          <div className="flex flex-col gap-2">
            <BiPencil
              onClick={() => handleEditClick(data._id)}
              className="cursor-pointer hover:text-dark-blue"
            />
            <BsTrash3
              onClick={handleDelete}
              className="cursor-pointer hover:text-red"
            />
          </div>
        ))}

      <ConfirmDialog
        title="Confirm Status Change"
        description={`Are you sure you want to change the status of ${data.accountOwner}'s payment method?`}
        handleConfirmChange={handleConfirmChange}
        handleCloseDialog={() => setOpenStatusChangeConfirmDialog(false)}
        openDialog={openStatusChangeConfirmDialog}
      />

      <ConfirmDialog
        title="Delete Payment"
        description={`Are you sure you want delete this payment method?`}
        handleConfirmChange={handleConfirmDelete}
        handleCloseDialog={() => setOpenDeleteConfirmDialog(false)}
        openDialog={openDeleteConfirmDialog}
      />

      {/* Preview Modal */}
      {/* <UserPreviewModal
        open={openPreview}
        onClose={handleClosePreview}
        user={data}
      /> */}
    </div>
  );
};
