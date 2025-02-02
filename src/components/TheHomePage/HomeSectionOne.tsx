import "../../style/TheHomePage/font.css";
import CustomFileButton from "./elements/desktop/CustomFileButton";
import HexapinkCard from "./elements/desktop/HexapinkCard";
import HexapinkCard_M from "./elements/mobile/HexapinkCard_M";
import MaisonsImg from "../../assets/TheHomePage/image/img_maisons.png";
import VoyagesImg from "../../assets/TheHomePage/image/img_voyages.png";
import MaisonImg from "../../assets/TheHomePage/image/img_maison.png";
import HPImage from "../../assets/TheHomePage/image/HP.png";
import ImageHexaM from "../../assets/TheHomePage/image/image_hexa_m.png"
export default function HomeSectionOne() {
  const handleCustomFileButton = () => {
    alert("Make Custome File Button Clicked");
  };
  return (
    <div className="w-full flex flex-col items-center lg:flex-row relative">
      {/* <div className="absolute top-0 left-0 -z-50 w-full h-[800px] bg-[#fff5f8] opacity-50"></div> */}
      <div className="sm:ml-[7%] flex flex-col justify-start items-left gap-0 lg:w-[40%] md:w-[60%] w-[80%] sm:mt-20 mt-16 lg:h-[700px] md:h-[600px]">
        <h1 className="font-[kanit-bold] sm:text-[64px] text-[32px]">
          Think Data,
        </h1>
        <h1 className="font-[kanit-bold] sm:text-[64px] text-[32px]">
          Think <span className="text-[#FF6699]">Hexapink</span>
        </h1>
        <p className="font-[raleway-medium] sm:text-[20px] text-[16px] w-full text-[#666666]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </p>
        <div className="flex lg:justify-start justify-center items-start ">
          <div className="flex justify-center items-center">
            <CustomFileButton onClick={handleCustomFileButton}>
              <span className=" font-[kanit-medium] sm:text-[12px] md:text-[16px] lg:text-[20px]">
                Make My Custom File
              </span>
            </CustomFileButton>
          </div>
        </div>
      </div>
      <div className="mr-[7%] lg:flex flex-col gap-5 min-h-[700px] max-h-[700px] xl:w-[60%] w-[80%] overflow-y-auto scrollbar-hide mt-24 hidden">
        <div className="flex justify-end items-center w-full">
          <HexapinkCard
            img_1={MaisonsImg}
            img_2={HPImage}
            location={"FRANCE"}
            folder={"B2C"}
          />
        </div>
        <div className="flex justify-center items-center w-full mr-8">
          <HexapinkCard
            img_1={VoyagesImg}
            img_2={HPImage}
            location={"BELGIQUE"}
            folder={"B2B"}
          />
        </div>
        <div className="flex justify-start items-center w-full mr-16">
          <HexapinkCard
            img_1={MaisonImg}
            img_2={HPImage}
            location={"FRANCE"}
            folder={"B2B"}
          />
        </div>
      </div>
      <div className="flex justify-center items-center w-[90%] flex-col lg:hidden z-10">
        <div className="flex justify-center items-center w-full">
          <HexapinkCard_M
            img_1={ImageHexaM}
            img_2={HPImage}
            location="FRANCE"
            folder="B2C"
          />
        </div>
        <div className="flex justify-center items-center w-full">
          <HexapinkCard_M
            img_1={ImageHexaM}
            img_2={HPImage}
            location="FRANCE"
            folder="B2C"
          />
        </div>
        <div className="flex justify-center items-center w-full">
          <HexapinkCard_M
            img_1={ImageHexaM}
            img_2={HPImage}
            location="FRANCE"
            folder="B2C"
          />
        </div>
      </div>
    </div>
  );
}
