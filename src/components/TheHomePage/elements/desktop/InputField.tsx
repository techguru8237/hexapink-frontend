import React from "react";
interface InputFieldProps {
  title: string;
  placeholder: string;
  type: string;
}
const InputField: React.FC<InputFieldProps> = ({
  type,
  title,
  placeholder,
}) => {
  return (
    <div className="relative mt-2 w-full focus-within:text-pink">
      <input
        id="name"
        name="name"
        type={type}
        placeholder={placeholder}
        className="peer block w-full bg-transparent border-b focus-within:border-pink py-1.5 text-gray-900 placeholder:text-gray-500 focus:outline-none sm:text-[16px] font-raleway font-medium"
      />
      <label
        htmlFor="name"
        className="absolute left-0 -top-6 text-[14px] font-raleway font-semibold transition-colors peer-focus:text-pink-500"
      >
        {title}
      </label>
    </div>
  );
};

export default InputField;
