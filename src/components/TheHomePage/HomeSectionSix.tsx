import React, { useRef } from "react";
import HexapinkPaper from "./elements/desktop/HexapinkPaper";
import OneTopImage from "../../assets/TheHomePage/image/one.png";
import TwoTopImage from "../../assets/TheHomePage/image/two.png";
import ThreeTopImage from "../../assets/TheHomePage/image/three.png";
import FourTopImage from "../../assets/TheHomePage/image/four.png";
import OneBottomImg from "../../assets/TheHomePage/image/paper-img-one.png";
import TwoBottomImg from "../../assets/TheHomePage/image/paper-img-two.png";
import ThreeBottomImg from "../../assets/TheHomePage/image/paper-img-three.png";
import FourBottomImg from "../../assets/TheHomePage/image/paper-img-four.png";
import HexapinkPaperOneButton from "./elements/desktop/HexapinkPaperOneButton";
import HexapinkPaperOneButton_M from "./elements/mobile/HexapinkPaperOneButton_M";
import HexapinkPaperTwoFrame from "./elements/desktop/HexapinkPaperTwoFrame";
import HexapinkPaperThreeCheckboxs from "./elements/desktop/HexapinkPaperThreeCheckboxs";
import HexapinkPaperFourCustomButton from "./elements/desktop/HexapinkPaperFourCustomButton";
import HexapinkPaperFourCustomButton_M from "./elements/mobile/HexapinkPaperFourCustomButton_M";
import "../../style/TheHomePage/font.css";

export default function HomeSectionSix() {
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
      className="flex xl:flex-row lg:justify-start lg:items-start flex-col justify-center items-center gap-5 lg:my-5 px-5 min-w-full max-w-full lg:overflow-x-auto scrollbar-hide  "
      ref={scrollContainerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div className="flex flex-col w-[80%] justify-start items-start lg:hidden mt-5">
        <div className="flex w-[70%] justify-start items-center">
          <h1 className="font-[kanit-bold] text-[24px]">
            Get what you want in easy steps
          </h1>
        </div>
        <div className="flex w-[90%] justify-start items-center">
          <p className="font-[raleway-medium] text-[12px] tracking-wider ">
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
