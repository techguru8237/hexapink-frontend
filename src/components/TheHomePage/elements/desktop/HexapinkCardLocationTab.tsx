import React from "react";
import "../../../../style/TheHomePage/font.css";
interface HexapinkCardLocationTabProps {
  text: string; 
}
const HexapinkCardLocationTab: React.FC<HexapinkCardLocationTabProps> = ({ text }) =>  {
  return (
    <div className="w-[225px] h-[40px] bg-[#FFE5EE] hexapink-card-locationtab font-[raleway-medium] flex justify-end items-center gap-2">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <g clipPath="url(#clip0_43_903)">
          <path
            d="M10 10.625C11.3807 10.625 12.5 9.50571 12.5 8.125C12.5 6.74429 11.3807 5.625 10 5.625C8.61929 5.625 7.5 6.74429 7.5 8.125C7.5 9.50571 8.61929 10.625 10 10.625Z"
            stroke="#333333"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.25 8.125C16.25 13.75 10 18.125 10 18.125C10 18.125 3.75 13.75 3.75 8.125C3.75 6.4674 4.40848 4.87769 5.58058 3.70558C6.75269 2.53348 8.3424 1.875 10 1.875C11.6576 1.875 13.2473 2.53348 14.4194 3.70558C15.5915 4.87769 16.25 6.4674 16.25 8.125Z"
            stroke="#333333"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_43_903">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <span>{text}</span>
    </div>
  );
}

export default HexapinkCardLocationTab;
