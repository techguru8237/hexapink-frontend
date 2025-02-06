import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StepOne from "../../assets/TheSignupPage/image/step1.svg";
import StepTwo from "../../assets/TheSignupPage/image/step2.svg";
import StepThree from "../../assets/TheSignupPage/image/step3.svg";
import StepOne_M from "../../assets/TheSignupPage/image/step1_m.svg";
import StepTwo_M from "../../assets/TheSignupPage/image/step2_m.svg";
import StepThree_M from "../../assets/TheSignupPage/image/step3_m.svg";
import InputField from "../TheLoginPage/elements/InputField";
import PasswordField from "../TheLoginPage/elements/PasswordField";
import ContinueButton from "./elements/ContinueButton";
import CountryCombobox from "./elements/CountryCombobox";
import CountryCodeCombobox from "./elements/CountryCodeCombobox";
import CreateAccountButton from "./elements/CreateAccountButton";
import CheckBox from "../TheHomePage/elements/desktop/CheckBox";
import BackButton from "./elements/BackButton";
import VerifyAccountButton from "./elements/VerifyAccountButton";
import { signup, verifyEmail } from "../../actions/auth";
import VerificationCodeInput from "./elements/VerificationCodeInput";
import CreateAccountButton_M from "../TheHomePage/elements/desktop/CreateAccountButton_M";
import { toast } from "react-toastify";

export default function SignupPageMain() {
  const navigate = useNavigate()
  const [stepKey, setStepKey] = useState<string>("profile");

  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    country: "",
    phone: "",
    industry: "",
    company: "",
    email: "",
    password: "",
    passwordConfirm: "",
    verificationCode: "",
  });

  const handleCountrySelect = (country: string) => {
    setFormData({ ...formData, country });
  };

  const validateProfileStep = () => {
    const { firstName, secondName, country, phone, industry, company } =
      formData;

    if (
      !firstName ||
      !secondName ||
      !country ||
      !phone ||
      !industry ||
      !company
    ) {
      toast.warn("Please fill in all required fields.");
      return false;
    }

    return true;
  };

  const validateInformationStep = () => {
    const { email, password, passwordConfirm } = formData;

    if (!email || !password || !passwordConfirm) {
      toast.warning("Please fill in all required fields.");
      return false;
    }

    if (password !== passwordConfirm) {
      toast.warning("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleContinue = () => {
    if (validateProfileStep()) {
      setStepKey("information");
    }
  };

  const handleVerifyEmail = () => {
    if (validateInformationStep()) {
      if (!formData.email) {
        toast.warning("Please provide an email address.");
      } else {
        verifyEmail(formData.email, (response: {message: string}) => {
          toast.success(response.message)
          setStepKey("verification");
        });
      }
    }
  };

  const handleBack = () => {
    if (stepKey == "information") {
      setStepKey("profile");
    } else if (stepKey == "verification") {
      setStepKey("information");
    }
  };

  const handleSignup = () => {
    signup(formData, () => {
      navigate('/login')
    });
  };

  return (
    <div className="w-full h-full flex flex-col justify-between items-center gap-8 sm:gap-16">
      <div className="w-full px-8 sm:px-12 md:px-20 lg:px-28 xl:px-36 2xl:px-48 lg:mt-10 mt-5 justify-start items-start flex flex-col gap-2 sm:gap-6">
        <div className="flex justify-center items-center lg:hidden w-full mb-4">
          <img src={StepOne_M} alt="" hidden={stepKey != "profile"} />
          <img src={StepTwo_M} alt="" hidden={stepKey != "information"} />
          <img src={StepThree_M} alt="" hidden={stepKey != "verification"} />
        </div>
        <h1
          className="text-left lg:text-[40px] text-[24px] font-kanit font-bold"
          hidden={stepKey != "profile"}
        >
          Complete your user profile
        </h1>
        <h1
          className="text-left lg:text-[40px] text-[24px] font-kanit font-bold"
          hidden={stepKey != "information"}
        >
          Fill your Log In Information
        </h1>
        <h1
          className="text-left lg:text-[40px] text-[24px] font-kanit font-bold"
          hidden={stepKey != "verification"}
        >
          Check your email and Fill the Verification Code
        </h1>
        <p
          className="lg:text-[20px] text-[14px] font-raleway font-medium text-light-dark sm:mb-7"
          hidden={stepKey != "profile" && stepKey != "information"}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-light-dark border-b-2 font-[raleway-semibold] border-[#666666]"
          >
            Log In
          </Link>
        </p>
        <p
          className="text-left lg:text-[20px] text-[14px] font-raleway font-medium text-light-dark tracking-wider"
          hidden={stepKey != "verification"}
        >
          You didn&apos;t receive any code in your email? <br />
          <Link
            to="/resend"
            className="text-light-dark border-b-2 font-[raleway-semibold] border-[#666666] tracking-wider"
          >
            Resend Code &nbsp;
          </Link>
          or
          <Link
            to="/login"
            className="text-light-dark border-b-2 font-[raleway-semibold] border-[#666666] tracking-wider"
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
            <div className="w-full flex justify-start items-start gap-8 flex-col">
              <div className="w-full flex lg:flex-row flex-col justify-start items-start lg:gap-20 gap-8">
                <InputField
                  type="text"
                  title="FIRST NAME *"
                  placeholder="Jaune"
                  value={formData.firstName}
                  onChange={(e) => {
                    setFormData({ ...formData, firstName: e.target.value });
                  }}
                />
                <InputField
                  type="text"
                  title="LAST NAME *"
                  placeholder="Though"
                  value={formData.secondName}
                  onChange={(e) => {
                    setFormData({ ...formData, secondName: e.target.value });
                  }}
                />
              </div>
              <div className="w-full flex lg:flex-row flex-col justify-start items-start lg:gap-20 gap-5">
                <CountryCombobox onCountrySelect={handleCountrySelect} />
                <CountryCodeCombobox
                  countryName={formData.country}
                  setPhoneNumber={(phoneNumber) => {
                    setFormData({ ...formData, phone: phoneNumber });
                  }}
                />
              </div>
              <div className="w-full flex lg:flex-row flex-col justify-start items-start lg:gap-20 gap-8">
                <InputField
                  type="text"
                  title="INDUSTRY *"
                  placeholder="Select a industry"
                  value={formData.industry}
                  onChange={(e) => {
                    setFormData({ ...formData, industry: e.target.value });
                  }}
                />
                <InputField
                  type="text"
                  title="COMPANY *"
                  placeholder="Select a company"
                  value={formData.company}
                  onChange={(e) => {
                    setFormData({ ...formData, company: e.target.value });
                  }}
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
          <div className="flex w-full lg:w-[80%] h-[90%] justify-start items-start flex-col gap-10">
            <div className="w-full flex justify-start items-start gap-8 flex-col">
              <InputField
                type="text"
                title="EMAIL *"
                placeholder="jaune.though@earth.planet"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
              />
              <div className="flex lg:flex-row flex-col justify-between items-center lg:gap-5 gap-10 lg:w-[60%] w-full ">
                <PasswordField
                  title="PASSWORD *"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                  }}
                />
                <PasswordField
                  title="CONFIRM PASSWORD *"
                  placeholder="Confirm Password"
                  value={formData.passwordConfirm}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      passwordConfirm: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <CheckBox text="I agree to the terms of use"></CheckBox>
            <div className="w-full lg:flex justify-start items-start gap-8 hidden">
              <BackButton onClick={handleBack}>
                <span>Back</span>
              </BackButton>
              <CreateAccountButton onClick={handleVerifyEmail}>
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
              <VerificationCodeInput
                onChange={(code) =>
                  setFormData({ ...formData, verificationCode: code })
                }
              />
            </div>
            <div className="w-full lg:flex justify-start items-start gap-10 hidden">
              <BackButton onClick={handleBack}>
                <span>Back</span>
              </BackButton>
              <VerifyAccountButton onClick={handleSignup}>
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
          <CreateAccountButton_M onClick={handleVerifyEmail}>
            <span>Create Account</span>
          </CreateAccountButton_M>
        </div>
      )}
      {stepKey == "verification" && (
        <div className="w-full flex justify-center items-start gap-10 lg:hidden">
          <BackButton onClick={handleBack}>
            <span>Back</span>
          </BackButton>
          <VerifyAccountButton onClick={handleSignup}>
            <span>Verify Account</span>
          </VerifyAccountButton>
        </div>
      )}
    </div>
  );
}
