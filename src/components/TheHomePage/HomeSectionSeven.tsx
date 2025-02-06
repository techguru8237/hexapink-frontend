import React, { useRef } from "react";
import HexapinkCard from "./elements/desktop/HexapinkCard";
import HexapinkCard_M from "./elements/mobile/HexapinkCard_M";
import MaisonsImg from "../../assets/TheHomePage/image/img_maisons.svg";
import VoyagesImg from "../../assets/TheHomePage/image/img_voyages.svg";
import MaisonImg from "../../assets/TheHomePage/image/img_maison.svg";
import HPImg from "../../assets/TheHomePage/image/HP.svg";
import ImageHexaM from "../../assets/TheHomePage/image/image_hexa_m.svg";

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
    <div className="px-8 sm:px-12 md:px-20 lg:px-28 xl:px-36 2xl:px-48 py-16 flex flex-col justify-start items-center">
      <div className="w-full flex justify-start items-center">
        <div className="flex flex-col justify-start items-start gap-4 lg:w-[50%] w-[80%] h-[100%]">
          <h1 className="text-left text-2xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl text-dark font-kanit font-bold">
            Recommended Collections
          </h1>
          <p className="text-left text-md lg:text-xl font-raleway font-medium text-light-dark">
            If you have a specific need in mind, sent an email to
            Contact@hexapink.com
          </p>
        </div>
      </div>
      <div
        className="w-full min-h-[350px] mt-8 lg:flex justify-start items-center gap-6 overflow-x-auto scrollbar-hide hidden"
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
      <div className="pt-12 flex justify-center items-center flex-col gap-12 lg:hidden">
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
