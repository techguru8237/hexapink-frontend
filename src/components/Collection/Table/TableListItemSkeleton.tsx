import { FaSquarePlus } from "react-icons/fa6";
import { LuPlus } from "react-icons/lu";

export default function TableListItemSkeleton({
  onClickAttachTable,
}: {
  onClickAttachTable: () => void;
}) {
  return (
    <div
      className={`relative border border-dashed border-light-gray-3 rounded-lg p-2 flex items-center justify-between gap-2 cursor-pointer font-redacted-script text-light-gray-3`}
    >
      <div className="flex flex-1 items-center">
        <span className="flex-1 text-left">Table-12312</span>
        <span className="bg-light-gray-2 text-xs">Table-12345</span>
      </div>
      <FaSquarePlus className="text-light-gray-3 text-xl" />

      <button
        onClick={onClickAttachTable}
        className="absolute left-1/2 transform -translate-x-1/2 rounded-full h-8 px-4 py-2 flex items-center gap-2 bg-dark-blue text-white"
      >
        <LuPlus className="text-2xl" />{" "}
        <span className="font-raleway text-sm">New Column</span>
      </button>
    </div>
  );
}
