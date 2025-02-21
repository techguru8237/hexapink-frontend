import Pattern from "../../assets/TheHomePage/image/pattern.png";
import BottomLogo from "../../assets/TheHomePage/image/footer-logo.svg";
import Phone from "../../assets/TheHomePage/image/phone.svg";
import Email from "../../assets/TheHomePage/image/email.svg";
import Location from "../../assets/TheHomePage/image/location.svg";
import "../../style/TheHomePage/style.css";
import CustomFileButton_B from "./elements/desktop/CustomFileButton_B";
import InputField from "./elements/desktop/InputField";
import CheckBox from "./elements/desktop/CheckBox";
import SendMessageButton from "./elements/desktop/SendMessageButton";
import SendMessageButtonMobile from "./elements/desktop/SendMessageButtonMobile";

export default function ContactUs() {
  const handleCustomFile = () => {
    alert("Make Custome File Button Clicked");
  };
  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center bg-[#FF6699]">
      <div className="w-full h-full absolute top-0 left-0 z-0">
        <img
          src={Pattern}
          alt=""
          className="w-full xl:h-full object-cover object-top"
        />
      </div>
      <div className="w-full my-12 lg:mt-64 px-8 sm:px-12 md:px-20 lg:px-28 xl:px-36 2xl:px-48 z-10">
        <div className="w-full sm:w-4/5 xl:w-3/4 mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-left lg:text-center font-kanit font-bold text-2xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl text-dark select-none">
              Do you have a specific leads in mind? Create your Custom File Now!
            </h1>
            <div className="w-full justify-center items-center z-10">
              <CustomFileButton_B onClick={handleCustomFile}>
                <span>Make My Custom File</span>
              </CustomFileButton_B>
            </div>
          </div>

          <div className="w-full flex flex-col items-cemter lg:items-start lg:flex-row-reverse gap-[51px]">
            <div className="w-full bg-white p-8 md:p-12 xl:p-16 flex flex-col gap-8 sm:gap-12 md:gap-16 xl:gap-20">
              <h1 className="text-left text-dark lg:text-[40px] text-[24px] font-kanit font-semibold">
                Are you interested? Let&apos;s talk Business
              </h1>
              <p className="text-left text-light-dark font-raleway font-medium text-sm lg:text-md xl:text-lg">
                Fill this form or send an email to Contact@hexapink.com
              </p>

              <form className="flex flex-col gap-16">
                <div className="w-full flex justify-between lg:flex-row flex-col gap-10">
                  <InputField
                    type="text"
                    title="FIRST NAME *"
                    placeholder="Jaune"
                  />
                  <InputField
                    type="text"
                    title="LAST NAME *"
                    placeholder="Though"
                  />
                </div>
                <div className="w-full flex justify-between lg:flex-row flex-col gap-10">
                  <InputField
                    type="email"
                    title="EMAIL *"
                    placeholder="jaune.though@earth.planet"
                  />
                  <InputField type="text" title="PHONE" placeholder="+18" />
                </div>
                <div className="w-full flex justify-between lg:flex-row flex-col gap-10">
                  <InputField type="text" title="COMPANY" placeholder="Life" />
                  <InputField
                    type="text"
                    title="MESSAGE *"
                    placeholder="to be or not to be"
                  />
                </div>
                <CheckBox text="I agree to receive emails from Hexapink *" />
                <div className="w-full justify-start items-center z-10 hidden lg:flex">
                  <SendMessageButton
                    onClick={() => alert("Send Message Button Clicked")}
                  >
                    <span>Send Message</span>{" "}
                  </SendMessageButton>
                </div>
                <div className="w-full justify-start items-center z-10 flex lg:hidden">
                  <SendMessageButtonMobile
                    onClick={() => alert("Send Message Button Clicked")}
                  >
                    <span>Send Message</span>{" "}
                  </SendMessageButtonMobile>
                </div>
              </form>
            </div>

            <div className="flex flex-row lg:flex-col gap-4 justify-center items-center">
              <img src={Phone} alt="phone icon" className="w-10 sm:w-auto" />
              <img src={Email} alt="email icon" className="w-10 sm:w-auto" />
              <img
                src={Location}
                alt="location icon"
                className="w-10 sm:w-auto"
              />
            </div>
          </div>
        </div>

        <div className="pt-8 mt-8 flex flex-col items-center lg:flex-rol gap-4 border-t-2 border-white">
          <span className="text-white font-raleway font-medium lg:text-[20px] text-[14px] text-center">
            Copyrights Hexapink 2024 - All Rights Reserved
          </span>
          <div className="flex gap-2">
            <img src={BottomLogo} alt="logo icon" className="w-12 lg:w-16" />
            <span className="text-3xl font-kanit text-white font-semibold">
              Hexapink
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
