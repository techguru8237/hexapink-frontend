import React from "react";
import logoImg from '../../assets/TheHomePage/image/logo.svg'

const Loading: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 flex justify-center items-center w-full h-screen bg-white/90">
      <img src={logoImg} className="loading-text" />
    </div>
  );
};

export default Loading;

