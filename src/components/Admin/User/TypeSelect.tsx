import { IoMdRadioButtonOn } from "react-icons/io";

interface TypeSelectProps {
  items: string[];
  selectedItem: string;
  disabled: boolean;
  onChange: (item: string) => void;
}

export default function TypeSelect({
  items,
  selectedItem,
  disabled,
  onChange,
}: TypeSelectProps) {
  return (
    <div className="max-w-3xl bg-white border border-light-gray-1 rounded-lg flex flex-col text-dark">
      <div className="p-4 border-b border-dashed border-light-gray-1 text-left font-raleway font-bold">
        Type
      </div>

      <div className="flex flex-wrap p-4 gap-2">
        {items.map((item) => (
          <button
            key={item}
            className={`flex items-center gap-2 px-2 py-1 rounded-full border border-light-gray-3 cursor-pointer ${
              selectedItem === item ? "text-dark-blue" : "text-dark"
            }`}
            disabled={disabled}
            onClick={() => onChange(item)}
          >
            <IoMdRadioButtonOn
              className={`${
                selectedItem === item ? "text-dark-blue" : "text-light-gray-3"
              }`}
            />
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
