import { useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import { TableItem } from "../../../types";

interface AttachedTableItemProps {
  tableData: TableItem;
  selectedTable: TableItem | null;
  onClickItem: (id: TableItem) => void;
  onDelete: (id: string) => void;
}

export default function AttachedTableItem({
  tableData,
  selectedTable,
  onClickItem,
  onDelete,
}: AttachedTableItemProps) {
  const isSelected = selectedTable?._id === tableData._id;

  const [showDeleteIcon, setShowDeleteIcon] = useState(false);

  return (
    <div className="flex items-center">
      <div className="w-full flex items-center gap-2 cursor-pointer rounded-lg">
        <div
          onMouseOver={() => setShowDeleteIcon(true)}
          onMouseLeave={() => setShowDeleteIcon(false)}
          className="w-full flex items-center gap-2"
        >
          <div
            onClick={() => onClickItem(tableData)}
            className={`relative flex flex-1 items-center gap-1 justify-between bg-white border px-3 py-2 rounded-lg ${
              isSelected
                ? "text-dark-blue border-dark-blue"
                : "border-light-gray-3"
            }`}
          >
            {isSelected ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
            <span className="text-sm font-medium">{tableData.tableName}</span>
            <span className="bg-light-gray-1 ml-auto rounded-md p-1 box-content text-xs text-dark-blue">
              Table-{tableData._id.slice(-5)}
            </span>
          </div>
          {showDeleteIcon && (
            <BsTrash3
              className="text-red cursor-pointer"
              onClick={() => onDelete(tableData._id)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
