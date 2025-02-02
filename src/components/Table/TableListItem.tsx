// import { Link } from 'react-router-dom';
import { PiTableLight } from "react-icons/pi";
import { CiCircleInfo } from "react-icons/ci";
import Checkbox from "../Checkbox";

interface TableListItemProps {
  index: number;
  isSelected: boolean;
  onCheckboxChange: (index: number) => void;
}

export const TableListItem: React.FC<TableListItemProps> = ({
  index,
  isSelected,
  onCheckboxChange,
}) => {
  return (
    <div className="w-full flex items-center gap-2 text-light-dark">
      <Checkbox checked={isSelected} onChange={() => onCheckboxChange(index)} />
      {/* Table Item */}
      <div
        className={`w-full bg-[#F7F7FC] flex justify-around border ${isSelected ? "border-dark-blue" : "border-light-gray3"
          } rounded-lg`}
      >
        <div className="w-full bg-[#F7F7FC] flex justify-around border border-dashed border-light-gray3 rounded-lg font-redacted-script">
          <div className="w-full p-3 flex items-center justify-between">
            <div className='flex flex-row'>
              <PiTableLight className="text-2xl mr-2" />
              <span>table_124</span>
            </div>
            <CiCircleInfo className="text-2xl mr-2 border rounded-md p-1 box-content" />
          </div>
          <div className="w-full p-3 flex items-center divide-x border-l border-dashed border-light-gray3">
            <span>12</span>
          </div>
          <div className="w-full p-3 flex items-center gap-2 border-l border-dashed border-light-gray3">
            <span>1500</span>
          </div>
          <div className="w-full p-3 flex items-center border-l border-dashed border-light-gray3">
            11 Nov 2024
          </div>
        </div>
      </div>
    </div>
  );
}