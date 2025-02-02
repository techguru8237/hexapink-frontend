// import Link from "next/link";
import { Link } from 'react-router-dom';
import {
  PiCheckBold,
  PiDatabaseLight,
  PiImageSquareLight,
  PiPackage,
  PiSquareSplitHorizontalThin,
  PiSquareSplitVerticalThin,
  PiDownloadSimpleLight,
  PiPlusCircle,
} from "react-icons/pi";
import { GiPositionMarker } from "react-icons/gi";

export default function NewFileSkeleton() {
  return (
    <div className="w-full border-b border-light-gray1 relative px-8 py-4 flex items-center gap-2 text-light-gray3">
      <div className="w-6 h-6 border border-dashed rounded-md flex items-center justify-center">
        <PiCheckBold />
      </div>
      {/* File Item */}
      <div className="w-full bg-[#F7F7FC] flex justify-around border border-dashed border-light-gray3 rounded-lg font-redacted-script">
        <div className="w-full p-3 flex items-center">
          <PiDatabaseLight className="text-2xl" />
          <span>file_255</span>
        </div>
        <div className="w-full p-3 flex items-center gap-2 border-l border-dashed border-light-gray3">
          <div className="w-12 h-12 bg-[#F0F0FA] border border-light-gray3 rounded-l-lg flex items-center justify-center rounded-lg">
            <PiImageSquareLight className="text-2xl" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Insurance Companies</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <PiDatabaseLight className="text-md" />
                <span>Particuliers</span>
              </div>
              <div className="flex items-center">
                <GiPositionMarker className="text-md" />
                <span>Belgique</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full p-3 flex items-center divide-x border-l border-dashed border-light-gray3">
          <div className="flex items-center pr-2">
            <PiSquareSplitHorizontalThin className="text-2xl" />
            <span>7</span>
          </div>
          <div className="flex items-center pl-2">
            <PiSquareSplitVerticalThin className="text-2xl" />
            <span>1358</span>
          </div>
        </div>
        <div className="w-full p-3 flex items-center border-l border-dashed border-light-gray3">
          11 Nov 2024
        </div>
        <div className="w-full p-3 flex items-center border-l border-dashed border-light-gray3">
          <button className="bg-[#F0F0FA] rounded-lg px-2 py-1">Ready</button>
        </div>
        <div className="w-full p-3 flex items-center gap-2 border-l border-dashed border-light-gray3">
          <div className="px-4 py-1 rounded-full border border-light-gray3 flex items-center gap-2">
            <PiDownloadSimpleLight className="text-2xl" />
            <span>CSV</span>
          </div>
          <div className="px-4 py-1 rounded-full border border-light-gray3 flex items-center gap-2">
            <PiDownloadSimpleLight className="text-2xl" />
            <span>XLS</span>
          </div>
        </div>
        <div className="w-full p-3 flex items-center gap-2 border-l border-dashed border-light-gray3">
          <PiPackage className="text-2xl" />
          <span>ord_124</span>
        </div>
      </div>

      <Link to="/user/new-file" className="absolute left-1/2 transform -translate-x-1/2 rounded-full px-4 py-2 flex items-center gap-2 bg-dark-blue text-white">
        <PiPlusCircle className="text-2xl" /> <span>New File</span>
      </Link>
    </div>
  );
}
