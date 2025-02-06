import "../../style/TheHomePage/font.css";
import Backgroundimage5 from "../../assets/TheHomePage/image/bg5.svg";
import Backgroundimage5_M from "../../assets/TheHomePage/image/bg5_m.svg"
import CoFounderImage from "../../assets/TheHomePage/image/co-founder.svg"
import CofounderTab from "./elements/desktop/CofounderTab";
export default function HomeSectionFive() {
  return (
    <div className="flex justify-center items-center w-full lg:h-[736px] h-[600px] relative">
      <div className="absolute top-0 left-0 -z-50 w-full  h-full bg-dark"></div>
      <div className="lg:flex absolute left-0 bottom-0 z-10 hidden">
        <img src={Backgroundimage5} alt="" />
      </div>
      <div className=" lg:hidden absolute left-0 bottom-0 z-10">
        <img src={Backgroundimage5_M} alt="" />
      </div>
      <div className="absolute w-full px-8 sm:px-12 md:px-20 lg:px-28 xl:px-36 2xl:px-48 flex justify-center items-center z-30 flex-col gap-8">
        <img
          src={CoFounderImage}
          alt=""
          className="lg:w-[10%] md:w-[25%] w-[40%]"
        />
        <div className="xl:w-[60%] w-full flex flex-col justify-center items-center">
          <h1 className="font-kanit font-bold sm:text-[40px] text-[20px] text-center text-white">
            Je suis très heureux des resultats que Nous avons vécus cette annéee
            gràce à Hexapink.
          </h1>
        </div>
        <CofounderTab
          smallText="JONE DOE"
          bigText="CO-FOUNDER OF SMART AFRICA"
        />
      </div>
    </div>
  );
}
