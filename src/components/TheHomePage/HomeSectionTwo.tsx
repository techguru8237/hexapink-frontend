import slashImg from '../../assets/TheHomePage/image/line.svg'
import Backgroundimage2 from "../../assets/TheHomePage/image/bg2.svg";
import Backgroundimage2_M from "../../assets/TheHomePage/image/bg2_m.svg";
import "../../style/TheHomePage/font.css";
import "../../style/TheHomePage/style.css";

export default function HomeSectionTwo() {
  return (
    <div className="relative flex justify-center items-center w-full lg:h-[550px] h-[550px]">
      <div className="lg:flex absolute right-0 bottom-0 z-10 hidden">
        <img src={Backgroundimage2} alt="" className="ml-auto" />
      </div>
      <div className="lg:hidden absolute right-0 -bottom-[70px] z-10">
        <img src={Backgroundimage2_M} alt="" />
      </div>
      <div className="absolute w-full px-8 sm:px-12 md:px-20 lg:px-28 xl:px-36 2xl:px-48 flex justify-start items-center top-20 z-20">
        <div className="lg:w-[50%] w-[80%] flex flex-col justify-start items-center gap-2 sm:gap-8">
          <img src={slashImg} alt="slash image" className='mr-auto' />
          <h1 className="font-kanit font-bold text-2xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl text-left text-dark">
            Hexapink helps you find the leads you need in few clicks
          </h1>
          <p className="font-raleway font-medium lg:text-xl text-sm text-left text-light-dark">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </p>
        </div>
      </div>
    </div>
  );
}
