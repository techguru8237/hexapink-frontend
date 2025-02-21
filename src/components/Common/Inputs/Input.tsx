interface InputProps {
  label: string;
  type: string;
  value: string | undefined;
  disabled?: boolean;
  error: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  label,
  type,
  value,
  disabled,
  error,
  onChange,
}: InputProps) {
  return (
    <div className="w-full flex flex-col items-start">
      <label htmlFor={label} className="text-md text-light-dark font-medium">
        {label}
      </label>
      <input
        id={label}
        value={value}
        onChange={onChange}
        type={type || "text"}
        disabled={disabled ?? false}
        className="w-full bg-white border border-light-gray-3 focus:border-dark-blue rounded-lg p-2 transition duration-200 outline-none"
      />
      {error && <span className="text-red text-xs">{error}</span>}
    </div>
  );
}
