import "../../style/TheHomePage/font.css";
import "../../style/TheHomePage/style.css";
// import Image from "next/image";
import Backgroundimage2 from "../../assets/TheHomePage/image/bg2.png";
import Backgroundimage2_M from "../../assets/TheHomePage/image/bg2_m.png";
export default function HomeSectionTwo() {
  return (
    <div className="relative flex justify-center items-center w-full lg:h-[550px] h-[600px]">
      <div className=" lg:flex absolute right-0 bottom-0 z-10 hidden">
        <img src={Backgroundimage2} alt="" className="ml-auto" />
      </div>
      <div className="lg:hidden absolute right-0 bottom-0 z-10">
        <img src={Backgroundimage2_M} alt="" />
      </div>
      <div className="absolute w-[80%] flex justify-start items-center top-20 z-20">
        <div className="lg:w-[50%] w-[80%] flex flex-col justify-start items-center gap-5">
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
