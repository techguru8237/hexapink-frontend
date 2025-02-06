import React from "react";
interface InputFieldProps {
  title: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputField: React.FC<InputFieldProps> = ({
  type,
  title,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="w-full">
      <div className="relative mt-2 w-full flex flex-col items-start focus-within:text-pink">
        <label
          htmlFor="name"
          className="text-[14px] font-raleway font-semibold] transition-colors peer-focus:text-pink-500 tracking-wider"
        >
          {title}
        </label>
        <input
          id={title}
          name={title}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e)}
          className="peer block w-full bg-transparent border-b focus:border-pink p-2 text-gray-900 placeholder:text-gray-500 focus:outline-none sm:text-[16px] font-raleway font-medium tracking-wider"
        />
        {/* <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-pink-500"
        /> */}
      </div>
    </div>
  );
};

export default InputField;
