// import Image from "next/image";
import Pattern from "../../assets/TheHomePage/image/pattern.png";
import BottomLogo from "../../assets/TheHomePage/image/bottom-logo.png";
import Phone from "../../assets/TheHomePage/image/phone.png";
import Email from "../../assets/TheHomePage/image/email.png";
import Location from "../../assets/TheHomePage/image/location.png";
import "../../style/TheHomePage/style.css";
import CustomFileButton_B from "./elements/desktop/CustomFileButton_B";
import InputField from "./elements/desktop/InputField";
import CheckBox from "./elements/desktop/CheckBox";
import SendMessageButton from "./elements/desktop/SendMessageButton";

export default function HomeSectionNine() {
  const handleCustomFile = () => {
    alert("Make Custome File Button Clicked");
  };
  return (
    <div className="relative w-full flex justify-center items-center bg-[#FFF5F8] h-[1500px] md:h-[1600px] lg:h-[1600px]">
      <div className="w-full h-full bg-[#FF6699] z-0">
        <img src={Pattern} alt="" className="w-full" />
      </div>
      <div className="absolute lg:top-20 top-0 lg:left-[25%] left-[7%] lg:w-[50%] w-[90%] flex justify-start items-start flex-col">
        <h1 className="font-[kanit-bold] lg:text-[56px] text-[28px] select-none">
          You have a specific leads in mind? Create your Custom File Now!
        </h1>
        <div className="w-full justify-center items-center z-10">
          <CustomFileButton_B onClick={handleCustomFile}>
            <span>Make My Custom File</span>
          </CustomFileButton_B>
        </div>
      </div>
      <div className="absolute lg:top-[30%] top:[20%] lg:w-[50%] w-[90%] lg:h-[60%] h-[65%] lg:talkus-paper-clip bg-white flex justify-start items-start flex-col p-[5%] gap-5 ">
        <h1 className="lg:text-[40px] text-[24px] font-[kanit-semibold] lg:w-[60%] w-[80%]">
          Are you interested? Let&apos;s talk Business
        </h1>
        <p className="text-[#666666] font-[raleway-medium] text-[20px]">
          Fill this form or send an email to Contact@hexapink.com
        </p>
        <div className="w-full flex justify-between items-center mt-12 lg:flex-row flex-col gap-10">
          <InputField type="text" title="FIRST NAME *" placeholder="Jaune" />
          <InputField type="text" title="LAST NAME *" placeholder="Though" />
        </div>
        <div className="w-full flex justify-between items-center mt-12 lg:flex-row flex-col gap-10">
          <InputField
            type="email"
            title="EMAIL *"
            placeholder="jaune.though@earth.planet"
          />
          <InputField type="text" title="PHONE" placeholder="+18" />
        </div>
        <div className="w-full flex justify-between items-center mt-12 lg:flex-row flex-col gap-10">
          <InputField type="text" title="COMPANY" placeholder="Life" />
          <InputField
            type="text"
            title="MESSAGE *"
            placeholder="to be or not to be"
          />
        </div>
        <CheckBox text="I agree to receive emails from Hexapink *" />
        <div className="mt-5 w-full justify-start items-center z-10">
          <SendMessageButton
            onClick={() => alert("Send Message Button Clicked")}
          >
            <span>Send Message</span>{" "}
          </SendMessageButton>
        </div>
        <div className="lg:hidden w-full mt-5 flex justify-center items-center border-b border-[white] pb-4">
          <div className="flex flex-row gap-5 justify-center items-center w-full">
            <img src={Phone} alt="" className="w-[12%]"/>
            <img src={Email} alt="" className="w-[12%]"/>
            <img src={Location} alt="" className="w-[12%]"/>
          </div>
        </div>
      </div>
      <div className="absolute top-[30%] left-[20%] hidden lg:block">
        <div className="flex flex-col gap-5 justify-center items-center">
          <img src={Phone} alt="" />
          <img src={Email} alt="" />
          <img src={Location} alt="" />
        </div>
      </div>
      <div className="absolute lg:bottom-[4%] bottom-[3%] w-full flex justify-center items-center mt-5">
        <h1 className="text-white font-[raleway-medium] lg:text-[20px] text-[14px] text-center">
          Copyrights Hexapink 2024 - All Rights Reserved
        </h1>
      </div>
      <div className="absolute lg:bottom-[5%] lg:right-[5%] right-[30%] bottom-[5%] lg:w-[10%] w-[40%]">
        <img src={BottomLogo} alt="" />
      </div>
    </div>
  );
}
