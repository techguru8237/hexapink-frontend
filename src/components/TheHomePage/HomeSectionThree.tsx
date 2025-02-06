import slashImg from '../../assets/TheHomePage/image/line.svg'
import Backgroundimage3 from "../../assets/TheHomePage/image/bg3.svg";
import Backgroundimage3_M from "../../assets/TheHomePage/image/bg3_m.svg";
import "../../style/TheHomePage/font.css";

export default function HomeSectionTwo() {
  return (
    <div className="flex justify-center items-center w-full lg:h-[550px] h-[700px] relative">
      <div className="absolute top-0 left-0 -z-50 w-full h-full bg-light-pink sm:bg-[#FFF5F8] opacity-50"></div>
      <div className="lg:flex absolute left-0 bottom-0 z-10 hidden">
        <img src={Backgroundimage3} alt="" />
      </div>
      <div className="lg:hidden absolute left-0 bottom-0 z-10">
        <img src={Backgroundimage3_M} alt="" />
      </div>
      <div className="absolute w-full px-8 sm:px-12 md:px-20 lg:px-28 xl:px-36 2xl:px-48 flex justify-end items-center top-24 lg:top-20 z-30">
        <div className="w-[80%] lg:w-[60%] flex flex-col justify-center items-end sm:items-start gap-2 sm:gap-8">
          <img src={slashImg} alt="slash image"/>
          <h1 className="text-right sm:text-left font-kanit font-bold text-2xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl text-dark">
            Hexapink helps you find the leads you need in few clicks
          </h1>
          <p className="text-right sm:text-left font-raleway font-medium lg:text-xl text-sm text-light-dark">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </p>
        </div>
      </div>
    </div>
  );
}
