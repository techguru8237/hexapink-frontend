import { useState } from "react";
import FaqIcon from "../../assets/TheHomePage/image/feq_icon.png"
// import Image from "next/image";
import "../../style/TheHomePage/font.css";
const faqData = [
  {
    question: "What do you think about this design?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    question: "What do you think about this design?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    question: "What do you think about this design?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];
export default function HomeSectionEight() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
    console.log("---------------faq is clicked------------------")
  };
  return (
    <div className="w-full bg-[#FFF5F8] h-[700px] flex justify-center items-center">
      <div className="lg:w-[70%] w-[90%] flex flex-col justify-start items-start">
        <div className="w-full flex flex-col justify-start items-start">
          <h1 className="font-[kanit-bold] lg:text-[40px] text-[24px] select-none tracking-wider">
            Any questions? Here some answers
          </h1>
          <p className="font-[raleway-medium] lg:text-[20px] text-[12px] text-[#666666] select-none tracking-wider">
            If you have more questions, send an email to Contact@hexapink.com
          </p>
        </div>
        <div className="lg:p-4 p-2 w-full">
          {faqData.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className="w-full text-left lg:p-4 p-2 bg-transparent border-b border-[#E6E6E6] focus:outline-none flex justify-between items-center"
                onClick={() => toggleFaq(index)}
              >
                <span className="font-[raleway-semibold] lg:text-[24px] text-[14px]">{faq.question}</span>
                <img src={FaqIcon} alt="faqicon" />   
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? "max-h-screen" : "max-h-0"
                }`}
              >
                <div className="lg:p-4 p-2 bg-transparent mt-2 lg:text-[20px] text-[12px] text-[#666666] font-[raleway-medium]">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
