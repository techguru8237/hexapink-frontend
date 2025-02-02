// import { DivideIcon } from "@heroicons/react/20/solid";
import React from "react";

interface Step {
  label: string;
}

interface VerticalStepBarProps {
  steps: Step[];
  stepNumber: number;
}

const VerticalStepBar: React.FC<VerticalStepBarProps> = ({
  steps,
  stepNumber,
}) => {
  // const [selectedStep, setSelectedStep] = useState<number | null>(null);

  return (
    <div className="relative flex flex-col items-start gap-12">
      <div className="absolute top-0 left-5 my-5 h-64 border-r border-light-gray3 z-0"></div>

      {steps.map((step, index) => {
        const isCurrentStep = index === stepNumber;
        return (
          <div
            key={index}
            className={`relative w-36 h-10 ${
              isCurrentStep ? "border" : ""
            } border-light-gray3 rounded-full flex items-center gap-2 z-10`}
          >
            {isCurrentStep ? (
              <div className="w-10 h-10 bg-dark-blue text-white rounded-full flex items-center justify-center">
                {index}
              </div>
            ) : (
              <div className="pl-3">
                <div className="bg-white border border-light-gray3 rounded-full w-4 h-4"></div>
              </div>
            )}
            <span
              className={`${isCurrentStep ? "text-dark" : "text-light-gray3"}`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default VerticalStepBar;
