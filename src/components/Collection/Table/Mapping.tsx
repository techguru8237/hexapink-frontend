import { Column, TableItem } from "../../../types";
import ColumnMappingItem from "./ColumnMappingItem";
import MappingHeader from "./MappingHeader";

interface MappingProps {
  columns: Column[];
  setColumns: (columns: Column[]) => void;
  table: TableItem | null;
}

export default function Mapping({ columns, setColumns, table }: MappingProps) {
  return (
    <div className="max-w-3xl h-full flex flex-1 flex-col gap-4 border-l border-light-gray-3 p-8">
      <h2 className="text-left text-lg font-semibold">Column Setting</h2>

      <div className="flex flex-col gap-4">
        <MappingHeader />
        {table && columns.map((column) => (
          <ColumnMappingItem
            key={column.id}
            column={column}
            columns={columns}
            setColumns={setColumns}
            table={table}
          />
        ))}
      </div>
    </div>
  );
}
