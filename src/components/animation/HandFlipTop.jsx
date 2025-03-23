import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/animation/hands_flip_top.json"; // Import your Lottie JSON file

const HandFlipTop = () => {
  return (
    <div style={{ width: 300, height: 200 }}> {/* Adjust size as needed */}
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default HandFlipTop;
