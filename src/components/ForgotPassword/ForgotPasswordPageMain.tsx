import { useState } from "react";
import { toast } from "react-toastify";

import { forgotPassword } from "../../actions/auth";
import { useLoading } from "../../contexts/Loading";

import VerifyEmailButton from "./elements/VerifyEmailButton";
import InputField from "../Login/elements/InputField";

export default function ForgotPasswordPageMain() {
  const [email, setEmail] = useState("");
  const { showLoading, hideLoading } = useLoading();

  const handleForgotPassword = () => {
    if (!email) {
      toast.error("Email is required");
      return;
    }
    showLoading();
    forgotPassword(email, (response) => {
      toast.success(response.message);
    }).finally(() => {
      hideLoading();
    });
  };

  return (
    <div className="relative w-full lg:w-3/4 xl:w-1/2 px-8 sm:px-12 md:px-20 lg:px-28 xl:px-36 2xl:px-48 flex justify-between flex-col gap-12 items-start">
      <div className="lg:mt-24 mt-10 justify-start items-start flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-left lg:text-[40px] text-[30px] font-kanit font-bold text-dark">
            Forgot Password
          </h1>
          <p className="text-left text-md lg:text-xl font-raleway font-medium text-light-dark">
            Enter your email address to receive a password reset link.
          </p>
        </div>
        <InputField
          type="email"
          title="EMAIL *"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="w-full lg:flex justify-start items-start gap-8 hidden">
          <VerifyEmailButton onClick={handleForgotPassword}>
            <span>Verify Email</span>
          </VerifyEmailButton>
        </div>
      </div>
      <div className="flex justify-center items-center lg:hidden gap-5">
        <VerifyEmailButton onClick={handleForgotPassword}>
          <span>Verify Email</span>
        </VerifyEmailButton>
      </div>
    </div>
  );
}
