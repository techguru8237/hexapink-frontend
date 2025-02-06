import HomeHeader from "../components/TheHomePage/HomeHeader";
import BackgroundImage1 from "../assets/TheHomePage/image/bg1.svg";
import HomeSectionOne from "../components/TheHomePage/HomeSectionOne";
import HomeSectionTwo from "../components/TheHomePage/HomeSectionTwo";
import HomeSectionThree from "../components/TheHomePage/HomeSectionThree";
import HomeSectionFour from "../components/TheHomePage/HomeSectionFour";
import HomeSectionFive from "../components/TheHomePage/HomeSectionFive";
import HomeSectionSix from "../components/TheHomePage/HomeSectionSix";
import HomeSectionSeven from "../components/TheHomePage/HomeSectionSeven";
import HomeSectionEight from "../components/TheHomePage/HomeSectionEight";
import HomeSectionNine from "../components/TheHomePage/HomeSectionNine";

export default function HomePage() {
  return (
    <div className="w-full h-auto relative">
      <div className="absolute left-0 top-0 -z-10">
        <img src={BackgroundImage1} alt="" />
      </div>    
      <HomeHeader />
      <HomeSectionOne />
      <HomeSectionTwo />
      <HomeSectionThree />
      <HomeSectionFour />
      <HomeSectionFive />
      <HomeSectionSix />
      <HomeSectionSeven />
      <HomeSectionEight />
      <HomeSectionNine />
    </div>
  );
}
