import { Step } from "../../../types";
import StepItem from "./StepItem";
import StepItemSkeleton from "./StepItemSkeleton";

interface StepGenerateProps {
  steps: Step[];
  disabled: boolean;
  selectedStepId: number | null;
  setSelectedStepId: (stepId: number) => void;
  setDraggedStepId: (id: number | null) => void;
  handleDrop: (stepId: number) => void;
  onClickNewStep: () => void;
  handleDeleteStep: (stepId: number) => void;
}

export default function StepGenerate({
  steps,
  disabled,
  selectedStepId,
  handleDrop,
  onClickNewStep,
  setSelectedStepId,
  setDraggedStepId,
  handleDeleteStep,
}: StepGenerateProps) {
  return (
    <div className="w-96 flex flex-col gap-4 p-6">
      <h2 className="text-left text-lg font-semibold">Steps</h2>
      <div className="flex flex-col gap-4">
        <StepItemSkeleton disabled={disabled} onClickNewStep={onClickNewStep} />
        <div className="flex flex-col gap-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDrop={() => handleDrop(index)}
            >
              <StepItem
                step={step}
                selectedStepId={selectedStepId}
                onClickItem={(id) => setSelectedStepId(id)}
                onDelete={handleDeleteStep}
                onDragStart={() => setDraggedStepId(step.id)}
                onDragEnd={() => setDraggedStepId(null)}
                disabled={disabled}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
