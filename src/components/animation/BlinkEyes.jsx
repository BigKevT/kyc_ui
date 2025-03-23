import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/animation/close_eye.json"; // Import your Lottie JSON file

const BlinkEyes = () => {
  return (
    <div style={{ width: 150, height: 50 }}> {/* Adjust size as needed */}
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default BlinkEyes;
