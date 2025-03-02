import React from "react";
import {
  PiDatabaseLight,
  PiPackage,
  PiSquareSplitHorizontalThin,
  PiSquareSplitVerticalThin,
  PiDownloadSimpleLight,
} from "react-icons/pi";
import { GiPositionMarker } from "react-icons/gi";

import { File } from "../../../types";
import samlpeImg from "../../../assets/TheHomePage/image/HP.svg";
import Checkbox from "../../Common/Checkbox";

interface FileListItemProps {
  index: string;
  isSelected: boolean;
  fileData: File;
  onCheckboxChange: (index: string) => void;
}

export const FileListItem: React.FC<FileListItemProps> = ({
  index,
  isSelected,
  fileData,
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
        <div className="w-[10%] p-3 flex items-center">
          <PiDatabaseLight className="text-2xl" />
          <span>file_{index.slice(-5)}</span>
        </div>
        <div className="w-[30%] p-3 flex items-center gap-2 border-l border-dashed border-light-gray-3">
          <div className="w-10 h-10 rounded-l-lg flex items-center justify-center flex-shrink-0 rounded-lg">
            <img src={samlpeImg} alt="file image" />
          </div>
          <div className="flex flex-col items-start">
            <span className="font-bold">{fileData.title}</span>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center">
                <PiDatabaseLight className="text-md flex-shrink-0" />
                <span className="text-left">{fileData.type}</span>
              </div>
              <div className="flex items-center">
                <GiPositionMarker className="text-md flex-shrink-0" />
                <span className="text-left">{fileData.countries[0]}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[10%] p-3 flex items-center divide-x border-l border-dashed border-light-gray-3">
          <div className="flex items-center pr-2">
            <PiSquareSplitHorizontalThin className="text-2xl" />
            {fileData?.columns && (
              <span>{Object.keys(fileData.columns).length}</span>
            )}
          </div>
          <div className="flex items-center pl-2">
            <PiSquareSplitVerticalThin className="text-2xl" />
            <span>{fileData.volume}</span>
          </div>
        </div>
        <div className="w-[10%] p-3 flex items-center border-l border-dashed border-light-gray-3">
          {fileData.createdAt?.split("T")[0]}
        </div>
        <div className="w-[10%] p-3 flex items-center border-l border-dashed border-light-gray-3">
          <span
            className={`rounded-lg px-2 py-1 text-sm ${
              fileData.status === "Ready"
                ? "bg-light-green-2 border border-light-green-1 text-green"
                : "bg-[#FAFAFA] border border-[#E6E6E6] text-dark"
            }`}
          >
            {fileData.status}
          </span>
        </div>
        <div className="w-[20%] p-3 flex justify-center items-center gap-2 border-l border-dashed border-light-gray-3 text-dark-blue">
          <div className="px-4 py-1 rounded-full border border-dark-blue flex items-center gap-2 font-sm">
            <PiDownloadSimpleLight />
            <span className="text-xs">CSV</span>
          </div>
          <div className="px-4 py-1 rounded-full border border-dark-blue flex items-center gap-2 font-sm">
            <PiDownloadSimpleLight />
            <span className="text-xs">XLS</span>
          </div>
        </div>
        <div className="w-[10%] p-3 flex items-center gap-2 border-l border-dashed border-light-gray-3">
          <PiPackage className="text-2xl" />
          <span>ord_124</span>
        </div>
      </div>
    </div>
  );
};
