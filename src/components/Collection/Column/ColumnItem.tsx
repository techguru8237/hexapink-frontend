import { useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import { RiDraggable } from "react-icons/ri";

import { Column } from "../../../types";

interface ColumnItemProps {
  columnData: Column;
  selectedColumnId: number | null;
  onClickItem: (id: number) => void;
  onDelete: (id: number) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
}

export default function ColumnItem({
  columnData,
  selectedColumnId,
  onClickItem,
  onDelete,
  onDragStart,
  onDragEnd,
}: ColumnItemProps) {
  const isSelected = selectedColumnId === columnData.id;

  const [showDeleteIcon, setShowDeleteIcon] = useState(false);

  return (
    <div className="flex items-center">
      <div
        className="w-full flex items-center gap-2 cursor-pointer rounded-lg"
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <RiDraggable className="text-light-gray-3 hover:text-dark-blue cursor-pointer text-xl" />
        <div
          onMouseOver={() => setShowDeleteIcon(true)}
          onMouseLeave={() => setShowDeleteIcon(false)}
          className="w-full flex items-center gap-2"
        >
          <div
            onClick={() => onClickItem(columnData.id)}
            className={`relative flex flex-1 items-center justify-between border p-2 rounded-lg ${
              isSelected
                ? "text-dark-blue bg-white border-dark-blue"
                : "bg-[#F7F7FC] border-light-gray-3"
            }`}
          >
            <span>{columnData.name}</span>
            <span className="bg-light-gray-1 rounded-md p-1 box-content text-xs">
              {columnData.type}
            </span>
          </div>
          {showDeleteIcon && (
            <BsTrash3
              className="text-red cursor-pointer"
              onClick={() => onDelete(columnData.id)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
