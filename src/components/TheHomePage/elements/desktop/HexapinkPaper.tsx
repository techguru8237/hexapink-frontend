import React from "react";
// import Image, { StaticImageData } from "next/image";
import "../../../../style/TheHomePage/style.css";
interface HexapinkPaperProps {
  topImage: string;
  bottomImage: string;
  desktopButtons: React.ReactNode;
  mobileButtons: React.ReactNode;
  text: string;
}
const HexapinkPaper: React.FC<HexapinkPaperProps> = ({
  topImage,
  bottomImage,
  desktopButtons,
  mobileButtons,
  text

}) => {
  return (
    <div className="relative bg-[#FFE5EE] rounded-[10px] lg:min-w-[60%] lg:max-w-[60%] w-[90%] lg:h-auto h-[500px] pt-[3%] lg:pb-[15%] pb-[20%] px-[7%] flex flex-col justify-start items-start gap-6 overflow-hidden">
      <div className="sm:w-[10%] w-[20px] sm:h-auto h-auto">
        <img src={topImage} alt="" className=" select-none"/>
      </div>
      <div className=" absolute  lg:-right-[25%] lg:bottom-0 -right-[10%] bottom-0 w-[60%]">
        <img src={bottomImage} alt="" className="select-none lg:w-[60%] w-[90%]"/>
      </div>
      <h1 className=" font-[kanit-bold] lg:text-[40px] text-[24px] lg:w-[80%] w-[90%] select-none">
        {text}
      </h1>
      <div className="xl:flex justify-start items-end gap-5 absolute z-10 xl:bottom-[10%] bottom-[40%] hidden">
        {desktopButtons}
      </div>
      <div className="flex justify-start items-end gap-5 absolute z-10 xl:bottom-[10%] bottom-[40%] xl:hidden">
        {mobileButtons}
      </div>
    </div>
  );
};

export default HexapinkPaper;
