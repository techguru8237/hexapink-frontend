import React, { useRef } from "react";
import HexapinkCard from "./elements/desktop/HexapinkCard";
import HexapinkCard_M from "./elements/mobile/HexapinkCard_M";
import MaisonsImg from "../../assets/TheHomePage/image/img_maisons.png";
import VoyagesImg from "../../assets/TheHomePage/image/img_voyages.png";
import MaisonImg from "../../assets/TheHomePage/image/img_maison.png";
import HPImg from "../../assets/TheHomePage/image/HP.png";
import ImageHexaM from "../../assets/TheHomePage/image/image_hexa_m.png";

export default function HomeSectionSeven() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  let isDown = false;
  let startX: number;
  let scrollLeft: number;

  const handleMouseDown = (e: React.MouseEvent) => {
    isDown = true;
    startX = e.pageX - scrollContainerRef.current!.offsetLeft;
    scrollLeft = scrollContainerRef.current!.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
  };

  const handleMouseUp = () => {
    isDown = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current!.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast
    scrollContainerRef.current!.scrollLeft = scrollLeft - walk;
  };
  return (
    <div className="flex flex-col justify-start items-center m-[5%] w-[90%]">
      <div className="flex w-[90%] justify-start items-center">
        <div className=" flex flex-col justify-start items-start lg:w-[50%] w-[80%] h-[100%]">
          <h1 className="lg:text-[40px] text-[24px] font-[kanit-bold]">
            Recommended Collections
          </h1>
          <p className="lg:text-[20px] text-[12px] font-[raleway-medium] text-[#666666]">
            If you have a specific need in mind, sent an email to
            Contact@hexapink.com
          </p>
        </div>
      </div>
      <div
        className="lg:flex justify-start items-center gap-5 min-w-[95%] max-w-[95%] min-h-[350px] overflow-x-auto scrollbar-hide hidden"
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <HexapinkCard
          img_1={MaisonsImg}
          img_2={HPImg}
          location="FRANCE"
          folder="B2B"
        />
        <HexapinkCard
          img_1={VoyagesImg}
          img_2={HPImg}
          location="FRANCE"
          folder="B2C"
        />
        <HexapinkCard
          img_1={MaisonImg}
          img_2={HPImg}
          location="BELGIQUE"
          folder="B2B"
        />
        <HexapinkCard
          img_1={MaisonsImg}
          img_2={HPImg}
          location="BELGIQUE"
          folder="B2C"
        />
      </div>
      <div className="flex justify-center items-center w-[90%] flex-col lg:hidden">
        <div className="flex justify-center items-center w-full">
          <HexapinkCard_M
            img_1={ImageHexaM}
            img_2={HPImg}
            location="FRANCE"
            folder="B2C"
          />
        </div>
        <div className="flex justify-center items-center w-full">
          <HexapinkCard_M
            img_1={ImageHexaM}
            img_2={HPImg}
            location="FRANCE"
            folder="B2C"
          />
        </div>
        <div className="flex justify-center items-center w-full">
          <HexapinkCard_M
            img_1={ImageHexaM}
            img_2={HPImg}
            location="FRANCE"
            folder="B2C"
          />
        </div>
      </div>
    </div>
  );
}
