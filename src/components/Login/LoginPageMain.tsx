import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../actions/auth";
import PasswordField from "./elements/PasswordField";
import LoginButton from "./elements/LoginButton";
import InputField from "./elements/InputField";
import CheckBox from "../TheHomePage/elements/desktop/CheckBox";
import HomeButton from "../TheHomePage/elements/desktop/HomeButton";

import "../../style/TheHomePage/style.css";

export default function LoginPageMain() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if(localStorage.getItem('token')) {
      navigate('/')
    }
  })

  const handleLogin = () => {
    if (!email) {
      toast.error("Email is required");
      return;
    }
    if (!password) {
      toast.error("Password is required");
      return;
    }
    login(email, password, (response) => {
      toast.success(response.message);
      localStorage.setItem("token", response.token)
      navigate("/user");
    });
  };

  return (
    <div className="relative w-full flex justify-between flex-col items-center">
      <div className="lg:w-[80%] w-[90%] lg:mt-24 mt-10 justify-start items-start flex flex-col gap-6">
        <h1 className="lg:text-[40px] text-[30px] font-kanit font-bold text-dark">
          Welcome Back!
        </h1>
        <p className="text-left text-md lg:text-xl font-raleway font-medium text-light-dark">
          You don&apos;t have an account?{" "}
          <Link
            to="/signup"
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
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="jaune.though@earth.planet"
            />
            <PasswordField
              title="PASSWORD *"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter your password"
            />
          </div>
          <div
            className="w-full flex sm:flex-row flex-col lg:justify-between justify-start lg:items-center items-start gap-10"
            style={{ marginTop: "50px" }}
          >
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
            <LoginButton onClick={handleLogin}>
              <span>Log In</span>
            </LoginButton>
          </div>
        </div>
      </div>
      {/* <div className="w-full h-[80px] absolute -bottom-[30px] -z-10 bg-[#FFE5EE] flex lg:hidden"></div> */}
      <div className="mt-10 flex justify-center gap-8 items-center w-full sm:hidden">
        <HomeButton onClick={() => navigate("/")}>
          <span>Home</span>
        </HomeButton>
        <LoginButton onClick={() => alert("login button is clicked")}>
          <span>Log In</span>
        </LoginButton>
      </div>
    </div>
  );
}
