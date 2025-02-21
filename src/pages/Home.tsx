import HomeHeader from "../components/Home/HomeHeader";
import Hero from "../components/Home/Hero";
import Features from "../components/Home/Features/Features";
import Testimonical from "../components/Home/Testimonical";
import NavigationGuide from "../components/Home/NavigationGuide";
import RecommendedCollections from "../components/Home/RecommendedCollections";
import Faq from "../components/Home/Faq";
import ContactUs from "../components/Home/ContactUs";

import BackgroundImage1 from "../assets/TheHomePage/image/bg1.svg";

export default function HomePage() {
  return (
    <div className="w-full h-auto relative">
      <div className="absolute left-0 top-0 -z-10">
        <img src={BackgroundImage1} alt="" />
      </div>    
      <HomeHeader />
      <Hero />
      <Features />
      <Testimonical />
      <NavigationGuide />
      <RecommendedCollections />
      <Faq />
      <ContactUs />
    </div>
  );
}
