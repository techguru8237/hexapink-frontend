interface InputProps {
  label: string;
  value: string;
  error: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input ({ label, value, error, onChange }: InputProps) {
  return (
    <div className="w-full flex flex-col items-start gap-2">
      <label htmlFor="input">{label}</label>
      <input
        value={value}
        onChange={onChange}
        id="input"
        type="text"
        className="w-full bg-white border border-light-gray3 focus:border-dark-blue rounded-lg p-2"
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}


