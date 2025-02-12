import { PiCheckBold } from "react-icons/pi";

export default function OrderListHeader() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 border rounded-md flex items-center justify-center">
        <PiCheckBold className="text-light-gray-3" />
      </div>
      <div className="w-full bg-[#F7F7FC] border-2 border-light-gray-3 rounded-lg flex justify-around items-center divide-x">
        <span className="w-[15%] p-2 flex">User Id</span>
        <span className="w-[15%] p-2 flex">Name</span>
        <span className="w-[30%] p-2 flex">Email</span>
        <span className="w-[20%] p-2 flex">Phone</span>
        {/* <span className="w-full p-2 flex">Balance</span> */}
        <span className="w-[10%] p-2 flex">Status</span>
        <span className="w-[15%] p-2 flex">Joined At</span>
        <span className="w-[10%] p-2 flex">Action</span>
      </div>
    </div>
  );
}
