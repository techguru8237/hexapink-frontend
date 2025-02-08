import { PiCheckBold } from "react-icons/pi";

export default function CollectionListHeader() {
  return (
    <div className="w-full flex items-center gap-2">
      <div className="w-6 h-6 border rounded-md flex items-center justify-center">
        <PiCheckBold className="text-light-gray3" />
      </div>
      <div className="w-full bg-[#F7F7FC] border-2 border-light-gray3 rounded-lg flex justify-around items-center divide-x">
        <span className="w-[50%] p-2 flex">Table Id</span>
        <span className="w-[15%] p-2 flex">Columns</span>
        <span className="w-[15%] p-2 flex">Leads</span>
        <span className="w-[20%] p-2 flex">Created At</span>
      </div>
    </div>
  );
}
