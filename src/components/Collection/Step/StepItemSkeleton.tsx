import { RiDraggable } from "react-icons/ri";
import { LuPlus } from "react-icons/lu";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function StepItemSkeleton({ onClickNewStep, disabled }: { onClickNewStep: () => void, disabled: boolean }) {
  return (
    <div className="w-full flex items-center gap-2 text-light-gray-3 font-redacted-script">
      <RiDraggable className="text-xl" />
      <div className="relative flex flex-1 items-center justify-between bg-[#F7F7FC] border border-dashed border-light-gray-3 p-2 rounded-lg">
        <MdKeyboardArrowDown />

        <span>Step 1</span>

        <button
          onClick={onClickNewStep}
          disabled={disabled}
          className="absolute left-1/2 transform -translate-x-1/2 rounded-full h-8 px-4 py-2 flex items-center gap-2 bg-dark-blue text-white"
        >
          <LuPlus className="text-2xl" />{" "}
          <span className="font-raleway text-sm">New Step</span>
        </button>
      </div>
    </div>
  );
}
