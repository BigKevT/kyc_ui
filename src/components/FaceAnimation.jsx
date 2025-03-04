import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/face.json"; // Import your Lottie JSON file

const FaceAnimation = () => {
  return (
    <div style={{ width: 150, height: 150 }}> {/* Adjust size as needed */}
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default FaceAnimation;
