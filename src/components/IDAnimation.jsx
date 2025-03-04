import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/Lottie Lego.json"; // Import your Lottie JSON file

const IDAnimation = () => {
  return (
    <div style={{ width: 80, height: 80 }}> {/* Adjust size as needed */}
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default IDAnimation;
