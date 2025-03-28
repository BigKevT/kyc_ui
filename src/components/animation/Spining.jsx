import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/animation/loading.json"; // Import your Lottie JSON file

const Spining = () => {
  return (
    <div style={{ width: 100, height: 100 }}> {/* Adjust size as needed */}
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default Spining;
