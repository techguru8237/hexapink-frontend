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
    <div className="lg:w-[300px] w-full">
      <div className="relative mt-2 w-full">
        <label
          htmlFor="name"
          className="absolute left-0 -top-6 text-[14px] font-[raleway-semibold] text-gray-900 transition-colors peer-focus:text-pink-500 tracking-wider"
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
          className="peer block w-full bg-transparent py-1.5 text-gray-900 placeholder:text-gray-500 focus:outline-none sm:text-[16px] font-raleway font-medium tracking-wider"
        />

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-pink-500"
        />
        {type == "password" && (
          <PiEyeLight
            onClick={() => setType("text")}
            className="absolute bottom-2 right-0 text-xl"
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
