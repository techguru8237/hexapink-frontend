import "../../style/TheHomePage/font.css";
// import Image from "next/image";
import Backgroundimage3 from "../../assets/TheHomePage/image/bg3.png";
import Backgroundimage3_M from "../../assets/TheHomePage/image/bg3_m.png";
export default function HomeSectionTwo() {
  return (
    <div className="flex justify-center items-center w-full lg:h-[550px] h-[600px] relative">
      <div className="absolute top-0 left-0 -z-50 w-full h-full bg-[#FFF5F8] opacity-50"></div>
      <div className="lg:flex absolute left-0 bottom-0 z-10 hidden">
        <img src={Backgroundimage3} alt="" />
      </div>
      <div className="lg:hidden absolute left-0 bottom-0 z-10">
        <img src={Backgroundimage3_M} alt="" />
      </div>
      <div className="absolute w-[80%] flex justify-end items-center top-20 z-30">
        <div className="lg:w-[50%] w-[80%] flex flex-col justify-end items-center gap-5">
          <h1 className="font-[kanit-bold] lg:text-[40px] text-[24px]">
            Hexapink helps you find the leads you need in few clicks
          </h1>
          <p className="font-[raleway-medium] lg:text-xl text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </p>
        </div>
      </div>
    </div>
  );
}
