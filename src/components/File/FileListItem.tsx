import React from "react";
import {
  PiDatabaseLight,
  PiPackage,
  PiSquareSplitHorizontalThin,
  PiSquareSplitVerticalThin,
  PiDownloadSimpleLight,
} from "react-icons/pi";
import { GiPositionMarker } from "react-icons/gi";
import samlpeImg from "../../assets/TheHomePage/image/HP.svg";
import Checkbox from "../Checkbox";

interface FileListItemProps {
  index: number;
  isSelected: boolean;
  onCheckboxChange: (index: number) => void;
}

export const FileListItem: React.FC<FileListItemProps> = ({
  index,
  isSelected,
  onCheckboxChange,
}) => {
  return (
    <div className="w-full flex items-center gap-2 text-light-dark">
      <Checkbox checked={isSelected} onChange={() => onCheckboxChange(index)} />
      {/* File Item */}
      <div
        className={`w-full bg-[#F7F7FC] flex justify-around border ${
          isSelected ? "border-dark-blue" : "border-light-gray-3"
        } rounded-lg`}
      >
        <div className="w-full p-3 flex items-center">
          <PiDatabaseLight className="text-2xl" />
          <span>file_{index + 1}</span>
        </div>
        <div className="w-full p-3 flex items-center gap-2 border-l border-dashed border-light-gray-3">
          <div className="w-12 h-12 bg-[#F0F0FA] border border-light-gray-3 rounded-l-lg flex items-center justify-center rounded-lg">
            {/* <PiImageSquareLight className="text-2xl" /> */}
            <img src={samlpeImg} alt="file image" />
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
        <div className="w-full p-3 flex items-center divide-x border-l border-dashed border-light-gray-3">
          <div className="flex items-center pr-2">
            <PiSquareSplitHorizontalThin className="text-2xl" />
            <span>7</span>
          </div>
          <div className="flex items-center pl-2">
            <PiSquareSplitVerticalThin className="text-2xl" />
            <span>1358</span>
          </div>
        </div>
        <div className="w-full p-3 flex items-center border-l border-dashed border-light-gray-3">
          11 Nov 2024
        </div>
        <div className="w-full p-3 flex items-center border-l border-dashed border-light-gray-3">
          <button className="bg-light-green rounded-lg px-2 py-1 text-green">
            Ready
          </button>
        </div>
        <div className="w-full p-3 flex justify-center items-center gap-2 border-l border-dashed border-light-gray-3 text-dark-blue">
          <div className="px-4 py-1 rounded-full border border-dark-blue flex items-center gap-2">
            <PiDownloadSimpleLight className="text-2xl" />
            <span>CSV</span>
          </div>
          <div className="px-4 py-1 rounded-full border border-dark-blue flex items-center gap-2">
            <PiDownloadSimpleLight className="text-2xl" />
            <span>XLS</span>
          </div>
        </div>
        <div className="w-full p-3 flex items-center gap-2 border-l border-dashed border-light-gray-3">
          <PiPackage className="text-2xl" />
          <span>ord_124</span>
        </div>
      </div>
    </div>
  );
};
