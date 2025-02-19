import React, { useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import { RiDraggable } from "react-icons/ri";

interface StepedColumnItemProps {
  index: number;
  column: any; // Replace 'any' with your actual Column type if you have one
  onDetachTable: (columnId: number) => void;
  draggedColumnId: number | null;
  setDraggedColumnId: (columnId: number | null) => void;
  handleDrop: (index: number) => void;
  disabled: boolean;
}

const StepedColumnItem: React.FC<StepedColumnItemProps> = ({
  column,
  onDetachTable,
  setDraggedColumnId,
  index,
  handleDrop,
  disabled
}) => {
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);

  return (
    <div className="flex items-center">
      <div
        className="w-full flex items-center gap-2 cursor-pointer rounded-lg"
        draggable={!disabled}
        onDragStart={() => setDraggedColumnId(column.id)}
        onDragEnd={() => setDraggedColumnId(null)}
        onDrop={() => handleDrop(index)}
        onDragOver={(e) => {
          e.preventDefault();
        }}
      >
        <RiDraggable className="text-light-gray-3 hover:text-dark-blue cursor-pointer text-xl" />
        <div
          onMouseOver={() => setShowDeleteIcon(true)}
          onMouseLeave={() => setShowDeleteIcon(false)}
          className="w-full flex items-center gap-2"
        >
          <div className="relative flex flex-1 items-center justify-between border p-2 rounded-lg bg-[#F7F7FC] border-light-gray-3">
            <span>{column.name}</span>
            <span className="bg-light-gray-1 rounded-md p-1 box-content text-xs">
              {column.type}
            </span>
          </div>
          {showDeleteIcon && !disabled && (
            <BsTrash3
              className="text-red cursor-pointer"
              onClick={() => onDetachTable(column.id)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StepedColumnItem;
