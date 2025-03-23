import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/animation/scanner_loading.json"; // Import your Lottie JSON file

const Scanner = () => {
  return (
    <div style={{ width: 300, height: 150 }}> {/* Adjust size as needed */}
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default Scanner;
