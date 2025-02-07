import { PiCheckBold, PiPencilSimpleLight, PiPlusCircle } from "react-icons/pi";
import { CiCircleInfo } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";

export default function NewUserSkeleton({
  onAddUserClick,
}: {
  onAddUserClick: () => void;
}) {
  return (
    <div className="w-full border-b border-light-gray1 relative px-8 py-4 flex items-center gap-2 text-light-gray3">
      <div className="w-6 h-6 border border-dashed rounded-md flex items-center justify-center">
        <PiCheckBold />
      </div>
      {/* Collection Item */}
      <div className="w-full bg-[#F7F7FC] flex justify-around border border-dashed border-light-gray3 rounded-lg font-redacted-script">
        <div className="w-[15%] p-3 flex items-center">
          <FaRegUserCircle className="text-2xl mr-2" />
          <span>user_id</span>
          <CiCircleInfo className="text-xl ml-auto border rounded-md p-1 box-content" />
        </div>
        <div className="w-[15%] p-3 flex items-center border-l border-dashed border-light-gray3">
          <span>Unreal User</span>
        </div>
        <div className="w-[20%] p-3 flex items-center gap-2 border-l border-dashed border-light-gray3">
          <span>unreal.user@example.com</span>
          <button className="bg-light-gray1 rounded-lg px-2 py-1">
            Verified
          </button>
        </div>
        <div className="w-[20%] p-3 flex items-center gap-2 border-l border-dashed border-light-gray3">
          <span>+33 12 34 56 78</span>
        </div>
        <div className="w-[15%] p-3 flex items-center gap-2 border-l border-dashed border-light-gray3">
          <button className="bg-light-gray1 rounded-lg px-2 py-1 text-light-dark">
            Suspended
          </button>
          <PiPencilSimpleLight className="text-xl ml-auto border rounded-md p-1 box-content" />
        </div>
        <div className="w-[15%] p-3 flex items-center border-l border-dashed border-light-gray3">
          11 Nov 2024
        </div>
      </div>

      <button
        onClick={onAddUserClick}
        className="absolute left-1/2 transform -translate-x-1/2 rounded-full px-4 py-2 flex items-center gap-2 bg-dark-blue text-white"
      >
        <PiPlusCircle className="text-2xl" /> <span>Add Table</span>
      </button>
    </div>
  );
}
