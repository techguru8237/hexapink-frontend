import React, { useState } from "react";
import { PiEyeLight, PiEyeSlash  } from "react-icons/pi";

interface PasswordFieldProps {
  title: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const PasswordField: React.FC<PasswordFieldProps> = ({
  title,
  placeholder,
  value,
  onChange,
}) => {
  const [type, setType] = useState<string>("password");
  return (
    <div className="w-full">
      <div className="relative mt-2 w-full flex flex-col items-start focus-within:text-pink">
        <label
          htmlFor="name"
          className="text-[14px] font-raleway font-semibold transition-colors peer-focus:text-pink-500 tracking-wider"
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
          className="peer block w-full bg-transparent p-2 text-gray-900 placeholder:text-gray-500 focus:outline-none sm:text-[16px] font-raleway font-medium tracking-wider border-b focus:border-pink"
        />
        {type == "password" && (
          <PiEyeLight
            onClick={() => setType("text")}
            className="absolute bottom-2 right-2 text-xl"
          />
        )}
        {type == "text" && (
          <PiEyeSlash
            onClick={() => setType("password")}
            className="absolute bottom-2 right-0 text-xl"
          />
        )}
      </div>
    </div>
  );
};

export default PasswordField;
