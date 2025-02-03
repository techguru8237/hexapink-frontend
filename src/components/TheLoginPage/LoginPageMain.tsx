import { Link, useNavigate } from 'react-router-dom';
import "../../style/TheHomePage/style.css";
import InputField from "../../components/TheLoginPage/elements/InputField";
import PasswordField from "./elements/PasswordField";
import CheckBox from "../../components/TheHomePage/elements/desktop/CheckBox";
import LoginButton from "../../components/TheLoginPage/elements/LoginButton";
import { useState } from 'react';
import { login } from '../../actions/auth';

export default function LoginPageMain() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    login(email, password, () => {
      navigate('/user')
    })
  }

  return (
    <div className="relative w-full h-full flex justify-between flex-col  items-center">
      <div className="lg:w-[80%] w-[90%] lg:mt-24 mt-10 justify-start items-start flex flex-col gap-6">
        <h1 className="lg:text-[40px] text-[30px] font-[kanit-bold]">
          Welcome Back!
        </h1>
        <p className="lg:text-[20px] text-[18px] font-[raleway-medium] text-[#666666]">
          You don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-[#666666] border-b-2 font-[raleway-semibold] border-[#666666]"
          >
            Register Now
          </Link>
        </p>
        <div className="2xl:w-[50%] lg:w-[75%] w-[90%] flex flex-col justify-center items-center gap-2">
          <div className="w-full flex lg:flex-row flex-col lg:justify-between justify-center items-center gap-10 lg:mt-24 mt-10">
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
            className="w-full flex lg:flex-row flex-col lg:justify-between justify-start lg:items-center items-start gap-10"
            style={{ marginTop: "50px" }}
          >
            <CheckBox text="Stay Connected" />
            <div className="w-full flex flex-1 justify-start items-start gap-5">
              <span className="lg:text-[20px] text-[14px] text-[#666666] font-[raleway-medium]">
                Forgot Password?
              </span>
              <Link
                to="/ChangePassword"
                className="border-b-2 font-[raleway-semibold] border-[#666666] lg:text-[20px] text-[14px] text-[#666666]"
              >
                Change Password
              </Link>
            </div>
          </div>
          <div className="w-full lg:flex justify-start items-center mt-10">
            <LoginButton onClick={handleLogin}>
              <span>Log In</span>
            </LoginButton>
          </div>
        </div>
      </div>
      {/* <div className="w-full h-[80px] absolute -bottom-[30px] -z-10 bg-[#FFE5EE] flex lg:hidden"></div> */}
      {/* <div className="flex justify-center items-center w-full">
        <HomeButton onClick={() => navigate("/")}>
          <span>Home</span>
        </HomeButton>
        <LoginButton onClick={() => alert("login button is clicked")}>
          <span>Log In</span>
        </LoginButton>
      </div> */}
    </div>
  );
}