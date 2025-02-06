import React from "react";
import "../../../../style/TheHomePage/font.css";
import "../../../../style/TheHomePage/style.css";
interface CofounderTabProps {
  smallText: string;
  bigText: string;
}
const CofounderTab: React.FC<CofounderTabProps> = ({ smallText, bigText }) => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative">
        <div className="bg-[#262626] sm:w-[120px] sm:h-[40px] w-[100px] h-[30px] cofoundertab-small-clip  font-[raleway-medium] flex justify-center items-center text-[#FFCCDD] sm:text-[16px] text-[12px] absolute sm:-left-[200px] -left-[150px] top-0 z-20">
          <span>{smallText}</span>
        </div>
        <div className="bg-[#262626] sm:w-[420px] sm:h-[40px] w-[320px] h-[30px] cofoundertab-big-clip  flex justify-center items-center absolute sm:-left-[200px] -left-[150px] top-0 z-0"></div>
        <div className="bg-dark sm:w-[418px] sm:h-[38px] w-[318px] h-[28px] cofoundertab-big-clip  flex justify-center items-center absolute sm:-left-[199px] -left-[149px] top-[1px] z-10"></div>
        <div className=" absolute font-[raleway-medium] text-[#FFCCDD] sm:text-[16px] text-[12px] sm:w-[400px] w-[350px]  z-10 -left-[120px] sm:-left-[140px] sm:top-[8px] top-[5px]">
          {bigText}
        </div>
      </div>
    </div>
  );
};
export default CofounderTab;
