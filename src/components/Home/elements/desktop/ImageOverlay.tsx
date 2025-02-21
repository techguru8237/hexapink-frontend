import React from "react";
import "../../../../style/TheHomePage/style.css"; 

interface OverlayImageProps {
  overlayText: string; 
}

const OverlayImage: React.FC<OverlayImageProps> = ({ overlayText }) => {
  return <div className="overlay-text">{overlayText}</div>;
};

export default OverlayImage;
