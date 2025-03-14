import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FVReview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const capturedImage = location.state?.image;
    //use the same UUID
    const userUUID = location.state?.uuid || sessionStorage.getItem("userUUID");

    //check UUID in console
    useEffect(() => {
        console.log(`UUID: ${userUUID}`);
    }, []) 

  const styles = {
    container: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "white",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    circleWrapperContainer: {
      position: "absolute",
      top: "35%",
      transform: "translateY(-50%)", // Ensures proper centering
      width: "310px",
      height: "310px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    circleWrapper: {
      width: "300px",
      height: "300px",
      borderRadius: "50%",
      border: "4px solid grey",
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    hintTextContainer: {
      position: "absolute",
      bottom: "20%",
      width: "100%",
      textAlign: "center",
    },
    hintText: {
      color: "black",
      fontSize: "1.5rem",
      lineHeight: "1.5",
    },
    buttonContainer: {
      position: "absolute",
      bottom: "15%",
      width: "100%",
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      gap: "20px",
    },
    button: {
      padding: "10px 20px",
      fontSize: "1.2rem",
      borderRadius: "5px",
      backgroundColor: "orange",
      color: "white",
      border: "none",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.circleWrapperContainer}>
        <div style={styles.circleWrapper}>
          {capturedImage ? (
            <img src={capturedImage} alt="Captured" style={styles.image} />
          ) : (
            <p>No image captured.</p>
          )}
        </div>
      </div>
      
      <div style={styles.hintTextContainer}>
        <p style={styles.hintText}>請確認拍攝的照片是否清晰</p>
      </div>
      
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => navigate(-1)}>重新拍攝</button>
        <button style={styles.button} onClick={() => navigate("/PADTurn")}>送出審核</button>
      </div>
    </div>
  );
};

export default FVReview;
