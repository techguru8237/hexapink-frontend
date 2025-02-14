interface SwitchButtonProps {
  value: boolean;
  onChange: () => void
}

export default function SwitchButton({value, onChange}: SwitchButtonProps) {
  return (
    <div
      onClick={onChange}
      className={`flex items-center ${
        value ? "justify-start border-dark-blue" : "justify-end border-light-gray-3"
      } h-5 w-10 min-w-8 px-1 border rounded-full cursor-pointer`}
    >
      <div className={`w-3 h-3 rounded-full ${value ? "bg-dark-blue" : "bg-light-gray-3"}`}></div>
    </div>
  );
}
