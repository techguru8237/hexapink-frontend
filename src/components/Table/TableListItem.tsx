import { useState } from "react";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { PiTableLight } from "react-icons/pi";
import { CiCircleInfo } from "react-icons/ci";
import { BsTrash3 } from "react-icons/bs";
import { TableListItemProps } from "../../types";
import { deleteTableById, updateTableName } from "../../actions/table"; // Import the update function
import Checkbox from "../Checkbox";
import LoadingElement from "../Common/LoadingElement";
import PreviewModal from "../Common/PreviewModal"; // Import the modal

export const TableListItem: React.FC<TableListItemProps> = ({
  data,
  index,
  isSelected,
  fetchTables,
  onCheckboxChange,
}) => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTableName, setNewTableName] = useState(data.tableName);

  const handleDelete = () => {
    confirmAlert({
      title: "Are you sure to delete this table?",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            setLoading(true);
            deleteTableById(data._id, () => {
              toast.success("Table deleted successfully.");
              fetchTables();
              setLoading(false);
            }).finally(() => {
              setLoading(false);
            });
          },
        },
        {
          label: "No",
          onClick: () => {
            console.log("Clicked close button");
          },
        },
      ],
    });
  };

  const handleEdit = async () => {
    setLoading(true);
    try {
      await updateTableName(data._id, { tableName: newTableName }, () => {
        toast.success("Table name updated successfully.");
        fetchTables();
      });
    } catch (error) {
      toast.error("Failed to update table name.");
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  };

  return (
    <div className="w-full flex items-center gap-2 text-light-dark font-raleway">
      <Checkbox checked={isSelected} onChange={() => onCheckboxChange(index)} />
      <div
        className={`w-full bg-[#F7F7FC] flex justify-around border ${
          isSelected ? "border-dark-blue" : "border-light-gray3"
        } rounded-lg`}
        onClick={() => onCheckboxChange(index)}
      >
        <div className="w-full bg-white flex justify-around rounded-lg">
          <div className="w-[50%] p-3 flex items-center justify-between">
            <div className="flex items-center">
              <PiTableLight className="text-2xl mr-2" />
              {isEditing ? (
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
                  {data.tableName}
                </span>
              )}
            </div>
            <CiCircleInfo
              onClick={() => setIsModalOpen(true)}
              className="text-xl mr-2 border rounded-md p-1 box-content cursor-pointer"
            />
          </div>
          <div className="w-[15%] p-3 flex items-center divide-x border-l border-dashed border-light-gray3">
            <span>{data.columns.length}</span>
          </div>
          <div className="w-[15%] p-3 flex items-center gap-2 border-l border-dashed border-light-gray3">
            <span>{data.leads}</span>
          </div>
          <div className="w-[20%] p-3 flex items-center border-l border-dashed border-light-gray3">
            {data.createdAt.split("T")[0]}
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
      <PreviewModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        data={data.data}
      />
    </div>
  );
};
