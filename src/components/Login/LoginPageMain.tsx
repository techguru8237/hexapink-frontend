import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

// Actions
import { handleLogin, requireResendCode } from "../../actions/auth";

// Components
import PasswordField from "./elements/PasswordField";
import InputField from "./elements/InputField";
import CheckBox from "../Home/elements/desktop/CheckBox";
import LoginButton from "./elements/LoginButton";
import HomeButton from "../Home/elements/desktop/HomeButton";

// Styles
import "../../style/TheHomePage/style.css";

// Hooks
import { useLoading } from "../../contexts/Loading";
import { useUserContext } from "../../contexts/User";
import { User } from "../../types";

export default function LoginPageMain() {
  const navigate = useNavigate();
  const { currentUser, login } = useUserContext();
  const { showLoading, hideLoading } = useLoading();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (currentUser) {
      navigate("/");
      toast.info("You are already logged in.");
    }
  }, [currentUser, navigate]);

  const handleSubmit = () => {
    if (!email || !password) {
      toast.error(!email ? "Email is required" : "Password is required");
      return;
    }

    showLoading();
    handleLogin(
      email,
      password,
      (response) => {
        toast.success(response.message);
        login(response.user as User);
        response.user.role === "admin"
          ? navigate("/admin")
          : navigate("/user");
      },
      (error) => {
        if (error.response.data.errorType === "ACCOUNT_NOT_VERIFIED") {
          toast.error(error.response.data.message);
          showLoading();
          requireResendCode(email, (response: { message: string }) => {
            toast.success(response.message);
            navigate("/signup/3", { state: { email } });
          }).finally(() => {
            hideLoading();
          });
        } else {
          toast.error(error.response.data.message);
        }
      }
    ).finally(hideLoading); // Ensure loading is hidden on completion
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="lg:w-[80%] w-[90%] lg:mt-24 mt-10 flex flex-col gap-6">
        <h1 className="lg:text-[40px] text-[30px] text-left font-kanit font-bold text-dark">
          Welcome Back!
        </h1>
        <p className="text-left text-md lg:text-xl font-raleway font-medium text-light-dark">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup/1"
            className="text-light-dark border-b-2 font-raleway font-semibold border-[#666666]"
          >
            Register Now
          </Link>
        </p>
        <div className="2xl:w-[50%] lg:w-[75%] w-full flex flex-col justify-center items-center gap-2">
          <div className="w-full flex lg:flex-row flex-col lg:justify-start lg:items-center gap-10 lg:mt-24 mt-10">
            <InputField
              type="text"
              title="EMAIL *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jaune.though@earth.planet"
            />
            <PasswordField
              title="PASSWORD *"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <div className="w-full flex sm:flex-row flex-col lg:justify-between justify-start lg:items-center items-start gap-10 mt-10">
            <CheckBox text="Stay Connected" />
            <div className="flex flex-1 justify-end items-start gap-4 text-md lg:text-lg text-light-dark">
              <span className="font-raleway font-medium">Forgot Password?</span>
              <Link
                to="/forgot-password"
                className="border-b-2 font-raleway font-semibold border-[#666666] text-dark"
              >
                Change Password
              </Link>
            </div>
          </div>
          <div className="w-full sm:flex justify-start items-center mt-10 hidden">
            <LoginButton onClick={handleSubmit}>
              <span>Log In</span>
            </LoginButton>
          </div>
        </div>
      </div>
      <div className="mt-10 flex justify-center gap-8 items-center w-full sm:hidden">
        <HomeButton onClick={() => navigate("/")}>
          <span>Home</span>
        </HomeButton>
        <LoginButton onClick={handleSubmit}>
          <span>Log In</span>
        </LoginButton>
      </div>
    </div>
  );
}
