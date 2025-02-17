import React from "react";
import { PiDatabaseLight } from "react-icons/pi";
import { FaRegFolderOpen } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import { PiMapPinLight } from "react-icons/pi";

import samlpeImg from "../../assets/collection.png";
import Checkbox from "../Checkbox";
import { Collection } from "../../types";

interface CollectionListItemProps {
  data: Collection;
  id: string;
  isSelected: boolean;
  fetchCollections: () => void;
  collections: Collection[];
  setCollections: (updatedTables: Collection[]) => void;
  onCheckboxChange: (id: string) => void;
}

export const CollectionListItem: React.FC<CollectionListItemProps> = ({
  id,
  data,
  fetchCollections,
  collections,
  setCollections,
  isSelected,
  onCheckboxChange,
}) => {
  return (
    <div className="w-full flex items-center gap-2 text-light-dark">
      <Checkbox checked={isSelected} onChange={() => onCheckboxChange(id)} />
      {/* Collection Item */}
      <div
        className={`w-full bg-[#F7F7FC] flex justify-around border ${
          isSelected ? "border-dark-blue" : "border-light-gray-3"
        } rounded-lg`}
      >
        <div className="w-full p-3 flex items-center">
          <FaRegFolderOpen className="text-2xl mr-2" />
          <span>col_{id.slice(-5)}</span>
          <CiCircleInfo className="text-xl ml-auto border rounded-md p-1 box-content" />
        </div>
        <div className="w-full p-3 flex items-center gap-2 border-l border-dashed border-light-gray-3">
          <div className="w-12 h-12 bg-[#F0F0FA] border border-light-gray-3 rounded-l-lg flex items-center justify-center rounded-lg">
            {/* <PiImageSquareLight className="text-2xl" /> */}
            <img src={samlpeImg} alt="file image" className="rounded-lg" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-left">{data.title}</span>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center">
                <PiDatabaseLight className="text-md" />
                <span>{data.type}</span>
              </div>
              <div className="flex items-center">
                <PiMapPinLight className="text-md" />
                <span>{data.countries?.length && data.countries[0]}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full p-3 flex items-center divide-x border-l border-dashed border-light-gray-3">
          <span>{data.columns.length}</span>
        </div>
        <div className="w-full p-3 flex items-center gap-2 border-l border-dashed border-light-gray-3">
          <span>1500</span>
        </div>
        <div className="w-full p-3 flex items-center gap-2 border-l border-dashed border-light-gray-3">
          <span>1500-5</span>
        </div>
        <div className="w-full p-3 flex items-center border-l border-dashed border-light-gray-3">
          {data.createdAt?.split('T')[0]}
        </div>
      </div>
    </div>
  );
};
