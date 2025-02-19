interface SwitchButtonProps {
  value: boolean | undefined;
  onChange: () => void;
  disabled: boolean;
}

export default function SwitchButton({ value, onChange, disabled }: SwitchButtonProps) {
  return (
    <button
      onClick={onChange}
      disabled={disabled}
      className={`flex items-center ${
        value
          ? "justify-end border-dark-blue"
          : "justify-start border-light-gray-3"
      } h-5 w-10 min-w-8 px-1 border rounded-full cursor-pointer`}
    >
      <div
        className={`w-3 h-3 rounded-full ${
          value ? "bg-dark-blue" : "bg-light-gray-3"
        }`}
      ></div>
    </button>
  );
}
