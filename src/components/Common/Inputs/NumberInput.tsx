import { NumericFormat } from "react-number-format";
import { FiPlus, FiMinus } from "react-icons/fi";

import { useCurrency } from "../../../contexts/Currency";

interface InputProps {
  label: string;
  value: number | undefined;
  disabled: boolean;
  isCurrency: boolean;
  onChange: (value: number) => void;
  error: string;
}

export default function NumberInput({
  label,
  value,
  disabled,
  isCurrency,
  onChange,
  error,
}: InputProps) {
  const { currency } = useCurrency();

  const handleIncreaseInput = () => {
    onChange((value || 0) + 1);
  };

  const handleDecreaseInput = () => {
    if ((value || 0) > 0) {
      onChange((value || 0) - 1);
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
      <div
        id="currency-input"
        className="flex items-center justify-between p-0.5 border border-light-gray-3 rounded-lg"
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
            onChange(floatValue || 0); // Update the value
          }}
          className="p-1.5 bg-transparent border-none outline-none"
        />
        <span>{error}</span>
        <div className="flex items-center gap-1">
          {isCurrency && (
            <span className="bg-light-gray-1 px-2 box-content rounded-md text-sm">
              {currency}
            </span>
          )}
          <div className="flex items-center border border-light-gray-3 rounded-md divide-x divide-light-gray-3 text-dark">
            <button
              disabled={disabled}
              onClick={handleDecreaseInput}
              className="p-0 border-none"
            >
              <FiMinus className="p-2 box-content text-dark cursor-pointer" />
            </button>
            <button
              disabled={disabled}
              onClick={handleIncreaseInput}
              className="p-0 border-none"
            >
              <FiPlus className="p-2 box-content text-dark cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
