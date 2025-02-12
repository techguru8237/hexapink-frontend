import { useState, useRef } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import StepOne from "../../assets/TheSignupPage/image/step1.svg";
import StepTwo from "../../assets/TheSignupPage/image/step2.svg";
import StepThree from "../../assets/TheSignupPage/image/step3.svg";
import StepOne_M from "../../assets/TheSignupPage/image/step1_m.svg";
import StepTwo_M from "../../assets/TheSignupPage/image/step2_m.svg";
import StepThree_M from "../../assets/TheSignupPage/image/step3_m.svg";
import InputField from "../Login/elements/InputField";
import PasswordField from "../Login/elements/PasswordField";
import ContinueButton from "./elements/ContinueButton";
import CountryCombobox from "./elements/CountryCombobox";
import CountryCodeCombobox from "./elements/CountryCodeCombobox";
import CreateAccountButton from "./elements/CreateAccountButton";
import CheckBox from "../TheHomePage/elements/desktop/CheckBox";
import BackButton from "./elements/BackButton";
import VerifyAccountButton from "./elements/VerifyAccountButton";
import { requireResendCode, signup, verifyEmail } from "../../actions/auth";
import VerificationCodeInput, {
  VerificationCodeInputRef,
} from "./elements/VerificationCodeInput";
import CreateAccountButton_M from "../TheHomePage/elements/desktop/CreateAccountButton_M";
import { toast } from "react-toastify";
import { useLoading } from "../../contexts/Loading";

interface StepTitleProps {
  step: string;
  currentStep: string;
  title: string;
}

interface StepImageProps {
  step: string;
  currentStep: string;
  src: string;
}

interface StepDescriptionProps {
  step: string;
  currentStep: string;
  children: React.ReactNode;
}

const StepTitle = ({ step, currentStep, title }: StepTitleProps) => (
  <h1
    className="text-left lg:text-[40px] text-[24px] font-kanit font-bold"
    hidden={step !== currentStep}
  >
    {title}
  </h1>
);

const StepImage = ({ step, currentStep, src }: StepImageProps) => (
  <img src={src} alt="" hidden={step !== currentStep} />
);

const StepDescription = ({
  step,
  currentStep,
  children,
}: StepDescriptionProps) => (
  <p
    className="lg:text-[20px] text-[14px] font-raleway font-medium text-light-dark sm:mb-7"
    hidden={step !== currentStep}
  >
    {children}
  </p>
);

export default function SignupPageMain() {
  const param = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const { showLoading, hideLoading } = useLoading();

  const step = param.step || "1";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    phone: "",
    industry: "",
    company: "",
    email: email,
    password: "",
    passwordConfirm: "",
    otp: "",
  });

  const verificationCodeInputRef = useRef<VerificationCodeInputRef>(null);

  const handleCountrySelect = (country: string) => {
    setFormData({ ...formData, country });
  };

  const validateProfileStep = () => {
    const { firstName, lastName, country, phone, industry, company } = formData;

    if (
      !firstName ||
      !lastName ||
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
      navigate("/signup/2");
    }
  };

  const handleVerifyEmail = () => {
    if (!formData.email) {
      toast.warning("Please provide an email address.");
    } else if (formData.otp === "") {
      toast.warning("Please provide an OTP code.");
    } else {
      showLoading();
      verifyEmail(
        formData.email,
        formData.otp,
        (response: { message: string }) => {
          toast.success(response.message);
          navigate("/login");
        }
      ).finally(() => {
        hideLoading();
      });
    }
    setFormData({ ...formData, otp: "" });
    verificationCodeInputRef.current?.clear();
  };

  const handleClickResendCode = () => {
    if (formData.email === "") {
      toast.warning("Please provide an email address.");
      navigate("/signup/2");
    } else {
      showLoading();
      requireResendCode(formData.email, (response: { message: string }) => {
        toast.success(response.message);
      }).finally(() => {
        hideLoading();
      });
    }
  };

  const handleBack = () => {
    if (step === "2") {
      navigate("/signup/1");
    } else if (step === "3") {
      navigate("/signup/2");
    }
  };

  const handleSignup = () => {
    try {
      if (!validateInformationStep()) {
        return;
      }
      showLoading();
      signup(
        formData,
        (response: { message: string }) => {
          toast.success(response.message);
          navigate("/signup/3");
        },
        (error: any) => {
          console.log("error.response.data", error.response.data);
          if (error.response.data.errorType === "USER_ALREADY_EXISTS") {
            requireResendCode(
              formData.email,
              (response: { message: string }) => {
                toast.success(response.message);
              }
            );
            toast.info("User already exists. Please verify your email");
            navigate("/signup/3");
          } else if (
            error.response.data.errorType === "USER_ALREADY_REGISTERED"
          ) {
            toast.error("User already registered. Please login");
            navigate("/login");
          } else {
            toast.error("Unable to create account. Please try again.");
          }
        }
      ).finally(() => {
        hideLoading();
      });
    } catch (error: any) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between items-center gap-8 sm:gap-12 xl:gap-16">
      <div className="w-full px-8 sm:px-12 md:px-20 lg:px-28 xl:px-36 2xl:px-48 lg:mt-10 mt-5 justify-start items-start flex flex-col gap-2 sm:gap-6 text-dark">
        <div className="flex justify-center items-center lg:hidden w-full mb-4">
          <StepImage step={step} currentStep="1" src={StepOne_M} />
          <StepImage step={step} currentStep="2" src={StepTwo_M} />
          <StepImage step={step} currentStep="3" src={StepThree_M} />
        </div>
        <StepTitle
          step={step}
          currentStep="1"
          title="Complete your user profile"
        />
        <StepTitle
          step={step}
          currentStep="2"
          title="Fill your Log In Information"
        />
        <StepTitle
          step={step}
          currentStep="3"
          title="Check your email and Fill the Verification Code"
        />
        <StepDescription step={step} currentStep="1">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-light-dark border-b-2 font-raleway font-semibold border-[#666666]"
          >
            Log In
          </Link>
        </StepDescription>
        <StepDescription step={step} currentStep="2">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-light-dark border-b-2 font-raleway font-semibold border-[#666666]"
          >
            Log In
          </Link>
        </StepDescription>
        <StepDescription step={step} currentStep="3">
          You didn&apos;t receive any code in your email? &nbsp;
          <span
            onClick={handleClickResendCode}
            className="text-light-dark border-b-2 font-raleway font-semibold border-[#666666] tracking-wider cursor-pointer"
          >
            Resend Code &nbsp;
          </span>
          or
          <span
            onClick={() => navigate("/signup/2")}
            className="text-light-dark border-b-2 font-raleway font-semibold border-[#666666] tracking-wider cursor-pointer"
          >
            &nbsp;Change Email
          </span>
        </StepDescription>
      </div>
      <div className="flex lg:flex-row flex-col w-[80%] justify-start items-center gap-20 h-[90%]">
        <div className="lg:flex justify-start items-start hidden h-full">
          <StepImage step={step} currentStep="1" src={StepOne} />
          <StepImage step={step} currentStep="2" src={StepTwo} />
          <StepImage step={step} currentStep="3" src={StepThree} />
        </div>
        {step === "1" && (
          <div className="w-full lg:w-[80%] h-[90%] flex justify-start items-start flex-col gap-5">
            <div className="w-full flex justify-start items-start gap-8 flex-col">
              <div className="w-full flex lg:flex-row flex-col justify-start items-start lg:gap-20 gap-8">
                <InputField
                  type="text"
                  title="FIRST NAME *"
                  placeholder="Jaune"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
                <InputField
                  type="text"
                  title="LAST NAME *"
                  placeholder="Though"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
              <div className="w-full flex lg:flex-row flex-col justify-start items-start lg:gap-20 gap-5">
                <CountryCombobox onCountrySelect={handleCountrySelect} />
                <CountryCodeCombobox
                  countryName={formData.country}
                  setPhoneNumber={(phoneNumber) =>
                    setFormData({ ...formData, phone: phoneNumber })
                  }
                />
              </div>
              <div className="w-full flex lg:flex-row flex-col justify-start items-start lg:gap-20 gap-8">
                <InputField
                  type="text"
                  title="INDUSTRY *"
                  placeholder="Select a industry"
                  value={formData.industry}
                  onChange={(e) =>
                    setFormData({ ...formData, industry: e.target.value })
                  }
                />
                <InputField
                  type="text"
                  title="COMPANY *"
                  placeholder="Select a company"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
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
        {step === "2" && (
          <div className="flex w-full lg:w-[80%] h-[90%] justify-start items-start flex-col gap-10">
            <div className="w-full lg:3/4 xl:w-2/3 flex justify-start items-start gap-8 flex-col">
              <InputField
                type="text"
                title="EMAIL *"
                placeholder="jaune.though@earth.planet"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <div className="w-full flex lg:flex-row flex-col justify-between items-center lg:gap-6 gap-10">
                <PasswordField
                  title="PASSWORD *"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <PasswordField
                  title="CONFIRM PASSWORD *"
                  placeholder="Confirm Password"
                  value={formData.passwordConfirm}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      passwordConfirm: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <CheckBox text="I agree to the terms of use"></CheckBox>
            <div className="w-full lg:flex justify-start items-start gap-8 hidden">
              <BackButton onClick={handleBack}>
                <span>Back</span>
              </BackButton>
              <CreateAccountButton onClick={handleSignup}>
                <span>Create Account</span>
              </CreateAccountButton>
            </div>
          </div>
        )}
        {step === "3" && (
          <div className="flex lg:w-[80%] h-[90%] justify-start items-start flex-col gap-5">
            <div className="w-full flex justify-start items-start gap-5 flex-col">
              <h1 className="font-raleway font-semibold text-[12px] text-[#333333]">
                VERIFICATION CODE
              </h1>
              <VerificationCodeInput
                ref={verificationCodeInputRef}
                onChange={(code) => setFormData({ ...formData, otp: code })}
              />
            </div>
            <div className="w-full lg:flex justify-start items-start gap-10 hidden">
              <BackButton onClick={handleBack}>
                <span>Back</span>
              </BackButton>
              <VerifyAccountButton onClick={handleVerifyEmail}>
                <span>Verify Account</span>
              </VerifyAccountButton>
            </div>
          </div>
        )}
      </div>

      {step === "1" && (
        <div className="flex justify-center items-center lg:hidden gap-5">
          <BackButton onClick={handleBack}>
            <span>Back</span>
          </BackButton>
          <ContinueButton onClick={handleContinue}>
            <span>Continue</span>
          </ContinueButton>
        </div>
      )}

      {step === "2" && (
        <div className="flex justify-center items-center lg:hidden gap-5">
          <BackButton onClick={handleBack}>
            <span>Back</span>
          </BackButton>
          <CreateAccountButton_M onClick={handleSignup}>
            <span>Create Account</span>
          </CreateAccountButton_M>
        </div>
      )}
      {step === "3" && (
        <div className="w-full flex justify-center items-start gap-10 lg:hidden">
          <BackButton onClick={handleBack}>
            <span>Back</span>
          </BackButton>
          <VerifyAccountButton onClick={handleVerifyEmail}>
            <span>Verify Account</span>
          </VerifyAccountButton>
        </div>
      )}
    </div>
  );
}
