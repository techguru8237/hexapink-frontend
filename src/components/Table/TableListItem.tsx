import { useState } from "react";
// import { toast } from "react-toastify";
import { Badge, IconButton, Tooltip } from "@mui/material";
import { LuPlus } from "react-icons/lu";
import { BsTrash3 } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { PiTableLight } from "react-icons/pi";
import { CiCircleInfo } from "react-icons/ci";
import { MdOutlineModeEdit } from "react-icons/md";

import { TableItem } from "../../types";
import { formatDate } from "../../utils/formatDate";
import { deleteTableById } from "../../actions/table"; // Import the update function

import TagModal from "../Common/TagModal";
import Checkbox from "../Common/Checkbox";
import PreviewModal from "../Common/PreviewModal"; // Import the modal
import LoadingElement from "../Common/LoadingElement";
import ConfirmDialog from "../Common/ConfirmDialog";

interface TableListItemProps {
  data: TableItem;
  index: string;
  isSelected: boolean;
  tables: TableItem[];
  fetchTables: () => void;
  setTables: (updatedTables: TableItem[]) => void;
  onCheckboxChange: (index: string) => void;
}

export const TableListItem: React.FC<TableListItemProps> = ({
  data,
  index,
  isSelected,
  tables,
  setTables,
  fetchTables,
  onCheckboxChange,
}) => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isEditing, setIsEditing] = useState(false);
  // const [newTableName, setNewTableName] = useState(data.tableName);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const [actionType, setActionType] = useState("");

  // State for delete confirmation dialog
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDelete = () => {
    setOpenDeleteDialog(true); // Open the delete confirmation dialog
  };

  const confirmDelete = () => {
    setLoading(true);
    deleteTableById(data._id, () => {
      fetchTables();
      setLoading(false);
    }).finally(() => {
      setLoading(false);
      setOpenDeleteDialog(false); // Close the dialog after deletion
    });
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false); // Close the dialog without deleting
  };

  // const handleEdit = async () => {
  //   setLoading(true);
  //   try {
  //     await updateTableName(data._id, { tableName: newTableName }, () => {
  //       toast.success("Table name updated successfully.");
  //       fetchTables();
  //     });
  //   } catch (error) {
  //     toast.error("Failed to update table name.");
  //   } finally {
  //     setLoading(false);
  //     setIsEditing(false);
  //   }
  // };

  const handleCreateTag = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActionType("create");
    setIsTagModalOpen(true);
  };

  const handleEditTag = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    setSelectedTag(tag);
    setActionType("edit");
    setIsTagModalOpen(true);
  };

  const handleDeleteTag = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    setSelectedTag(tag);
    setActionType("delete");
    setIsTagModalOpen(true);
  };

  return (
    <div className="w-full flex items-center gap-2 text-light-dark font-raleway">
      <Checkbox checked={isSelected} onChange={() => onCheckboxChange(index)} />
      <div
        className={`w-full bg-[#F7F7FC] flex justify-around border ${
          isSelected ? "border-dark-blue" : "border-light-gray-3"
        } rounded-lg cursor-pointer`}
        onClick={() => onCheckboxChange(index)}
      >
        <div className="w-full bg-white flex justify-around rounded-lg">
          <div className="w-[15%] min-w-min p-3 pr-0 flex items-center justify-between">
            <div className="flex items-center">
              <PiTableLight className="text-xl mr-2" />
              {/* {isEditing ? (
                <input
                  type="text"
                  value={newTableName}
                  onChange={(e) => setNewTableName(e.target.value)}
                  onBlur={handleEdit} // Update on blur
                  className="bg-white border rounded p-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleEdit(); // Update on Enter key
                    }
                  }}
                />
              ) : (
                <span
                  className="overflow-x-clip cursor-pointer"
                  onClick={() => setIsEditing(true)}
                >
                  table_{data._id.slice(-5)}
                </span>
              )} */}
              <span>table_{data._id.slice(-5)}</span>
            </div>
            <Tooltip title="Table Preview">
              <IconButton>
                <CiCircleInfo
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                  }}
                  className="text-lg border rounded-md p-0.5 box-content cursor-pointer"
                />
              </IconButton>
            </Tooltip>
          </div>
          <div className="w-[15%] p-3 flex items-center divide-x border-l border-dashed border-light-gray-3">
            <span>{data.tableName}</span>
          </div>
          <div className="w-[10%] p-3 flex items-center divide-x border-l border-dashed border-light-gray-3">
            <span>{data.columns.length}</span>
          </div>
          <div className="w-[10%] p-3 flex items-center gap-2 border-l border-dashed border-light-gray-3">
            <span>{data.leads}</span>
          </div>
          <div className="w-[30%] p-3 flex items-center gap-2 border-l border-dashed border-light-gray-3">
            <div className="flex flex-wrap gap-2">
              {data.tags?.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center bg-light-gray-1 rounded-full px-2 gap-2"
                >
                  <span className="uppercase text-xs font-medium">{tag}</span>
                  <div className="flex items-center gap-1">
                    <Tooltip title="Edit Tag">
                      <Badge>
                        <MdOutlineModeEdit
                          onClick={(e) => handleEditTag(e, tag)}
                          className="cursor-pointer"
                        />
                      </Badge>
                    </Tooltip>
                    <Tooltip title="Delete Tag">
                      <Badge>
                        <IoClose
                          onClick={(e) => handleDeleteTag(e, tag)}
                          className="cursor-pointer"
                        />
                      </Badge>
                    </Tooltip>
                  </div>
                </div>
              ))}
              <div
                onClick={handleCreateTag}
                className="flex items-center border-2 border-light-gray-3 rounded-full px-2 gap-1 cursor-pointer"
              >
                <LuPlus />
                <span className="text-nowrap text-sm">Add New</span>
              </div>
            </div>
          </div>
          <div className="w-[15%] p-3 flex items-center border-l border-dashed border-light-gray-3">
            {formatDate(data.createdAt)}
          </div>
        </div>
      </div>
      {isSelected &&
        (loading ? (
          <LoadingElement width="32" color="blue" />
        ) : (
          <BsTrash3
            onClick={handleDelete}
            className="text-red-500 text-xl cursor-pointer"
          />
        ))}
      {/* Preview Modal */}
      {isModalOpen && (
        <PreviewModal
          onRequestClose={() => setIsModalOpen(false)}
          filePath={data.file}
          delimiter={data.delimiter}
        />
      )}

      {/* Handle Tag Modal */}
      <TagModal
        tableId={data._id}
        oldTag={selectedTag}
        setTables={setTables}
        tables={tables}
        open={isTagModalOpen}
        handleClose={() => setIsTagModalOpen(false)}
        actionType={actionType} // Pass the action type here
      />

      <ConfirmDialog
        title="Confirm Deletion"
        description="Are you sure you want to delete this table?"
        handleConfirmChange={confirmDelete}
        handleCloseDialog={cancelDelete}
        openDialog={openDeleteDialog}
      />
    </div>
  );
};
