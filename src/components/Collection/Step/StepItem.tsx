import { useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import { RiDraggable } from "react-icons/ri";

import { Step } from "../../../types";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

interface StepItemProps {
  step: Step;
  selectedStepId: number | null;
  onClickItem: (id: number) => void;
  onDelete: (id: number) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
}

export default function StepItem({
  step,
  selectedStepId,
  onClickItem,
  onDelete,
  onDragStart,
  onDragEnd,
}: StepItemProps) {
  const isSelected = selectedStepId === step.id;

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
            onClick={() => onClickItem(step.id)}
            className={`relative flex flex-1 items-center justify-start gap-2 border p-2 rounded-lg ${
              isSelected
                ? "text-dark-blue bg-white border-dark-blue"
                : "bg-[#F7F7FC] border-light-gray-3"
            }`}
          >
            {isSelected ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
            <span>{step.name}</span>
          </div>
          {showDeleteIcon && (
            <BsTrash3
              className="text-red cursor-pointer"
              onClick={() => onDelete(step.id)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
