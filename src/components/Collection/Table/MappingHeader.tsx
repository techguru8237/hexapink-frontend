import { FaRegFolderOpen } from "react-icons/fa";
import { PiTableLight } from "react-icons/pi";

export default function MappingHeader() {
  return (
    <div className="flex items-center">
      <div className="relative flex flex-1 items-center justify-start gap-2 border border-light-gray-3 text-sm text-light-gray-3 rounded-lg p-2 z-0">
        <FaRegFolderOpen />
        <span className="text-nowrap">Collection Columns</span>
        <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 z-10 w-2 h-2 rounded-full bg-light-gray-2 border border-light-gray-3"></div>
      </div>
      <div className="w-4 border-b border-light-gray-3"></div>
      <div className="relative flex flex-1 items-center justify-start gap-2 border border-light-gray-3 text-sm text-light-gray-3 rounded-lg p-2">
        <PiTableLight />
        <span>Table Columns</span>
        <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 z-10 w-2 h-2 rounded-full bg-light-gray-2 border border-light-gray-3"></div>
      </div>
    </div>
  );
}
