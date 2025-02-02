// import Image from "next/image";
// import { useRouter, usePathname } from "next/navigation";
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from "../../assets/TheHomePage/image/logo.png";
import HexagonLoginButton from "./elements/desktop/HexagonLoginButton";
import HexagonSignupButton from "./elements/desktop/HexagonSignupButton";
import Login_M from "../../assets/TheHomePage/image/login_m.png";
import Signup_M from "../../assets/TheHomePage/image/signup_m.png";
import Home_M from "../../assets/TheHomePage/image/home.png";
import "../../style/TheHomePage/font.css";
import HomeButton from "./elements/desktop/HomeButton";
import LoginButton from "./elements/desktop/LoginButton";
import CreateAccountButton from "./elements/desktop/CreateAccountButton";

const HomeHeader = () => {
  // const router = useRouter();
  const navigate = useNavigate();
  // const pathname = usePathname();
  const location = useLocation();
  return (
    <div className="flex justify-around  items-center w-full lg:h-[130px] h-[100px] border-b-2 border-[#FFCCDD] dark:border-[#FFCCDD]  gap-20">
      <div className="absolute top-0 left-0 -z-50   bg-[#fff5f8] dark:bg-[#fff5f8] opacity-50"></div>
      <div
        className=" flex justify-center items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={Logo} alt="HexaPink Logo" className="w-[50px] h-[40px]" />
        <h2 className="lg:flex text-4xl font-[kanit-medium] hidden">
          HexaPink
        </h2>
        <h2 className="flex text-4xl font-[kanit-medium] lg:hidden"></h2>
      </div>
      {location.pathname == "/" && (
        <div className=" flex justify-center items-center gap-3 lg:hidden z-10">
          <img
            src={Login_M}
            alt="Login"
            onClick={() => navigate("/login")}
          />
          <img
            src={Signup_M}
            alt="Signup"
            onClick={() => navigate("/signup")}
          />
        </div>
      )}
      {location.pathname == "/login" && (
        <div className=" flex justify-center items-center gap-3 lg:hidden z-10">
          <CreateAccountButton onClick={() => navigate("/signup")}>
            <span>Create Account</span>
          </CreateAccountButton>
        </div>
      )}
      {location.pathname == "/" && (
        <div className="lg:flex justify-center items-center gap-7 hidden">
          <HexagonLoginButton onClick={() => navigate("/login")}>
            <span>Log In</span>
          </HexagonLoginButton>
          <HexagonSignupButton onClick={() => navigate("/signup")}>
            <span>Create Account</span>
          </HexagonSignupButton>
        </div>
      )}
      {location.pathname == "/login" && (
        <div className="lg:flex justify-center items-center gap-7 hidden">
          <HomeButton onClick={() => navigate("/")}>
            <span>Home</span>
          </HomeButton>
          <CreateAccountButton onClick={() => navigate("/signup")}>
            <span>Create Account</span>
          </CreateAccountButton>
        </div>
      )}
      {location.pathname == "/signup" && (
        <div className="lg:flex justify-center items-center gap-7 hidden">
          <HomeButton onClick={() => navigate("/")}>
            <span>Home</span>
          </HomeButton>
          <LoginButton onClick={() => navigate("/login")}>
            <span>Log In</span>
          </LoginButton>
        </div>
      )}
      {location.pathname == "/signup" && (
        <div className="flex justify-center items-start lg:hidden gap-5">
          <img src={Home_M} alt="" width={50} onClick={() => navigate("/")}/>
          <LoginButton onClick={() => navigate("/login")}>
            <span>Log In</span>
          </LoginButton>
        </div>
      )}    
    </div>
  );
};

export default HomeHeader;
