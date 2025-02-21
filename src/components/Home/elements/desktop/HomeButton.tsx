import React, { useRef } from "react";
import "../../../../style/TheHomePage/style.css";

const HomeButton: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
}> = ({ onClick, children }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const handleMouseEnterLogin = () => {
    if (svgRef.current) {
      const paths = svgRef.current.querySelectorAll("path");
      paths.forEach((path) => {
        path.setAttribute("stroke", "#FFCCDD"); // Change to your desired hover color
      });
    }
  };
  const handleMouseLeaveLogin = () => {
    if (svgRef.current) {
      const paths = svgRef.current.querySelectorAll("path");
      paths.forEach((path) => {
        path.setAttribute("stroke", "#333333"); // Default color
      });
    }
  };
  return (
    <div className="home-button border" onClick={onClick}>
      <div
        className="flex justify-center items-center gap-2"
        onMouseEnter={handleMouseEnterLogin}
        onMouseLeave={handleMouseLeaveLogin}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_98_5111)">
            <path
              d="M9.75 20.25V14.25H14.25V20.25H20.25V11.25C20.2501 11.1515 20.2307 11.0539 20.1931 10.9628C20.1555 10.8718 20.1003 10.7891 20.0306 10.7194L12.5306 3.21935C12.461 3.14962 12.3783 3.0943 12.2872 3.05656C12.1962 3.01882 12.0986 2.99939 12 2.99939C11.9014 2.99939 11.8038 3.01882 11.7128 3.05656C11.6217 3.0943 11.539 3.14962 11.4694 3.21935L3.96938 10.7194C3.89975 10.7891 3.84454 10.8718 3.8069 10.9628C3.76926 11.0539 3.74992 11.1515 3.75 11.25V20.25H9.75Z"
              stroke="#333333"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_98_5111">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span>{children}</span>
      </div>
    </div>
  );
};

export default HomeButton;
