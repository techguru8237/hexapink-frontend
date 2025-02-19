import { useEffect, useState } from "react";

import { LiaSearchSolid } from "react-icons/lia";
import { BsArrowLeftSquare } from "react-icons/bs";

import api from "../../../actions/api";

import { Column, TableItem } from "../../../types";

import LoadingElement from "../../Common/LoadingElement";
import TableListItem from "./TableListItem";
import AttachedTableItem from "./AttachedTableItem";
import TableListItemSkeleton from "./TableListItemSkeleton";

interface TableAttachmentProps {
  columns: Column[];
  setColumns: (columns: Column[]) => void;
  selectedTable: TableItem | null;
  setSelectedTable: (table: TableItem) => void;
  disabled: boolean;
}

export default function TableAttachment({
  columns,
  setColumns,
  selectedTable,
  setSelectedTable,
  disabled,
}: TableAttachmentProps) {
  const [attachedTables, setAttachedTables] = useState<TableItem[]>([]);
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [tables, setTables] = useState<TableItem[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<TableItem[]>([]);
  const [showSearch, setShowSearch] = useState<boolean>(true);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        setTableLoading(true);
        const response = await api.get(`/api/table/all`);
        setTables(response.data);
      } catch (error) {
        console.error("Error fetching tables:", error);
      } finally {
        setTableLoading(false);
      }
    };

    fetchTables();
  }, []);

  useEffect(() => {
    if (columns.length && tables.length) {
      const attachedTables = tables.filter((table) =>
        columns.some((column) =>
          column.tableColumns?.some((tc) => tc.tableId === table._id)
        )
      );
      setAttachedTables(attachedTables);
    }
  }, [columns, tables]);

  useEffect(() => {
    if (search) {
      const results = tables.filter((table) =>
        table.tableName.toLowerCase().includes(search.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults(tables);
    }
  }, [search, tables]);

  const handleAttachTable = (id: string) => {
    if (!attachedTables.some((table) => table._id === id)) {
      const table = tables.find((table) => table._id === id);
      if (table) {
        setAttachedTables([...attachedTables, table]);
      }
    }
  };

  const handleDettachTable = (id: string) => {
    const updatedTables = attachedTables.filter((table) => table._id !== id);
    const updatedColumns = columns.map((col) => ({
      ...col,
      tableColumns: col.tableColumns?.filter((tc) => tc.tableId !== id),
    }));
    setColumns(updatedColumns);
    setAttachedTables(updatedTables);
  };

  return (
    <div className="w-96 flex flex-col gap-4 p-8">
      <h2 className="text-left text-lg font-semibold">Attached Tables</h2>
      <div className="flex flex-col gap-8">
        {showSearch ? (
          <div className="max-w-3xl bg-white border border-light-gray-1 rounded-lg flex flex-col text-dark">
            <div className="p-4 border-b border-dashed border-light-gray-1 text-left">
              <div className="flex items-center">
                <div className="flex flex-1 items-center gap-4">
                  <LiaSearchSolid className="text-2xl" />
                  <input
                    type="text"
                    placeholder="Search Countries"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-transparent border-none outline-none"
                  />
                </div>
                <button
                  onClick={() => setShowSearch(false)}
                  disabled={disabled}
                  className="border-none outline-none p-0"
                >
                  <BsArrowLeftSquare className="text-xl" />
                </button>
              </div>
            </div>
            {tableLoading ? (
              <div className="flex justify-center py-4">
                <LoadingElement width="16" color="#4040BF" />
              </div>
            ) : (
              <div className="flex flex-col p-2 gap-2 h-48 overflow-auto">
                {searchResults.map((table) => (
                  <TableListItem
                    key={table._id}
                    data={table}
                    disabled={disabled}
                    handleAttachTable={handleAttachTable}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <TableListItemSkeleton
            onClickAttachTable={() => setShowSearch(true)}
          />
        )}

        <div className="flex flex-col gap-2">
          {attachedTables.map((table) => (
            <div key={table._id}>
              <AttachedTableItem
                tableData={table}
                selectedTable={selectedTable}
                disabled={disabled}
                onClickItem={(table) => setSelectedTable(table)}
                onDelete={handleDettachTable}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
