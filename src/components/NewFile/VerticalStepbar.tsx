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
  return (
    <div className="relative flex flex-col items-start gap-12 font-raleway">
      {steps.map((step, index) => {
        const isCurrentStep = index === stepNumber - 1;
        return (
          <div
            key={index}
            className={`relative w-36 h-8 ${
              isCurrentStep ? "border" : ""
            } border-light-gray-3 rounded-full flex items-center gap-2`}
          >
            {isCurrentStep ? (
              <div className="w-8 h-8 bg-dark-blue text-white rounded-full flex items-center justify-center z-10">
                {index + 1}
              </div>
            ) : (
              <div className="pl-2">
                <div
                  className={`w-4 h-4 bg-white border ${
                    index < stepNumber - 1
                      ? "border-dark-blue"
                      : "border-light-gray-3"
                  } rounded-full z-10`}
                ></div>
              </div>
            )}
            <span
              className={`${
                isCurrentStep ? "font-bold" : ""
              } ${
                index <= stepNumber - 1
                  ? "text-dark-blue"
                  : "text-light-gray-3"
              }`}
            >
              {step.label}
            </span>

            {index != steps.length - 1 && (
              <div
                className={`absolute h-20 border-r ${
                  index < stepNumber - 1
                    ? "border-dark-blue"
                    : "border-light-gray-3"
                } top-[23px] left-[15px] z-0`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default VerticalStepBar;
