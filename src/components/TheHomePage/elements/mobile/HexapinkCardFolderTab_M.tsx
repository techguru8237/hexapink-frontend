import React from "react";
import "../../../../style/TheHomePage/font.css";
interface HexapinkCardFolderTabProps {
    text: string; 
}
const HexapinkCardFolderTab_M: React.FC<HexapinkCardFolderTabProps> = ({ text }) =>  {
  return (
    <div className="w-[98px] h-[40px] bg-[#FFCCDD] hexapink-card-foldertab font-[raleway-medium] flex justify-center items-center gap-2">
      {" "}
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <g clipPath="url(#clip0_327_9)">
          <path
            d="M2.5 16.25V5C2.5 4.83424 2.56585 4.67527 2.68306 4.55806C2.80027 4.44085 2.95924 4.375 3.125 4.375H7.29141C7.42664 4.375 7.55822 4.41886 7.66641 4.5L10 6.25H15.625C15.7908 6.25 15.9497 6.31585 16.0669 6.43306C16.1842 6.55027 16.25 6.70924 16.25 6.875V8.75"
            stroke="#333333"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.5 16.25L4.85781 9.17734C4.8993 9.05289 4.97889 8.94465 5.08532 8.86796C5.19174 8.79126 5.3196 8.74999 5.45078 8.75H18.125C18.224 8.74999 18.3217 8.77352 18.4098 8.81865C18.498 8.86377 18.5742 8.9292 18.6321 9.00954C18.69 9.08989 18.728 9.18284 18.7429 9.28074C18.7578 9.37865 18.7493 9.4787 18.718 9.57266L16.4914 16.25H2.5Z"
            stroke="#333333"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_327_9">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <span>{text}</span>
    </div>
  );
}
export default HexapinkCardFolderTab_M;
