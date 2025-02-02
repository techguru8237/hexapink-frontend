import "../../style/TheHomePage/font.css";
import "../../style/TheHomePage/style.css";
// import Image from "next/image";
import Backgroundimage4 from "../../assets/TheHomePage/image/bg4.png";
import Backgroundimage4_M from "../../assets/TheHomePage/image/bg4_m.png";
import CustomFileButton from "./elements/desktop/CustomFileButton";
import CustomFileButton_M from "./elements/mobile/CustomFileButton_M";
export default function HomeSectionFour() {
  const handleCustomFileButton = () => {
    alert("Make Custome File Button Clicked");
  };
  return (
    <div className="relative flex justify-center items-center w-full lg:h-[550px] h-[600px] ">
      <div className="lg:flex absolute right-0 bottom-0 z-10 hidden">
        <img src={Backgroundimage4} alt="" className="ml-auto" />
      </div>
      <div className="lg:hidden absolute right-0 bottom-0 z-10">
        <img src={Backgroundimage4_M} alt="" /> 
      </div>
      <div className="absolute lg:-top-[63px] -top-[25px] z-20">
        <div className="lg:flex justify-center items-center hidden">
          <CustomFileButton onClick={handleCustomFileButton}>
            <span className=" font-[kanit-medium] text-[24px]">
              Make My Custom File
            </span>
          </CustomFileButton>
        </div>
        <div className="lg:hidden flex justify-center items-center">
          <CustomFileButton_M onClick={handleCustomFileButton}>
            <span className=" font-[kanit-medium]">Make My Custom File</span>
          </CustomFileButton_M>
        </div>
      </div>
      <div className="absolute w-[80%] flex justify-start items-center z-20  top-20">
        <div className="lg:w-[50%] w-[80%] flex flex-col justify-start items-center gap-5">
          <h1 className="font-[kanit-bold] lg:text-[40px] text-[24px]">
            Hexapink helps you find the leads you need in few clicks
          </h1>
          <p className="font-[raleway-medium] lg:text-xl text-[14px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </p>
        </div>
      </div>
    </div>
  );
}
