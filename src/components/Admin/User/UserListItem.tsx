import React, { useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
import { PiUserCircleLight, PiPencilSimpleLight } from "react-icons/pi";
import { UserItem } from "../../../types";
import Checkbox from "../../Common/Checkbox";
import ConfirmDialog from "../../Common/ConfirmDialog";
import UserPreviewModal from "./UserPreviewModal"; // Import the modal
import { IconButton, Tooltip } from "@mui/material";
import { formatDate } from "../../../utils/formatDate";

interface UserListItemProps {
  index: number;
  data: UserItem;
  isSelected: boolean;
  onCheckboxChange: (id: string) => void;
  handleStatusChange: (id: string) => void;
  handleEditUserClick: (id: string) => void;
}

export const UserListItem: React.FC<UserListItemProps> = ({
  data,
  index,
  isSelected,
  onCheckboxChange,
  handleStatusChange,
  handleEditUserClick,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [openPreview, setOpenPreview] = useState(false);

  const onClickStatus = (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    setSelectedUserId(id);
    setOpenDialog(true);
  };

  const handleConfirmChange = () => {
    if (selectedUserId) {
      handleStatusChange(selectedUserId);
    }
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUserId(null);
  };

  const showPreviewDialog = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpenPreview(true);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  return (
    <>
      {data._id && (
        <div className="w-full flex items-center gap-2 text-light-dark">
          <Checkbox
            checked={isSelected}
            onChange={() => onCheckboxChange(data._id)}
          />
          <div
            className={`w-full bg-[#F7F7FC] flex justify-around border ${
              isSelected ? "border-dark-blue" : "border-light-gray-3"
            } rounded-lg`}
            onClick={() => onCheckboxChange(data._id)}
          >
            <div className="w-[15%] p-1 lg:p-2 xl:p-3 flex flex-wrap gap-2 items-center">
              <PiUserCircleLight className="text-2xl mr-2" />
              <span>{`User_${index}`}</span>
              <Tooltip title="User Preview">
                <IconButton>
                  <CiCircleInfo
                    onClick={showPreviewDialog}
                    className="text-xl border rounded-md p-1 box-content"
                  />
                </IconButton>
              </Tooltip>
            </div>
            <div className="w-[15%] p-1 lg:p-2 xl:p-3 flex items-center border-l border-dashed border-light-gray-3">
              <span>{data.firstName + " " + data.lastName}</span>
            </div>
            <div className="w-[30%] p-1 lg:p-2 xl:p-3 flex flex-wrap items-center justify-between gap-2 border-l border-dashed border-light-gray-3">
              <span className="text-wrap">{data.email}</span>
              <span
                className={`rounded-lg px-2 py-1 text-sm border ${
                  data.is_verified
                    ? "bg-light-green-2 border-light-green-1 text-green"
                    : "bg-light-red-2 border-light-red-1 text-red"
                }`}
              >
                {data.is_verified ? "Verified" : "Unverified"}
              </span>
            </div>
            <div className="w-[20%] p-1 lg:p-2 xl:p-3 flex items-center gap-2 border-l border-dashed border-light-gray-3">
              <span>{data.phone}</span>
            </div>
            <div className="w-[10%] p-1 lg:p-2 xl:p-3 flex items-center gap-2 border-l border-dashed border-light-gray-3">
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
            <div className="w-[15%] p-1 lg:p-2 xl:p-3 flex items-center border-l border-dashed border-light-gray-3">
              {formatDate(data.createdAt)}
            </div>
            <div className="w-[10%] p-1 lg:p-2 xl:p-3 flex items-center border-l border-dashed border-light-gray-3">
              <Tooltip title="Edit User">
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditUserClick(data._id);
                  }}
                >
                  <PiPencilSimpleLight className="text-xl ml-auto border rounded-md p-1 box-content cursor-pointer" />
                </IconButton>
              </Tooltip>
            </div>
          </div>

          <ConfirmDialog
            title="Confirm Status Change"
            description={`Are you sure you want to change the status of ${data.firstName} ${data.lastName}?`}
            handleConfirmChange={handleConfirmChange}
            handleCloseDialog={handleCloseDialog}
            openDialog={openDialog}
          />

          {/* Preview Modal */}
          <UserPreviewModal
            open={openPreview}
            onClose={handleClosePreview}
            user={data}
          />
        </div>
      )}
    </>
  );
};
