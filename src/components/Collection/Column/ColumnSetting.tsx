import { useEffect, useState } from "react";
import { Column } from "../../../types";
import Input from "../../Common/Inputs/Input";
import SwitchButton from "../../Common/SwitchButton";
import ColumnTypeSelect from "./ColumnTypeSelect";
import NumberInput from "../../Common/Inputs/NumberInput";

interface ColumnSettingProps {
  columns: Column[];
  setColumns: (columns: Column[]) => void;
  selectedColumnId: number | null;
  disabled: boolean
}

export default function ColumnSetting({
  selectedColumnId,
  columns,
  setColumns,
  disabled
}: ColumnSettingProps) {
  const [columnData, setColumnData] = useState<Column>({
    id: 0,
    name: "",
    showToClient: false,
    type: "Text",
    isAdditionalFee: false,
    additionalFee: 0,
    optional: true,
  });

  useEffect(() => {
    const column = columns.find((column) => column.id === selectedColumnId);
    if (column) {
      setColumnData(column);
    }
  }, [selectedColumnId, columns]);

  useEffect(() => {
    const updatedColumns = columns.map((column) =>
      column.id === selectedColumnId ? columnData : column
    );
    setColumns(updatedColumns);
  }, [columnData]);

  return (
    <div className="flex flex-1 flex-col gap-4 border-l border-light-gray-3 p-6">
      <h2 className="text-left text-lg font-semibold">Column Setting</h2>
      <div className="max-w-3xl bg-white border border-light-gray-1 rounded-lg flex flex-col text-dark">
        <div className="p-4 border-b border-dashed border-light-gray-3 text-left font-bold">
          General
        </div>
        <div className="flex flex-col gap-4 p-6 border-b border-dashed border-light-gray-3">
          <Input
            label="Column Name"
            type="text"
            value={columnData.name}
            disabled={disabled}
            onChange={(e) =>
              setColumnData({ ...columnData, name: e.target.value })
            }
            error=""
          />
          <div className="flex items-center gap-2">
            <SwitchButton
              value={columnData.showToClient}
              disabled={disabled}
              onChange={() =>
                setColumnData((prev) => ({
                  ...prev,
                  showToClient: !prev.showToClient,
                }))
              }
            />
            <span className="text-left">
              Don't show this column in clients file
            </span>
          </div>
        </div>
        <div className="p-6">
          <ColumnTypeSelect
            selectedType={columnData.type}
            disabled={disabled}
            onChange={(newType) =>
              setColumnData({ ...columnData, type: newType })
            }
          />
        </div>
      </div>

      <div className="max-w-3xl bg-white border border-light-gray-1 rounded-lg flex flex-col text-dark">
        <div className="p-4 border-b border-dashed border-light-gray-3 text-left font-bold">
          Additional Fees
        </div>
        <div className="flex flex-col p-6 gap-4">
          <div className="flex items-center gap-2">
            <SwitchButton
              value={columnData.isAdditionalFee}
              disabled={disabled}
              onChange={() =>
                setColumnData((prev) => ({
                  ...prev,
                  isAdditionalFee: !prev.isAdditionalFee,
                }))
              }
            />
            <span className="text-left">This column has an additional fee</span>
          </div>
          {columnData.isAdditionalFee && (
            <div className="flex flex-col gap-4">
              <NumberInput
                label="Additional Fee"
                value={columnData.additionalFee}
                disabled={disabled}
                isCurrency={true}
                onChange={(value) =>
                  setColumnData({ ...columnData, additionalFee: value })
                }
                error=""
              />
              <div className="flex items-center gap-2">
                <SwitchButton
                  value={columnData.optional}
                  disabled={disabled}
                  onChange={() =>
                    setColumnData((prev) => ({
                      ...prev,
                      optional: !prev.optional,
                    }))
                  }
                />
                <span className="text-left">the column is optional</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
