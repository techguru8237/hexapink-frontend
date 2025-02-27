import { PiCheckBold } from "react-icons/pi";

export default function CartListHeader() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 border rounded-md flex items-center justify-center">
        <PiCheckBold className="text-light-gray-3" />
      </div>
      <div className="w-full bg-[#F7F7FC] border-2 border-light-gray-3 rounded-lg flex justify-around items-center divide-x">
        <span className="w-[40%] p-2 flex">Collection</span>
        <span className="w-[20%] p-2 flex">Volume</span>
        <span className="w-[20%] p-2 flex">Unit Price</span>
        <span className="w-[20%] p-2 flex">Total Price</span>
      </div>
    </div>
  );
}
