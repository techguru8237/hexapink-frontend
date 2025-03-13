import { useState } from "react";

import { Column, TableItem } from "../../../types";

import TableAttachment from "./TableAttachment";
import Mapping from "./Mapping";

interface ColumnMappingProps {
  columns: Column[];
  setColumns: (columns: Column[]) => void;
  disabled?: boolean;
}

export default function ColumnMapping({
  columns,
  setColumns,
  disabled
}: ColumnMappingProps) {
  const [selectedTable, setSelectedTable] = useState<TableItem | null>(null);

  return (
    <div className="h-full flex text-dark">
      <TableAttachment
        columns={columns}
        // setColumns={setColumns}
        selectedTable={selectedTable}
        setSelectedTable={setSelectedTable}
        disabled={disabled ?? false}
      />

      <Mapping
        columns={columns}
        setColumns={setColumns}
        table={selectedTable}
        disabled={disabled ?? false}
      />
    </div>
  );
}
