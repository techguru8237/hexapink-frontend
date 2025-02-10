import { PiCheckBold, PiPlusCircle, PiTableLight } from "react-icons/pi";
import { CiCircleInfo } from "react-icons/ci";

export default function NewTableSkeleton({
  onAddTableClick,
  isNewTablePanelVisible,
}: {
  isNewTablePanelVisible: boolean;
  onAddTableClick: () => void;
}) {
  return (
    <div className="w-full border-b border-light-gray1 relative px-4 sm:px-8 py-4 flex items-center gap-2 text-light-gray3">
      <div className="w-6 h-6 border border-dashed rounded-md flex items-center justify-center">
        <PiCheckBold />
      </div>
      {/* Collection Item */}
      <div className="w-full bg-[#F7F7FC] flex justify-around border border-dashed border-light-gray3 rounded-lg font-redacted-script">
        <div className="w-[50%] p-3 flex items-center justify-between">
          <div className="flex flex-row">
            <PiTableLight className="text-2xl mr-2" />
            <span>table_124</span>
          </div>
          <CiCircleInfo className="text-2xl mr-2 border rounded-md p-1 box-content" />
        </div>
        <div className="w-[15%] p-3 flex items-center divide-x border-l border-dashed border-light-gray3">
          <span>12</span>
        </div>
        <div className="w-[15%] p-3 flex items-center gap-2 border-l border-dashed border-light-gray3">
          <span>1500</span>
        </div>
        <div className="w-[20%] p-3 flex items-center border-l border-dashed border-light-gray3">
          11 Nov 2024
        </div>
      </div>

      {!isNewTablePanelVisible && <button
        onClick={onAddTableClick}
        className="absolute left-1/2 transform -translate-x-1/2 rounded-full px-4 py-2 flex items-center gap-2 bg-dark-blue text-white"
      >
        <PiPlusCircle className="text-2xl" /> <span>Add Table</span>
      </button>}
    </div>
  );
}
