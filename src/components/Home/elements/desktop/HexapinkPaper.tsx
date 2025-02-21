import React from "react";
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
    <div className="w-full lg:min-w-[60%] lg:max-w-[60%] lg:h-auto min-h-[500px] max-h-[500px] relative bg-[#FFE5EE] rounded-[10px] p-8 flex flex-col justify-start items-start gap-6 overflow-hidden">
      <div className="sm:w-[10%] w-[20px] sm:h-auto h-auto">
        <img src={topImage} alt="" className=" select-none"/>
      </div>
      <div className="absolute  lg:-right-[25%] lg:bottom-0 -right-[10%] bottom-0 w-[60%]">
        <img src={bottomImage} alt="" className="select-none lg:w-[60%] w-[90%]"/>
      </div>
      <h1 className="text-left font-kanit font-bold text-2xl lg:text-3xl xl:text-4xl text-dark lg:w-[80%] w-[90%] select-none">
        {text}
      </h1>
      <div className="xl:flex justify-start items-end gap-5 absolute z-10 bottom-[40%] xl:bottom-[15%] hidden">
        {desktopButtons}
      </div>
      <div className="flex justify-start items-end gap-5 absolute z-10 bottom-[30%] md:bottom-[20%] lg:bottom-[15%] xl:hidden">
        {mobileButtons}
      </div>
    </div>
  );
};

export default HexapinkPaper;
