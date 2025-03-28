import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/animation/horizontal.json"; // Import your Lottie JSON file

const HandFlipRight = () => {
  return (
    <div style={{ width: 330 }}> {/* Adjust size as needed */}
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default HandFlipRight;
