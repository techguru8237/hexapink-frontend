import { NumericFormat } from "react-number-format";
import { FiPlus, FiMinus } from "react-icons/fi";

import { useCurrency } from "../../contexts/Currency";

interface InputProps {
  label: string;
  type: string; // This can remain as is if you want to keep flexibility
  value: number | undefined;
  error: string;
  onChange: (value: number) => void;
}

export default function CurrencyInput({
  label,
  value,
  error,
  onChange,
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
          onValueChange={(values) => {
            const { floatValue } = values; // Get the float value directly
            onChange(floatValue || 0); // Update the value
          }}
          className="p-1.5 bg-transparent border-none outline-none"
        />
        <span>{error}</span>
        <div className="flex items-center gap-1">
          <span className="bg-light-gray-1 px-2 box-content rounded-md text-sm">
            {currency}
          </span>
          <div className="flex items-center border border-light-gray-3 rounded-md divide-x divide-light-gray-3 text-dark">
            <FiMinus
              className="p-2 box-content text-dark cursor-pointer"
              onClick={handleDecreaseInput}
            />
            <FiPlus
              className="p-2 box-content text-dark cursor-pointer"
              onClick={handleIncreaseInput}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
