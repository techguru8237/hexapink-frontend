import { PiCheckBold, PiDatabaseLight } from "react-icons/pi";

export default function FileListHeader() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 border rounded-md flex items-center justify-center">
        <PiCheckBold className="text-light-gray3" />
      </div>
      <div className="w-full bg-[#F7F7FC] border-2 border-light-gray3 rounded-lg flex justify-around items-center divide-x">
        <div className="w-full p-2 flex items-center gap-2">
          <PiDatabaseLight className="text-2xl" />
          <span>#</span>
        </div>
        <span className="w-full p-2 flex">Collection</span>
        <span className="w-full p-2 flex">Volume</span>
        <span className="w-full p-2 flex">Created At</span>
        <span className="w-full p-2 flex">Status</span>
        <span className="w-full p-2 flex">Download</span>
        <span className="w-full p-2 flex">order Id</span>
      </div>
    </div>
  );
}
