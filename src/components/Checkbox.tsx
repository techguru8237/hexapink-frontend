import React from "react";
import { PiCheckBold } from "react-icons/pi";

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {

  return (
    <label className="flex items-center cursor-pointer">
      <div
        className={`w-6 h-6 flex items-center justify-center border rounded ${
          checked ? "bg-dark-blue text-white" : "bg-white"
        }`}
        onClick={() => onChange && onChange(!checked)}
      >
        <PiCheckBold
          className={`${checked ? "text-white" : "text-light-gray3"}`}
        />
      </div>
    </label>
  );
};

export default Checkbox;
