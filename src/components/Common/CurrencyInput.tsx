import { FiPlus, FiMinus } from "react-icons/fi";
import { useCurrency } from "../../contexts/Currency";

interface InputProps {
  label: string;
  type: string;
  value: number;
  error: string;
  onChange: (value: number) => void;
}

export default function CurrencyInput({
  label,
  type,
  value,
  error,
  onChange,
}: InputProps) {
  const { currency } = useCurrency();

  const handleIncreaseInput = () => {
    onChange(value + 1);
  };

  const handleDecreaseInput = () => {
    if (value > 0) {
      onChange(value - 1);
    }
  };

  return (
    <div className="flex flex-col items-start">
      <label htmlFor="currency-input">{label}</label>
      <div
        id="currency-input"
        className="flex items-center justify-between p-0.5 border border-light-gray-3 rounded-lg"
      >
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="p-1.5 bg-transparent border-none outline-none"
        />
        <span>{error}</span>
        <div className="flex items-center gap-1">
          <span className="bg-light-gray-1 px-2 box-content rounded-md text-sm">{currency}</span>
          <div className="flex items-center border border-light-gray-3 rounded-md divide-x divide-light-gray-3 text-dark">
            <FiMinus className="p-2 box-content text-dark cursor-pointer" onClick={handleDecreaseInput} />
            <FiPlus className="p-2 box-content text-dark cursor-pointer" onClick={handleIncreaseInput} />
          </div>
        </div>
      </div>
    </div>
  );
}
