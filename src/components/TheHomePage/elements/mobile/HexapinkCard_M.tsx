import React from "react";
import "../../../../style/TheHomePage/font.css";
import HexapinkCardFolderTab_M from "./HexapinkCardFolderTab_M";
import HexapinkCardLocationTab_M from "./HexapinkCardLocationTab_M";
interface HexapinkCardProps {
  img_1: string;
  img_2: string;
  location: string;
  folder: string;
}
const HexapinkCard_M: React.FC<HexapinkCardProps> = ({img_1, img_2, location, folder,}) => {
  return (
    <div className="max-w-96 min-h-[360px] h-[360px] rounded-2xl bg-[#FFE5EE] relative -z-20">
      <div className="absolute bottom-0 right-0 w-full h-auto -z-10">
        <img
          src={img_1}
          alt="image-hexa-m"
          className="object-cover select-none w-full rounded-2xl"
        />
      </div>
      <div className="right-0 top-[30px] absolute w-[35%] h-auto -z-10">
        <img src={img_2} alt="Hp" className=" select-none" />
      </div>
      <div className="w-full h-full px-8 py-12 flex flex-col justify-start items-center gap-3">
        <h1 className="w-full text-left text-2xl font-kanit font-bold text-[#333333] select-none">
          Propriétaires de Maisons
        </h1>
        <p className="text-left text-sm font-raleway font-medium text-light-dark select-none">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </p>
      </div>
      <div className="absolute left-0 -top-[20px]">
        <HexapinkCardLocationTab_M text={location} />
      </div>
      <div className="absolute left-0 -top-[20px]">
        <HexapinkCardFolderTab_M text={folder} />
      </div>
    </div>
  );
};

export default HexapinkCard_M;
