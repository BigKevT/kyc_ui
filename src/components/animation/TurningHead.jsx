import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/animation/turn_head.json"; // Import your Lottie JSON file


const TurningHead = () => {
  return (
    <div style={{ width: 250, height: 250}}> {/* Adjust size as needed */}
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default TurningHead;
