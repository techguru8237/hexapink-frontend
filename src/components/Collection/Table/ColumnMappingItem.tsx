import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoMdRadioButtonOn } from "react-icons/io";

import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import { Column, TableItem } from "../../../types";

interface ColumnMappingItemProps {
  column: Column;
  columns: Column[];
  setColumns: (columns: Column[]) => void;
  table: TableItem | null;
}

export default function ColumnMappingItem({
  column,
  columns,
  setColumns,
  table,
}: ColumnMappingItemProps) {
  const [expandTableColumns, setExpandTableColumns] = useState<boolean>(false);

  const handleMapColumn = (tableColumn: string) => {
    if (table) {
      const updatedColumns = columns.map((item) =>
        item.id === column.id
          ? {
              ...item,
              tableColumns: [
                ...(item.tableColumns ?? []),
                { tableId: table._id, tableColumn: tableColumn },
              ],
            }
          : item
      );
      setColumns(updatedColumns);
      setExpandTableColumns(false);
    }
  };

  const handleUnmapColumn = () => {
    const updatedColumns = columns.map((item) => {
      if (item.id === column.id) {
        const updatedTableColumns =
          item.tableColumns?.filter((tcol) => tcol.tableId !== table?._id) ??
          [];
        return { ...column, tableColumns: updatedTableColumns };
      } else {
        return item;
      }
    });
    setColumns(updatedColumns);
  };

  const mappedTableColumn = column.tableColumns?.find(
    (tableColumn) => tableColumn.tableId === table?._id
  );

  return (
    <div className="flex flex-col border border-light-gray-3 rounded-xl p-1">
      <div className="flex items-center">
        {/* Collection Column */}
        <div className="relative flex flex-1 items-center justify-start gap-2 bg-light-gray-2 border-2 border-[#D8D8F3] text-sm text-dark rounded-lg px-2 py-4">
          <span className="text-nowrap text-sm font-semibold">
            {column.name}
          </span>
          <div
            className={`absolute top-1/2 -right-1 transform -translate-y-1/2 z-10 w-2 h-2 rounded-full bg-white border ${
              mappedTableColumn ? "border-dark-blue" : "border-light-gray-3"
            }`}
          ></div>
        </div>
        <div
          className={`w-4 border-b ${
            mappedTableColumn ? "border-dark-blue" : "border-light-gray-3"
          }`}
        ></div>
        {/* Table Column */}
        <div className="relative flex flex-1 items-center justify-start gap-2 bg-white border-2 border-[#D8D8F3] text-sm text-dark rounded-lg p-2">
          {mappedTableColumn ? (
            <div className="w-full px-2 py-1 bg-light-gray-2 border-light-gray-3 text-dark-blue rounded-full flex items-center gap-2">
              <IoMdRadioButtonOn className="text-lg" />
              <span>{mappedTableColumn.tableColumn}</span>
              <button
                onClick={handleUnmapColumn}
                className="w-4 h-4 ml-auto text-red border border-light-gray-3 rounded-full p-1 box-content"
              >
                <IoClose />
              </button>
            </div>
          ) : (
            <div
              onClick={() => setExpandTableColumns(!expandTableColumns)}
              className={`flex flex-1 p-2 items-center justify-between cursor-pointer ${
                expandTableColumns ? "border-dark-blue" : "border-light-gray-3"
              }`}
            >
              <span>Select A Table Column</span>
            </div>
          )}
          {expandTableColumns ? (
            <MdKeyboardArrowUp
              onClick={() => setExpandTableColumns(!expandTableColumns)}
              className="text-lg cursor-pointer"
            />
          ) : (
            <MdKeyboardArrowDown
              onClick={() => setExpandTableColumns(!expandTableColumns)}
              className="text-lg cursor-pointer"
            />
          )}
          <div
            className={`absolute top-1/2 -left-1 transform -translate-y-1/2 z-10 w-2 h-2 rounded-full bg-white border ${
              mappedTableColumn ? "border-dark-blue" : "border-light-gray-3"
            }`}
          ></div>
        </div>
      </div>

      {expandTableColumns && (
        <div className="flex flex-wrap gap-2 p-2">
          {table?.columns.map((column) => (
            <div
              key={column}
              onClick={() => handleMapColumn(column)}
              className="flex items-center gap-2 px-2 py-1 rounded-full border border-light-gray-3 bg-light-gray-2 text-lightgray-3 hover:text-dark-blue cursor-pointer"
            >
              <IoMdRadioButtonOn className="text-light-gray-3" />
              <span>{column}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
