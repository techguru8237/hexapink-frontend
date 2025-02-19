import { IoMdRadioButtonOn } from "react-icons/io";

const valueTypes = [
  "Mixed",
  "Text",
  "Number",
  "Boolean",
  "Email",
  "Phone Number",
  "Date",
  "Duration",
];

interface ColumnTypeSelectProps {
  selectedType: string;
  onChange: (type: string) => void;
  disabled: boolean;
}

export default function ColumnTypeSelect({
  selectedType,
  onChange,
  disabled,
}: ColumnTypeSelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-left text-sm text-light-dark font-medium">
        Value Type
      </label>

      <div className="flex flex-wrap gap-2">
        {valueTypes.map((type) => (
          <button
            key={type}
            disabled={disabled}
            onClick={() => onChange(type)}
            className={`flex items-center gap-2 px-2 py-1 rounded-full border ${
              selectedType === type
                ? "border-dark-blue text-dark-blue"
                : "border-light-gray-3 text-light-gray-3"
            }  cursor-pointer hover:bg-light-gray-1`}
          >
            <IoMdRadioButtonOn />
            <span
              className={`${
                selectedType === type ? "text-dark-blue" : "text-dark"
              }`}
            >
              {type}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
