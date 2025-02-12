interface InputProps {
  label: string;
  type: string;
  value: string | undefined;
  error: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  label,
  type,
  value,
  error,
  onChange,
}: InputProps) {
  return (
    <div className="w-full flex flex-col items-start">
      <label htmlFor={label}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        id={label}
        type={type || "text"}
        className="w-full bg-white border border-light-gray-3 focus:border-dark-blue rounded-lg p-2 transition duration-200 outline-none"
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
