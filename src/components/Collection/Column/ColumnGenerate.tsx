import { useState } from "react";
import { Column } from "../../../types";
import ColumnItem from "./ColumnItem";
import ColumnSetting from "./ColumnSetting";
import ColumnItemSkeleton from "./ColumnItemSkeleton";

interface ColumnGenerateProps {
  columns: Column[];
  setColumns: (columns: Column[]) => void;
}

export default function ColumnGenerate({
  columns,
  setColumns,
}: ColumnGenerateProps) {
  const [selectedColumnId, setSelectedColumnId] = useState<number | null>(null);
  const [draggedColumnId, setDraggedColumnId] = useState<number | null>(null);

  const handleClickNewColumn = () => {
    const Ids = columns.map(column => column.id)
    const maxID = Ids.length > 0 ? Math.max(...Ids) : 0;

  const newColumn = {
    id: maxID + 1,
    name: `Column ${maxID + 1}`,
    type: "Text",
    showToClient: true,
    additionalFee: false,
  };
  
    setColumns([...columns, newColumn]);
  };

  const handleDeleteColumn = (id: number) => {
    const updatedColumns = columns.filter((column) => column.id !== id);
    setColumns(updatedColumns);
  };

  const handleDrop = (index: number) => {
    if (draggedColumnId !== null) {
      const draggedColumn = columns.find(
        (column) => column.id === draggedColumnId
      );
      const updatedColumns = columns.filter(
        (column) => column.id !== draggedColumnId
      );
      updatedColumns.splice(index, 0, draggedColumn!);
      setColumns(updatedColumns);
      setDraggedColumnId(null);
    }
  };

  return (
    <div className="h-full flex font-raleway text-dark">
      <div className="w-96 flex flex-col gap-4 p-6">
        <h2 className="text-left text-lg font-semibold">Columns</h2>
        <div className="flex flex-col gap-4">
          <ColumnItemSkeleton onClickNewColumn={handleClickNewColumn} />
          <div className="flex flex-col gap-2">
            {columns.map((column, index) => (
              <div
                key={column.id}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDrop={() => handleDrop(index)}
              >
                <ColumnItem
                  columnData={column}
                  selectedColumnId={selectedColumnId}
                  onClickItem={(id) => setSelectedColumnId(id)}
                  onDelete={handleDeleteColumn}
                  onDragStart={() => setDraggedColumnId(column.id)}
                  onDragEnd={() => setDraggedColumnId(null)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <ColumnSetting
        selectedColumnId={selectedColumnId}
        columns={columns}
        setColumns={setColumns}
      />
    </div>
  );
}
