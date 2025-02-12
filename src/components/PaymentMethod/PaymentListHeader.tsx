import { PiCheckBold } from "react-icons/pi";

export default function CollectionListHeader() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 border rounded-md flex items-center justify-center">
        <PiCheckBold className="text-light-gray-3" />
      </div>
      <div className="w-full bg-[#F7F7FC] border-2 border-light-gray-3 rounded-lg flex justify-around items-center divide-x">
        <span className="w-full p-2 flex">Bank Id</span>
        <span className="w-full p-2 flex">Bank</span>
        <span className="w-full p-2 flex">Account Owner</span>
        <span className="w-full p-2 flex">Status</span>
        <span className="w-full p-2 flex">Created At</span>
      </div>
    </div>
  );
}
