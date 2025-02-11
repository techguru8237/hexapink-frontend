import { useNavigate, useLocation, Link } from "react-router-dom";
import Logo from "../../assets/TheHomePage/image/logo.svg";
import HexagonLoginButton from "./elements/desktop/HexagonLoginButton";
import HexagonSignupButton from "./elements/desktop/HexagonSignupButton";
import Login_M from "../../assets/TheHomePage/image/login_m.svg";
import Signup_M from "../../assets/TheHomePage/image/signup_m.svg";
import Home_M from "../../assets/TheHomePage/image/home.svg";
import "../../style/TheHomePage/font.css";
import HomeButton from "./elements/desktop/HomeButton";
import LoginButton from "./elements/desktop/LoginButton";
import CreateAccountButton_M from "./elements/desktop/CreateAccountButton_M";
import CreateAccountButton from "../TheSignupPage/elements/CreateAccountButton";
import useAuth from "../../hooks/useAuth";
import { Button } from "@mui/material";

const HomeHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="flex justify-between items-center w-full h-24 px-8 sm:px-12 md:px-20 lg:px-28 xl:px-36 2xl:px-48 border-b border-[#FFCCDD] dark:border-[#FFCCDD]">
      <div className="absolute top-0 left-0 -z-50 bg-[#fff5f8] dark:bg-[#fff5f8] opacity-50"></div>
      <div
        className=" flex justify-center items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={Logo} alt="HexaPink Logo" className="w-[50px] h-[40px]" />
        <h2 className="md:flex text-3xl font-semibold font-kanit hidden text-dark">
          HexaPink
        </h2>
        <h2 className="flex text-4xl font-kanit font-medium lg:hidden"></h2>
      </div>
      {location.pathname == "/" && (
        <div className="flex justify-center items-center gap-3 lg:hidden z-10">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to={"/admin"}>
                <Button variant="contained">Dashboard</Button>
              </Link>
              <button onClick={logout} className="text-dark">
                Logout
              </button>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      )}
      {location.pathname == "/login" && (
        <div className="flex justify-center items-center gap-3 lg:hidden z-10">
          <CreateAccountButton_M onClick={() => navigate("/signup")}>
            <span>Create Account</span>
          </CreateAccountButton_M>
        </div>
      )}
      {location.pathname == "/" && (
        <div className="lg:flex justify-center items-center gap-7 hidden">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to={"/admin"}>
                <Button variant="contained" color="secondary">Dashboard</Button>
              </Link>
              <Button onClick={logout} className="text-dark" variant="outlined">
                Logout
              </Button>
            </div>
          ) : (
            <>
              <HexagonLoginButton
                active={true}
                onClick={() => navigate("/login")}
              >
                <span>Log In</span>
              </HexagonLoginButton>
              <HexagonSignupButton
                active={true}
                onClick={() => navigate("/signup")}
              >
                <span>Create Account</span>
              </HexagonSignupButton>
            </>
          )}
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
          <img src={Home_M} alt="" width={50} onClick={() => navigate("/")} />
          <LoginButton onClick={() => navigate("/login")}>
            <span>Log In</span>
          </LoginButton>
        </div>
      )}
    </div>
  );
};

export default HomeHeader;
