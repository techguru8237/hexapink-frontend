import HomeHeader from "../../components/Home/HomeHeader";
import BackgroundImage1 from "../../assets/TheHomePage/image/bg1.svg";
import SignupPageMain from "../../components/Signup/SignupPageMain";
export default function SignupPage() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute left-0 top-0 -z-10">
        <img src={BackgroundImage1} alt="" />
      </div>
      <HomeHeader />
      <SignupPageMain />
    </div>
  );
}
