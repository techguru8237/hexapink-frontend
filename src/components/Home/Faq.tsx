import { useState } from "react";
import FaqIcon from "../../assets/TheHomePage/image/feq_icon.png"
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
export default function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <div className="w-full px-8 sm:px-12 md:px-20 lg:px-28 xl:px-36 2xl:px-48 bg-[#FFF5F8] h-[600px] lg:h-[700px] flex justify-center items-center">
      <div className="w-full sm:w-3/4 flex flex-col justify-start items-start">
        <div className="w-full flex flex-col justify-start items-start gap-4">
          <h1 className="text-left font-kanit font-bold text-2xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl text-dark select-none tracking-wider">
            Any questions? Here some answers
          </h1>
          <p className="text-left font-raleway font-medium text-sm lg:text-xl text-light-dark select-none tracking-wider">
            If you have more questions, send an email to Contact@hexapink.com
          </p>
        </div>
        <div className="w-full mt-8">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`${
                activeIndex === index ? "border-b border-pink" : ""
              }`}
            >
              <div
                className="w-full text-left bg-transparent border-b border-[#E6E6E6] focus:outline-none flex justify-between items-center cursor-pointer"
                onClick={() => toggleFaq(index)}
              >
                <span className="font-raleway font-semibold text-md lg:text-2xl">
                  {faq.question}
                </span>
                <img src={FaqIcon} alt="faqicon" />
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? "max-h-screen" : "max-h-0"
                }`}
              >
                <div className="bg-transparent py-2 text-sm lg:text-xl text-light-dark text-left font-raleway font-medium">
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
