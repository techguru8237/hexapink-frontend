import { useEffect, useState } from "react";
import { Column, Step } from "../../../types";
import StepGenerator from "./StepGenerate";
import ColumnToStep from "./ColumnToStep";

interface StepSettingProps {
  columns: Column[];
  setColumns: (columns: Column[]) => void;
  disabled?: boolean;
}

  
export default function StepSetting({ columns, setColumns, disabled }: StepSettingProps) {
  const [steps, setSteps] = useState<Step[]>([]);
  const [selectedStepId, setSelectedStepId] = useState<number | null>(null);
  const [draggedStepId, setDraggedStepId] = useState<number | null>(null);

  useEffect(() => {
    const uniqueStepNames = new Set(
      columns
        .map((col) => col.stepName)
        .filter((name): name is string => name !== undefined)
    );

    const uniqueSteps = Array.from(uniqueStepNames).map((name, index) => ({
      id: index + 1,
      name: name,
    }));

    setSteps(uniqueSteps);
  }, [columns]);

  const handleClickNewStep = () => {
    const Ids = steps.map((step) => step.id);
    const maxID = Ids.length > 0 ? Math.max(...Ids) : 0;

    const newStep = {
      id: maxID + 1,
      name: `Step ${maxID + 1}`,
    };

    setSteps([...steps, newStep]);
  };

  const handleDeleteStep = (id: number) => {
    const updatedSteps = steps.filter((step) => step.id !== id);
    setSteps(updatedSteps);
  };

  const handleDrop = (index: number) => {
    if (draggedStepId !== null) {
      const draggedStep = steps.find((step) => step.id === draggedStepId);
      const updatedSteps = steps.filter((step) => step.id !== draggedStepId);
      updatedSteps.splice(index, 0, draggedStep!);
      setSteps(updatedSteps);
      setDraggedStepId(null);
    }
  };

  return (
    <div className="h-full flex text-dark">
      <StepGenerator
        steps={steps}
        selectedStepId={selectedStepId}
        setSelectedStepId={setSelectedStepId}
        setDraggedStepId={setDraggedStepId}
        onClickNewStep={handleClickNewStep}
        handleDeleteStep={handleDeleteStep}
        handleDrop={handleDrop}
        disabled={disabled ?? false}
      />

      <ColumnToStep
        columns={columns}
        steps={steps}
        setSteps={setSteps}
        selectedStepId={selectedStepId}
        setColumns={setColumns}
        disabled={disabled ?? false}
      />
    </div>
  );
}
