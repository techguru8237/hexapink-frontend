import React, { useRef } from "react";
import { HiOutlineLockClosed } from "react-icons/hi";
import "../../../style/TheLoginPage/style.css";

const ResetPasswordButtonM: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
}> = ({ onClick, children }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const handleMouseEnterCustom = () => {
    if (svgRef.current) {
      const paths = svgRef.current.querySelectorAll("path");
      paths.forEach((path) => {
        path.setAttribute("stroke", "#FF6699"); // Change to your desired hover color
      });
    }
  };
  const handleMouseLeaveCustom = () => {
    if (svgRef.current) {
      const paths = svgRef.current.querySelectorAll("path");
      paths.forEach((path) => {
        path.setAttribute("stroke", "white"); // Change to your desired hover color
      });
    }
  };
  return (
    <div className="reset-password-button-mobile border" onClick={onClick}>
      <div
        className="flex justify-center items-center gap-2"
        onMouseEnter={handleMouseEnterCustom}
        onMouseLeave={handleMouseLeaveCustom}
      >
        <HiOutlineLockClosed />
        {children}
      </div>
    </div>
  );
};

export default ResetPasswordButtonM;
