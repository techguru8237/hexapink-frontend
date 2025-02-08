import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { PiTableLight } from "react-icons/pi";
import { CiCircleInfo } from "react-icons/ci";
import { BsTrash3 } from "react-icons/bs";

import Checkbox from "../Checkbox";
import { TableItem } from "../../types";
import { toast } from "react-toastify";
import { useState } from "react";
import LoadingElement from "../Common/LoadingElement";
import { deleteTableById } from "../../actions/table";

interface TableListItemProps {
  data: TableItem;
  index: string;
  isSelected: boolean;
  onCheckboxChange: (index: string) => void;
  fetchTables: () => void; // Add this line
}

export const TableListItem: React.FC<TableListItemProps> = ({
  data,
  index,
  isSelected,
  fetchTables,
  onCheckboxChange,
}) => {
  const [loading, setLoading] = useState(false);

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
              fetchTables(); // Call fetchTables here
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

  return (
    <div className="w-full flex items-center gap-2 text-light-dark font-raleway">
      <Checkbox checked={isSelected} onChange={() => onCheckboxChange(index)} />
      {/* Table Item */}
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
              <span className="overflow-x-clip">{data.tableName}</span>
            </div>
            <CiCircleInfo className="text-xl mr-2 border rounded-md p-1 box-content" />
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
    </div>
  );
};
