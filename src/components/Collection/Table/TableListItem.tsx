import { FaSquarePlus } from "react-icons/fa6";
import { TableItem } from "../../../types";

interface TableItemProps {
  data: TableItem;
  handleAttachTable: (id: string) => void;
  disabled: boolean;
}

export default function TableListItem({
  data,
  handleAttachTable,
  disabled,
}: TableItemProps) {
  return (
    <button
      disabled={disabled}
      onClick={() => handleAttachTable(data._id)}
      className={`${
        disabled ? "border border-light-gray-3 hover:border-light-gray-3" : "border hover:border-dark-blue"
      } border-light-gray-3 rounded-lg p-2 flex items-center justify-between gap-2 cursor-pointer`}
    >
      <div className="flex flex-1 items-center">
        <span className="flex-1 text-left">{data.tableName}</span>
        <span className="bg-light-gray-2 text-xs">
          Table-{data._id.slice(-5)}
        </span>
      </div>
      <FaSquarePlus className="text-dark-blue text-xl" />
    </button>
  );
}
