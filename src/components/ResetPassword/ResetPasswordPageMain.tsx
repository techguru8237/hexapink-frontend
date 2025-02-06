import { useState } from "react";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";
import { resetPassword } from "../../actions/auth";
import PasswordField from "../Login/elements/PasswordField";
import ResetPasswordButton from "./elements/ResetPasswordButton";
import ResetPasswordButtonM from "./elements/ResetPasswordButtonM";

export default function ResetPasswordPageMain() {
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleResetPassword = () => {
    if (!password || !passwordConfirm) {
      toast.error("Both password fields are required");
      return;
    }
    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }
    resetPassword(token, password, (response) => {
      toast.success(response.message);
    });
  };

  return (
    <div className="relative w-full lg:w-3/4 xl:w-1/2 px-8 sm:px-12 md:px-20 lg:px-28 xl:px-36 2xl:px-48 flex justify-between flex-col items-start gap-12">
      <div className="lg:mt-24 mt-10 justify-start items-start flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-left lg:text-[40px] text-[30px] font-kanit font-bold text-dark">
            Reset Password
          </h1>
          <p className="text-left text-md lg:text-xl font-raleway font-medium text-light-dark">
            Enter your new password below.
          </p>
        </div>

        <PasswordField
          title="NEW PASSWORD *"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordField
          title="CONFIRM NEW PASSWORD *"
          placeholder="Confirm New Password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <div className="lg:flex justify-start items-start gap-8 hidden">
          <ResetPasswordButton onClick={handleResetPassword}>
            <span>Reset Password</span>
          </ResetPasswordButton>
        </div>
      </div>
      <div className="flex justify-center items-center lg:hidden gap-5">
        <ResetPasswordButtonM onClick={handleResetPassword}>
          <span>Reset Password</span>
        </ResetPasswordButtonM>
      </div>
    </div>
  );
}
