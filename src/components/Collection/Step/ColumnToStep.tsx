import React, { useCallback, useEffect, useState } from "react";
import { LiaSearchSolid } from "react-icons/lia";
import { BsArrowLeftSquare } from "react-icons/bs";
import { FaSquarePlus } from "react-icons/fa6";
import { Column, Step } from "../../../types";
import TableListItemSkeleton from "../Table/TableListItemSkeleton";
import Input from "../../Common/Inputs/Input";
import StepedColumnItem from "./StepedColumnItem";

interface ColumnToStepProps {
  selectedStepId: number | null;
  steps: Step[];
  setSteps: (steps: Step[]) => void;
  columns: Column[];
  setColumns: (columns: Column[]) => void;
  disabled: boolean;
}

const ColumnToStep = React.memo(
  ({
    selectedStepId,
    setSteps,
    steps,
    columns,
    setColumns,
    disabled,
  }: ColumnToStepProps) => {
    const [search, setSearch] = useState<string>("");
    const [showSearch, setShowSearch] = useState<boolean>(true);
    const [searchResults, setSearchResults] = useState<Column[]>([]);
    const [relatedColumns, setRelatedColumns] = useState<Column[]>([]);
    const [selectedStep, setSelectedStep] = useState<Step | undefined>();
    const [draggedColumnId, setDraggedColumnId] = useState<number | null>(null);

    // **USE EFFECT : Load Selected Step **
    useEffect(() => {
      if (selectedStepId) {
        const step = steps.find((item) => item.id === selectedStepId);
        setSelectedStep(step);
      } else {
        setSelectedStep(undefined); // Clear selectedStep if no ID is selected
      }
    }, [selectedStepId, steps]);

    // **USE EFFECT : Load Related Columns **
    useEffect(() => {
      if (selectedStep && columns) {
        const cols = columns.filter(
          (column) =>
            column.stepName === selectedStep.name && column.name !== ""
        );
        setRelatedColumns(cols);
      } else {
        setRelatedColumns([]); // Clear relatedColumns if no step is selected
      }
    }, [selectedStep, columns]);

    // **USE EFFECT : Search Columns **
    useEffect(() => {
      if (search) {
        const results = columns.filter((column) =>
          column.name.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResults(results);
      } else {
        setSearchResults(columns);
      }
    }, [search, columns]);

    // **HANDLE FUNCTION : Change Step Name **
    const handleChangeStepName = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedSteps = steps.map((step) =>
          step.id === selectedStepId
            ? { ...step, name: event.target.value } // Correct way to update
            : step
        );
        setSteps(updatedSteps);
      },
      [selectedStepId, setSteps, steps]
    );

    // **HANDLE FUNCTION : Attach column to step **
    const handleAttachColumnToStep = useCallback(
      (columnId: number) => {
        if (!selectedStep) {
          return; // Don't attach if no step is selected
        }

        if (!relatedColumns.some((column) => column.id === columnId)) {
          const column = columns.find((column) => column.id === columnId);
          if (column) {
            setRelatedColumns((prev) => [...prev, column]);
          }
        }
        const updatedColumns = columns.map((column) =>
          column.id === columnId
            ? { ...column, stepName: selectedStep.name }
            : column
        );
        setColumns(updatedColumns);
      },
      [columns, relatedColumns, selectedStep, setColumns]
    );

    // **HANDLE FUNCTION : Detach Column from step **
    const handleDetachTable = useCallback(
      (columnId: number) => {
        const updatedRelatedColumns = relatedColumns.filter(
          (column) => column.id !== columnId
        );
        setRelatedColumns(updatedRelatedColumns);

        // Also clear the stepName in the main columns array
        const updatedColumns = columns.map((column) =>
          column.id === columnId ? { ...column, stepName: "" } : column
        );
        setColumns(updatedColumns);
      },
      [relatedColumns, setColumns]
    );

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
      <div className="w-96 flex flex-col gap-4 p-8">
        <div className="flex flex-col gap-8">
          <Input
            label="Step Name"
            type="text"
            value={selectedStep ? selectedStep.name : ""}
            disabled={disabled}
            onChange={handleChangeStepName}
            error=""
          />

          {!disabled &&
            (showSearch ? (
              <div className="max-w-3xl bg-white border border-light-gray-1 rounded-lg flex flex-col text-dark">
                <div className="p-4 border-b border-dashed border-light-gray-1 text-left">
                  <div className="flex items-center">
                    <div className="flex flex-1 items-center gap-4">
                      <LiaSearchSolid className="text-2xl" />
                      <input
                        type="text"
                        placeholder="Search Collections"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-transparent border-none outline-none"
                      />
                    </div>
                    <BsArrowLeftSquare
                      onClick={() => setShowSearch(false)}
                      className="cursor-pointer text-xl"
                    />
                  </div>
                </div>

                <div className="flex flex-col p-2 gap-2 h-48 overflow-auto">
                  {searchResults.map((column) => (
                    <div
                      key={column.id}
                      onClick={() => handleAttachColumnToStep(column.id)}
                      className={`border border-light-gray-3 rounded-lg p-2 flex items-center justify-between gap-2 cursor-pointer hover:border-dark-blue`}
                    >
                      <div className="flex flex-1 items-center">
                        <span className="flex-1 text-left">{column.name}</span>
                        <span className="bg-light-gray-2 text-xs">
                          {column.type}
                        </span>
                      </div>
                      <FaSquarePlus className="text-dark-blue text-xl" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <TableListItemSkeleton
                onClickAttachTable={() => setShowSearch(true)}
              />
            ))}

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <h2 className="text-left text-lg font-semibold">Step Columns</h2>
              <div className="flex flex-col gap-2">
                {relatedColumns.map((column, index) => (
                  <StepedColumnItem
                    key={column.id}
                    index={index}
                    column={column}
                    onDetachTable={handleDetachTable}
                    draggedColumnId={draggedColumnId}
                    setDraggedColumnId={setDraggedColumnId}
                    handleDrop={handleDrop}
                    disabled={disabled}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ColumnToStep;
