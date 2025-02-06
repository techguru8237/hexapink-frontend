// import Image from "next/image";
import HomeHeader from "../components/TheHomePage/HomeHeader";
import BackgroundImage1 from "../assets/TheHomePage/image/bg1.svg";
import LoginPageMain from "../components/TheLoginPage/LoginPageMain";

export default function LoginPage() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute left-0 top-0 -z-10">
        <img src={BackgroundImage1} alt="" />
      </div>
      <HomeHeader />
      <LoginPageMain />
    </div>
  );
}
