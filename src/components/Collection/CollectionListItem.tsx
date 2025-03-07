import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PiDatabaseLight } from "react-icons/pi";
import { FaRegFolderOpen } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import { PiMapPinLight } from "react-icons/pi";
import { BsTrash3 } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";
import { IconButton, Tooltip } from "@mui/material";

import api from "../../actions/api";
import { getTotalLeads } from "../../actions/collection";
import { Collection } from "../../types";
import Checkbox from "../Common/Checkbox";
import LoadingElement from "../Common/LoadingElement";
import ConfirmDialog from "../Common/ConfirmDialog";
import CollectionPreviewModal from "./CollectionPreviewModal";

interface CollectionListItemProps {
  data: Collection;
  id: string;
  isSelected: boolean;
  fetchCollections: () => void;
  collections: Collection[];
  setCollections: (updatedTables: Collection[]) => void;
  onCheckboxChange: (id: string) => void;
}

export const CollectionListItem: React.FC<CollectionListItemProps> = ({
  id,
  data,
  isSelected,
  collections,
  setCollections,
  fetchCollections,
  onCheckboxChange,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [stateUpdateLoading, setStateUpdateLoading] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [totalLeads, setTotalLeads] = useState<number>(0);

  useEffect(() => {
    const fetchTotalLeads = async () => {
      const response = await getTotalLeads(data);
      setTotalLeads(response);
    };
    fetchTotalLeads();
  }, [data]);

  const handleDelete = () => {
    setOpenDeleteDialog(true); // Open the delete confirmation dialog
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      await api.delete(`/api/collection/delete/${data._id}`);
      toast.success("Collection deleted successfully.");
      fetchCollections();
      setLoading(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
      setOpenDeleteDialog(false);
    }
  };

  const onClickStatus = async (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    setStateUpdateLoading(true);
    try {
      const newStatus = data.status === "Active" ? "Inactive" : "Active";

      await api.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/collection/update-status/${id}`,
        { status: newStatus }
      );

      const updatedCollections = collections.map((collection) =>
        collection._id === data._id
          ? { ...collection, status: newStatus }
          : collection
      );
      setCollections(updatedCollections);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setStateUpdateLoading(false);
    }
  };

  const handleShowPreview = (event: React.MouseEvent) => {
    event.stopPropagation();
    navigate(`/admin/collections/view/${data._id}`);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  return (
    <div
      onClick={() => onCheckboxChange(id)}
      className="w-full flex items-center gap-2 text-light-dark cursor-pointer"
    >
      <Checkbox checked={isSelected} />
      {/* Collection Item */}
      <div
        className={`w-full bg-[#F7F7FC] flex justify-around border ${
          isSelected ? "border-dark-blue" : "border-light-gray-3"
        } rounded-lg`}
      >
        <div className="w-[25%] p-3 flex items-center">
          <FaRegFolderOpen className="text-2xl mr-2" />
          <span>col_{id.slice(-5)}</span>
          <Tooltip title="Collection Preview">
            <IconButton>
              <CiCircleInfo
                onClick={handleShowPreview}
                className="text-xl border rounded-md p-1 box-content"
              />
            </IconButton>
          </Tooltip>
        </div>
        <div className="w-[30%] p-3 flex items-center gap-2 border-l border-dashed border-light-gray-3">
          <div className="w-12 h-12 bg-[#F0F0FA] border border-light-gray-3 rounded-l-lg flex items-center justify-center rounded-lg">
            {/* <PiImageSquareLight className="text-2xl" /> */}
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${data.image?.replace(
                "uploads",
                ""
              )}`}
              alt="file image"
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-left">{data.title}</span>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center">
                <PiDatabaseLight className="text-md" />
                <span>{data.type}</span>
              </div>
              <div className="flex items-center">
                <PiMapPinLight className="text-md" />
                <span className="text-left">
                  {data.countries?.length && data.countries[0]}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[10%] p-3 flex items-center divide-x border-l border-dashed border-light-gray-3">
          <span>{data.columns.length}</span>
        </div>
        <div className="w-[10%] p-3 flex items-center gap-2 border-l border-dashed border-light-gray-3">
          <span>{totalLeads}</span>
        </div>
        <div className="w-[10%] p-3 flex items-center gap-2 border-l border-dashed border-light-gray-3">
          <span>1500-5</span>
        </div>
        <div className="w-[10%] p-3 flex items-center gap-2 border-l border-dashed border-light-gray-3">
          <div
            onClick={(e) => onClickStatus(e, data._id)}
            className={`rounded-lg px-2 py-1 text-sm flex items-center justify-center border ${
              data.status === "Active"
                ? "bg-light-green-2 border-light-green-1 text-green hover:bg-green hover:border-none hover:text-white"
                : "bg-[#FAFAFA] border-[#E6E6E6] text-dark hover:bg-light-dark hover:border-none hover:text-white"
            }`}
          >
            {stateUpdateLoading ? (
              <LoadingElement width="16" color="#4040BF" />
            ) : (
              data.status
            )}
          </div>
        </div>
        <div className="w-[15%] p-3 flex items-center border-l border-dashed border-light-gray-3">
          {data.createdAt?.split("T")[0]}
        </div>
      </div>

      {isSelected &&
        (loading ? (
          <LoadingElement width="32" color="blue" />
        ) : (
          <div className="flex flex-col gap-2">
            <BiPencil
              onClick={() => navigate(`/admin/collections/edit/${data._id}`)}
              className="cursor-pointer hover:text-dark-blue"
            />
            <BsTrash3
              onClick={handleDelete}
              className="cursor-pointer hover:text-red"
            />
          </div>
        ))}

      <ConfirmDialog
        title="Confirm Deletion"
        description="Are you sure you want to delete this collection?"
        handleConfirmChange={confirmDelete}
        handleCloseDialog={() => setOpenDeleteDialog(false)}
        openDialog={openDeleteDialog}
      />

      {/* Preview Modal */}
      <CollectionPreviewModal
        open={openPreview}
        onClose={handleClosePreview}
        collection={data}
      />
    </div>
  );
};
