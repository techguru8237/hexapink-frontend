import {
  PiCheckBold,
  PiImageSquareLight,
  PiPlusCircle,
} from "react-icons/pi";
import { PiTableLight, PiPencilSimpleLight } from "react-icons/pi";

export default function NewPaymentSkeleton({
  onAddPaymentClick,
}: {
  onAddPaymentClick: () => void;
}) {
  return (
    <div className="w-full border-b border-light-gray-1 relative px-8 py-4 flex items-center gap-2 text-light-gray-3">
      <div className="w-6 h-6 border border-dashed rounded-md flex items-center justify-center">
        <PiCheckBold />
      </div>
      {/* Collection Item */}
      <div className="w-full bg-[#F7F7FC] flex justify-around border border-dashed border-light-gray-3 rounded-lg font-redacted-script">
        <div className="w-full p-3 flex items-center">
          <PiTableLight className="text-2xl mr-2" />
          <span>bank_123</span>
        </div>
        <div className="w-full p-3 flex items-center justify-between gap-2 border-l border-dashed border-light-gray-3">
          <div className="w-12 h-12 bg-[#F0F0FA] border border-light-gray-3 rounded-l-lg flex items-center justify-center rounded-lg">
            <PiImageSquareLight className="text-2xl" />
          </div>
          <span>Bank of Africa</span>
        </div>
        <div className="w-full p-3 flex items-center divide-x border-l border-dashed border-light-gray-3">
          <span>John Doe</span>
        </div>
        <div className="w-full p-3 flex items-center gap-2 border-l border-dashed border-light-gray-3">
          <button className="h-8 bg-[#F0F0FA] border border-light-gray-3 rounded-l-lg flex items-center justify-center rounded-lg">
            Suspended
          </button>
          <PiPencilSimpleLight className="text-xl ml-auto border rounded-md p-1 box-content" />
        </div>
        <div className="w-full p-3 flex items-center border-l border-dashed border-light-gray-3">
          11 Nov 2024
        </div>
      </div>

      <div
        onClick={onAddPaymentClick}
        className="absolute left-1/2 transform -translate-x-1/2 rounded-full px-4 py-2 flex items-center gap-2 bg-dark-blue text-white cursor-pointer"
      >
        <PiPlusCircle className="text-2xl" /> <span>New Payment</span>
      </div>
    </div>
  );
}
