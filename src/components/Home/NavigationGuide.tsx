import React, { useRef } from "react";
import HexapinkPaper from "./elements/desktop/HexapinkPaper";
import OneTopImage from "../../assets/TheHomePage/image/one.svg";
import TwoTopImage from "../../assets/TheHomePage/image/two.svg";
import ThreeTopImage from "../../assets/TheHomePage/image/three.svg";
import FourTopImage from "../../assets/TheHomePage/image/four.svg";
import OneBottomImg from "../../assets/TheHomePage/image/paper-img-one.svg";
import TwoBottomImg from "../../assets/TheHomePage/image/paper-img-two.svg";
import ThreeBottomImg from "../../assets/TheHomePage/image/paper-img-three.svg";
import FourBottomImg from "../../assets/TheHomePage/image/paper-img-four.svg";
import HexapinkPaperOneButton from "./elements/desktop/HexapinkPaperOneButton";
import HexapinkPaperOneButton_M from "./elements/mobile/HexapinkPaperOneButton_M";
import HexapinkPaperTwoFrame from "./elements/desktop/HexapinkPaperTwoFrame";
import HexapinkPaperThreeCheckboxs from "./elements/desktop/HexapinkPaperThreeCheckboxs";
import HexapinkPaperFourCustomButton from "./elements/desktop/HexapinkPaperFourCustomButton";
import HexapinkPaperFourCustomButton_M from "./elements/mobile/HexapinkPaperFourCustomButton_M";
import "../../style/TheHomePage/font.css";

export default function NavigationGuide() {
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
    <div
      className="w-full px-8 sm:px-12 md:px-20 lg:px-28 xl:px-36 2xl:px-48 py-8 flex lg:flex-row lg:justify-start lg:items-start flex-col justify-center items-center gap-6 lg:my-5 min-w-full max-w-full lg:overflow-x-auto scrollbar-hide"
      ref={scrollContainerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div className="flex flex-col justify-start items-start gap-2 sm:gap-4 lg:hidden mt-6">
        <div className="flex justify-start items-center">
          <h1 className="text-left font-kanit font-bold text-2xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl text-dark">
            Get what you want in easy steps
          </h1>
        </div>
        <div className="flex justify-start items-center">
          <p className="font-raleway font-medium text-sm sm:text-xl text-left tracking-wider text-light-dark">
            If you have a specific need in mind? sent an email to &nbsp;{" "}
            <a href="" className="border-b border-[#333333]">
              Contact@hexapink.com
            </a>
          </p>
        </div>
      </div>
      <HexapinkPaper
        topImage={OneTopImage}
        bottomImage={OneBottomImg}
        desktopButtons={<HexapinkPaperOneButton />}
        mobileButtons={<HexapinkPaperOneButton_M />}
        text={"Create your Account or Log in if you have one Already"}
      />
      <HexapinkPaper
        topImage={TwoTopImage}
        bottomImage={TwoBottomImg}
        desktopButtons={<HexapinkPaperTwoFrame />}
        mobileButtons={<HexapinkPaperTwoFrame />}
        text={"Choose A Collection and Create your Custom File"}
      />
      <HexapinkPaper
        topImage={ThreeTopImage}
        bottomImage={ThreeBottomImg}
        desktopButtons={<HexapinkPaperThreeCheckboxs />}
        mobileButtons={<HexapinkPaperThreeCheckboxs />}
        text={"Choose your favorite method and Complete Payment"}
      />
      <HexapinkPaper
        topImage={FourTopImage}
        bottomImage={FourBottomImg}
        desktopButtons={<HexapinkPaperFourCustomButton />}
        mobileButtons={<HexapinkPaperFourCustomButton_M />}
        text={"Download from the cloud whenever you want"}
      />
    </div>
  );
}
