import { PiCheckBold } from "react-icons/pi";

export default function OrderListHeader() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 border rounded-md flex items-center justify-center">
        <PiCheckBold className="text-light-gray3" />
      </div>
      <div className="w-full bg-[#F7F7FC] border-2 border-light-gray3 rounded-lg flex justify-around items-center divide-x">
        <span className="w-full p-2 flex">Order Id</span>
        <span className="w-full p-2 flex">User</span>
        <span className="w-full p-2 flex">Files</span>
        <span className="w-full p-2 flex">Leads</span>
        <span className="w-full p-2 flex">Price</span>
        <span className="w-full p-2 flex">Payment Method</span>
        <span className="w-full p-2 flex">Payment Method</span>
        <span className="w-full p-2 flex">Date</span>
      </div>
    </div>
  );
}
