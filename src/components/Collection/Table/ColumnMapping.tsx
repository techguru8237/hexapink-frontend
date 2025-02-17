import { useState } from "react";

import { Column, TableItem } from "../../../types";

import TableAttachment from "./TableAttachment";
import Mapping from "./Mapping";

interface ColumnMappingProps {
  columns: Column[];
  setColumns: (columns: Column[]) => void;
}

export default function ColumnMapping({
  columns,
  setColumns,
}: ColumnMappingProps) {
  const [selectedTable, setSelectedTable] = useState<TableItem | null>(null);
  const [attachedTables, setAttachedTables] = useState<TableItem[]>([]);

  return (
    <div className="h-full flex text-dark">
      <TableAttachment
        selectedTable={selectedTable}
        attachedTables={attachedTables}
        setSelectedTable={setSelectedTable}
        setAttachedTables={setAttachedTables}
      />

      <Mapping
        columns={columns}
        setColumns={setColumns}
        table={selectedTable}
      />
    </div>
  );
}
