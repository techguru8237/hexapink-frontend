import HomeHeader from "../components/TheHomePage/HomeHeader";
import BackgroundImage1 from "../assets/TheHomePage/image/bg1.svg";
import ResetPasswordPageMain from "../components/ResetPassword/ResetPasswordPageMain";

export default function ResetPasswordPage() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute left-0 top-0 -z-10">
        <img src={BackgroundImage1} alt="" />
      </div>
      <HomeHeader />
      <ResetPasswordPageMain />
    </div>
  );
}
