import { NumericFormat } from "react-number-format";
import { FiPlus, FiMinus } from "react-icons/fi";

import { useCurrency } from "../../../contexts/Currency";
import { IoMdRadioButtonOn } from "react-icons/io";

interface OptionalNumberInputProps {
  label: string;
  value: number | undefined;
  disabled: boolean;
  isCurrency: boolean;
  option: string;
  options: string[];
  changeValue: (option: string, value: number) => void;
  changeOption: (option: string) => void;
  error: string;
}

export default function OptionalNumberInput({
  label,
  value,
  disabled,
  isCurrency,
  option,
  options,
  changeValue,
  changeOption,
  error,
}: OptionalNumberInputProps) {
  const { currency } = useCurrency();

  const handleIncreaseInput = () => {
    changeValue(option, (value || 0) + 1);
  };

  const handleDecreaseInput = () => {
    if ((value || 0) > 0) {
      changeValue(option, (value || 0) - 1);
    }
  };

  return (
    <div className="flex flex-col items-start">
      <label
        htmlFor="currency-input"
        className="text-sm text-light-dark font-medium"
      >
        {label}
      </label>
      {/* Option select */}
      <div className="flex items-center gap-4 divide-x-2 divide-light-gray-3">
        {options.map((item) => (
          <button
            className={`flex items-center gap-2 px-0 py-2 border-none bg-transparent focus:border-none focus:outline-none cursor-pointer ${
              option === item ? "text-dark-blue" : "text-dark"
            }`}
            onClick={() => changeOption(item)}
          >
            <IoMdRadioButtonOn
              className={`text-xl ${
                option === item ? "text-dark-blue" : "text-light-gray-3"
              }`}
            />
            {item}
          </button>
        ))}
      </div>
      {/* Numebr input */}
      <div
        id="currency-input"
        className="w-full flex items-center justify-between p-0.5 border border-light-gray-3 rounded-lg"
      >
        <NumericFormat
          value={value}
          thousandSeparator=","
          decimalScale={0} // Allow decimals if needed
          fixedDecimalScale={true} // Ensure two decimal places
          allowNegative={false} // Prevent negative values
          disabled={disabled}
          onValueChange={(values) => {
            const { floatValue } = values; // Get the float value directly
            changeValue(option, floatValue || 0); // Update the value
          }}
          className="w-32 p-1.5 bg-transparent border-none outline-none text-dark-blue font-bold"
        />
        <span>{error}</span>
        <div className="flex items-center gap-1">
          {isCurrency && option !== "Volumn" && (
            <span className="bg-light-gray-1 px-2 box-content rounded-md text-sm">
              {currency}
            </span>
          )}
          <div className="flex items-center gap-1 border border-light-gray-3 rounded-md divide-x divide-light-gray-3 text-dark">
            <button
              disabled={disabled}
              onClick={handleDecreaseInput}
              className="p-0 border-none bg-transparent"
            >
              <FiMinus className="p-2 box-content text-dark cursor-pointer" />
            </button>
            <button
              disabled={disabled}
              onClick={handleIncreaseInput}
              className="p-0 border-none bg-transparent"
            >
              <FiPlus className="p-2 box-content text-dark cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
