import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/animation/card_right.json"; // Import your Lottie JSON file

const CardHintRight = () => {
  return (
    <div style={{ width: 100 }}> {/* Adjust size as needed */}
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default CardHintRight;
