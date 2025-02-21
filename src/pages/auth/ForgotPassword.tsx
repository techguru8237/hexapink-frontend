import HomeHeader from "../../components/Home/HomeHeader";
import BackgroundImage1 from "../../assets/TheHomePage/image/bg1.svg";
import ForgotPasswordPageMain from "../../components/ForgotPassword/ForgotPasswordPageMain";

export default function ForgotPassword() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute left-0 top-0 -z-10">
        <img src={BackgroundImage1} alt="" />
      </div>
      <HomeHeader />
      <ForgotPasswordPageMain />
    </div>
  );
}
