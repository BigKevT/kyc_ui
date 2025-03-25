import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/animation/vertical.json"; // Import your Lottie JSON file

const HandFlipTop = () => {
  return (
    <div style={{ width: 350, height: 300 }}> {/* Adjust size as needed */}
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default HandFlipTop;
