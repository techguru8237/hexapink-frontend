import React from "react";
// import Image, {StaticImageData} from "next/image";

import "../../../../style/TheHomePage/font.css";
import HexapinkCardLocationTab from "./HexapinkCardLocationTab";
import HexapinkCardFolderTab from "./HexapinkCardFolderTab";
interface HexapinkCardProps {
  img_1: string;
  img_2: string;
  location: string;
  folder: string;
}
const HexapinkCard: React.FC<HexapinkCardProps> = ({img_1, img_2, location, folder}) => {
  return (
    <div className="min-w-[480px] min-h-[260px] max-w-[480px] max-h-[260px] m-8 rounded-2xl bg-[#FFE5EE] relative -z-20">
      <div className="absolute right-0 top-7 w-[20%] h-auto -z-10">
        <img src={img_1} alt="MaisonsImg" className=" select-none "/>
      </div>
      <div className="left-0 bottom-1 absolute w-[35%] h-auto -z-10">
        <img src={img_2} alt="Hp" className=" select-none"/>
      </div>
      <div className="flex flex-col justify-start items-center gap-3 w-[58%] h-full ml-7 mt-12">
        <h1 className="text-2xl font-[kanit-bold] text-[#333333] select-none">
          Propriétaires de Maisons
        </h1>
        <p className="text-sm font-[raleway-medium] text-[#666666] select-none">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </p>
      </div>
      <div className="absolute left-0 -top-[20px]">
        <HexapinkCardLocationTab text={location}/>
      </div>
      <div className="absolute left-0 -top-[20px]">
        <HexapinkCardFolderTab text={folder}/>
      </div>
    </div>
  );
}

export default HexapinkCard;
