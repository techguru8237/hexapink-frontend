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

  return (
    <div className="h-full flex text-dark">
      <TableAttachment
        columns={columns}
        selectedTable={selectedTable}
        setSelectedTable={setSelectedTable}
      />

      <Mapping
        columns={columns}
        setColumns={setColumns}
        table={selectedTable}
      />
    </div>
  );
}
