interface TextAreaProps {
  label: string;
  placeholder: string;
  value: string;
  error: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea({ label, placeholder, value, error, onChange }: TextAreaProps) {
  return (
    <div className="w-full h-full flex flex-col items-start">
      <label htmlFor={label}>{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        id={label}
        className="w-full h-full min-h-16 bg-white border border-light-gray3 focus:border-dark-blue rounded-lg p-2 transition duration-200 outline-none"
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
