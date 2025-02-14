import { IoMdRadioButtonOn } from "react-icons/io";

interface SelectionProps {
  label: string;
  items: string[];
  selectedItem: string;
  onChange: (item: string) => void;
}

export default function Selection({
  label,
  items,
  selectedItem,
  onChange,
}: SelectionProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor="" className="text-dark text-left">{label}</label>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <div
            key={item}
            className={`flex items-center gap-2 px-2 py-1 rounded-full border border-light-gray-3 cursor-pointer ${
              selectedItem === item ? "text-dark-blue" : "text-dark"
            }`}
            onClick={() => onChange(item)}
          >
            <IoMdRadioButtonOn
              className={`${
                selectedItem === item ? "text-dark-blue" : "text-light-gray-3"
              }`}
            />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
