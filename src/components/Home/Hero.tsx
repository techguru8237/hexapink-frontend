import "../../style/TheHomePage/font.css";
import CustomFileButton from "./elements/desktop/CustomFileButton";
import HexapinkCard from "./elements/desktop/HexapinkCard";
import HexapinkCard_M from "./elements/mobile/HexapinkCard_M";
import MaisonsImg from "../../assets/TheHomePage/image/img_maisons.svg";
import VoyagesImg from "../../assets/TheHomePage/image/img_voyages.svg";
import MaisonImg from "../../assets/TheHomePage/image/img_maison.svg";
import HPImage from "../../assets/TheHomePage/image/HP.svg";
import ImageHexaM from "../../assets/TheHomePage/image/image_hexa_m.svg";
import CustomFileButton_M from "./elements/mobile/CustomFileButton_M";

export default function Hero() {
  const handleCustomFileButton = () => {
    alert("Make Custome File Button Clicked");
  };

  return (
    <div className="w-full px-8 sm:px-12 md:px-20 lg:px-28 xl:px-36 2xl:px-48 py-8 flex flex-col items-center lg:flex-row gap-12 relative">
      <div className="w-full lg:w-1/2 flex flex-col items-start justify-center gap-8">
        <h1 className="font-kanit font-bold text-left text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-pattern">
          <span className="text-dark/80">Think Data,</span>
          <br />
          <span className="text-dark/80">Think</span>&nbsp;
          <span className="text-pink/80">Hexapink</span>
        </h1>

        <p className="text-left font-raleway font-medium text-md sm:text-xl text-light-dark">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </p>
        <div className="hidden lg:flex lg:justify-start justify-center items-start">
          <CustomFileButton onClick={handleCustomFileButton} active={true}>
            Make My Custom File
          </CustomFileButton>
        </div>
        <div className="flex lg:hidden lg:justify-start justify-center items-start">
          <CustomFileButton_M onClick={handleCustomFileButton}>
            Make My Custom File
          </CustomFileButton_M>
        </div>
      </div>

      <div className="w-1/2 py-12 lg:flex flex-col gap-12 min-h-[700px] max-h-[700px] overflow-y-auto scrollbar-hide hidden">
        <div className="w-full flex justify-end">
          <HexapinkCard
            img_1={MaisonsImg}
            img_2={HPImage}
            location={"FRANCE"}
            folder={"B2C"}
          />
        </div>
        <div className="w-full flex justify-center">
          <HexapinkCard
            img_1={VoyagesImg}
            img_2={HPImage}
            location={"BELGIQUE"}
            folder={"B2B"}
          />
        </div>
        <div className="w-full flex justify-start">
          <HexapinkCard
            img_1={MaisonImg}
            img_2={HPImage}
            location={"FRANCE"}
            folder={"B2B"}
          />
        </div>
      </div>

      <div className="w-full mt-12 flex flex-col justify-center items-center gap-12 lg:hidden z-10">
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
