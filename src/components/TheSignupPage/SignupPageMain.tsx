import { useState, useRef, KeyboardEvent, ChangeEvent } from "react";
// import Link from "next/link";
import { Link } from 'react-router-dom';
// import Image from "next/image";
import StepOne from "../../assets/TheSignupPage/image/step1.png";
import StepTwo from "../../assets/TheSignupPage/image/step2.png";
import StepThree from "../../assets/TheSignupPage/image/step3.png";
import StepOne_M from "../../assets/TheSignupPage/image/step1_m.png";
import StepTwo_M from "../../assets/TheSignupPage/image/step2_m.png";
import StepThree_M from "../../assets/TheSignupPage/image/step3_m.png";
import InputField from "../TheLoginPage/elements/InputField";
import PasswordField from "../TheLoginPage/elements/PasswordField";
import ContinueButton from "./elements/ContinueButton";
import CountryCombobox from "./elements/CountryCombobox";
import CountryCodeCombobox from "./elements/CountryCodeCombobox";
import CreateAccountButton from "./elements/CreateAccountButton";
import CheckBox from "../TheHomePage/elements/desktop/CheckBox";
import BackButton from "./elements/BackButton";
import VerifyAccountButton from "./elements/VerifyAccountButton";
export default function SignupPageMain() {
  const countryName = "United States";
  const [stepKey, setStepKey] = useState<string>("profile");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleKeyUp = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      event.key !== "Backspace" &&
      index < inputRefs.current.length - 1 &&
      event.currentTarget.value
    ) {
      inputRefs.current[index + 1]?.focus();
    }
    if (event.key === "Backspace" && index > 0 && !event.currentTarget.value) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value && !/^[0-9]$/.test(value)) {
      event.target.value = "";
    }
  };

  const handleContinue = () => {
    setStepKey("information");
  };
  const handleCreateAccount = () => {
    setStepKey("verification");
  };
  const handleBack = () => {
    if (stepKey == "information") {
      setStepKey("profile");
    } else if (stepKey == "verification") {
      setStepKey("information");
    }
  };
  return (
    <div className="w-full h-full flex flex-col justify-between items-center gap-16 p-4">
      <div className="w-[80%] lg:mt-10 mt-5 justify-start items-start flex flex-col gap-5">
        <div className="flex justify-center items-center lg:hidden w-full">
          <img src={StepOne_M} alt="" hidden={stepKey != "profile"} />
          <img src={StepTwo_M} alt="" hidden={stepKey != "information"} />
          <img src={StepThree_M} alt="" hidden={stepKey != "verification"} />
        </div>
        <h1
          className="lg:text-[40px] text-[24px] font-[kanit-bold]"
          hidden={stepKey != "profile"}
        >
          Complete your user profile
        </h1>
        <h1
          className="lg:text-[40px] text-[24px] font-[kanit-bold]"
          hidden={stepKey != "information"}
        >
          Fill your Log In Information
        </h1>
        <h1
          className="lg:text-[40px] text-[24px] font-[kanit-bold]"
          hidden={stepKey != "verification"}
        >
          Check your email and Fill the Verification Code
        </h1>
        <p
          className="lg:text-[20px] text-[14px] font-[raleway-medium] text-[#666666] mb-7"
          hidden={stepKey != "profile" && stepKey != "information"}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#666666] border-b-2 font-[raleway-semibold] border-[#666666]"
          >
            Log In
          </Link>
        </p>
        <p
          className="lg:text-[20px] text-[14px] font-[raleway-medium] text-[#666666] tracking-wider"
          hidden={stepKey != "verification"}
        >
          You didn&apos;t receive any code in your email? <br />
          <Link
            to="/resend"
            className="text-[#666666] border-b-2 font-[raleway-semibold] border-[#666666] tracking-wider"
          >
            Resend Code &nbsp;
          </Link>
          or
          <Link
            to="/login"
            className="text-[#666666] border-b-2 font-[raleway-semibold] border-[#666666] tracking-wider"
          >
            &nbsp;Change Email
          </Link>
        </p>
      </div>
      <div className="flex lg:flex-row flex-col w-[80%] justify-start items-center gap-20 h-[90%]">
        <div className="lg:flex justify-start items-start hidden h-full">
          <img src={StepOne} alt="" hidden={stepKey != "profile"} />
          <img src={StepTwo} alt="" hidden={stepKey != "information"} />
          <img src={StepThree} alt="" hidden={stepKey != "verification"} />
        </div>
        {stepKey == "profile" && (
          <div className="flex lg:w-[80%] h-[90%] justify-start items-start flex-col gap-5">
            <div className="w-full flex justify-start items-start gap-10 flex-col">
              <div className="w-full flex lg:flex-row flex-col justify-start items-start lg:gap-20 gap-5">
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
              <div className="w-full flex lg:flex-row flex-col justify-start items-start lg:gap-20 gap-5">
                <CountryCombobox />
                <CountryCodeCombobox countryName={countryName} />
              </div>
              <div className="w-full flex lg:flex-row flex-col justify-start items-start lg:gap-20 gap-5">
                <InputField
                  type="text"
                  title="INDUSTRY *"
                  placeholder="Select a industry"
                />
                <InputField
                  type="text"
                  title="COMPANY *"
                  placeholder="Select a company"
                />
              </div>
            </div>
            <div className="lg:flex w-full justify-start items-center hidden">
              <ContinueButton onClick={handleContinue}>
                <span>Continue</span>
              </ContinueButton>
            </div>
          </div>
        )}
        {stepKey == "information" && (
          <div className="flex lg:w-[80%] h-[90%] justify-start items-start flex-col gap-10">
            <div className="w-full flex justify-start items-start gap-10 flex-col">
              <InputField
                type="text"
                title="EMAIL *"
                placeholder="jaune.though@earth.planet"
              />
              <div className="flex lg:flex-row flex-col justify-between items-center lg:gap-5 gap-10 lg:w-[60%] w-full ">
                <PasswordField title="PASSWORD *" placeholder="Password" />
                <PasswordField
                  title="CONFIRM PASSWORD *"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            <CheckBox text="J’accepte les conditions générales d’utilisation"></CheckBox>
            <div className="w-full lg:flex justify-start items-start gap-10 hidden">
              <BackButton onClick={handleBack}>
                <span>Back</span>
              </BackButton>
              <CreateAccountButton onClick={handleCreateAccount}>
                <span>Create Account</span>
              </CreateAccountButton>
            </div>
          </div>
        )}
        {stepKey == "verification" && (
          <div className="flex lg:w-[80%] h-[90%] justify-start items-start flex-col gap-5">
            <div className="w-full flex justify-start items-start gap-5 flex-col">
              <h1 className="font-[raleway-semibold] text-[12px] text-[#333333]">
                VERIFICATION CODE
              </h1>
              <div className=" flex gap-3 justify-center items-center">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onKeyPress={handleKeyPress}
                    onKeyUp={(e) => handleKeyUp(index, e)}
                    onChange={handleChange}
                    className="lg:w-[50px] w-[40px] font-[raleway-semibold] bg-transparent text-[20px] outline-none border-b border-[#666666] text-center"
                    placeholder="#"
                    maxLength={1}
                  />
                ))}
              </div>
            </div>
            <div className="w-full lg:flex justify-start items-start gap-10 hidden">
              <BackButton onClick={handleBack}>
                <span>Back</span>
              </BackButton>
              <VerifyAccountButton
                onClick={() => alert("Verification is success!")}
              >
                <span>Verify Account</span>
              </VerifyAccountButton>
            </div>
          </div>
        )}
      </div>
      {/* <div className="w-full h-[80px] absolute bottom-0 -z-10 bg-[#FFE5EE] flex lg:hidden"></div> */}
      {stepKey == "profile" && (
        <div className="flex justify-center items-center lg:hidden gap-5">
          <BackButton onClick={handleBack}>
            <span>Back</span>
          </BackButton>
          <ContinueButton onClick={handleContinue}>
            <span>Continue</span>
          </ContinueButton>
        </div>
      )}
      {stepKey == "information" && (
        <div className="flex justify-center items-center lg:hidden gap-5">
          <BackButton onClick={handleBack}>
            <span>Back</span>
          </BackButton>
          <CreateAccountButton onClick={handleCreateAccount}>
            <span>Create Account</span>
          </CreateAccountButton>
        </div>
      )}
      {stepKey == "verification" && (
        <div className="w-full flex justify-center items-start gap-10 lg:hidden">
          <BackButton onClick={handleBack}>
            <span>Back</span>
          </BackButton>
          <VerifyAccountButton
            onClick={() => alert("Verification is success!")}
          >
            <span>Verify Account</span>
          </VerifyAccountButton>
        </div>
      )}
    </div>
  );
}
