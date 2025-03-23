// 待加入function：
// 1. 照片要傳到middleEnd
// 2. 正面拍完要換背面

import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 

const OCRReview = () => {
  const navigate = useNavigate(); 
  const location = useLocation();
  const capturedImage = location.state?.image;
  //use the same UUID
  const userUUID = location.state?.uuid || sessionStorage.getItem("userUUID");
  
  const styles = {
    container: {
      position: "fixed",
      top: "0",
      left: "0",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
      backgroundColor: "white"
    }, 
    videoWrapper : {
      width: "90%",
      maxWidth: "500px",
      height: "30%",
      backgroundColor: "lightgreen",
      borderRadius: "10px",
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative"
    },
    hintTextBelow : {
      marginTop: "20px",
      color: "black",
      textAlign: "center",
      fontSize: "0.9rem",
      lineHeight: "1.5"
    },
    buttonContainer : {
      marginTop: "30px",
      paddingL: "0px"
    },
    buttonSend : {
      margin: "20px",
      padding: "10px",
      width: "100px",
      backgroundColor: "orange",
      color: "white",
    },
    buttonRetake : {
      margin: "20px",
      padding: "10px",
      width: "100px",
      backgroundColor: "red",
      color: "white",
    }
  };

    //check UUID in console
    useEffect(() => {
      console.log(`UUID: ${userUUID}`);
    }, []) 


  return (
    <div style={styles.container}>
      <div style={styles.videoWrapper}>
        {capturedImage ? (
          <img src={capturedImage} alt="Captured" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <p>No image captured.</p>
        )}
      </div>
      
      {/* Hint Text Below Camera View */}
      <div style={styles.hintTextBelow}>
        <p>請確認您拍攝的照片、</p>
        <p>文字都是清楚容易辨識</p>
      </div>
      
      {/* Capture button */}
      <span style={styles.buttonContainer}>
        <button style={styles.buttonRetake} onClick={() => navigate(-1)}>重新拍攝</button>
        <button style={styles.buttonSend} onClick={() => {
          if (capturedImage) {

            {/* 把圖傳到ekyc Backend Function 等待確認無反光後，才可進到IDFD流程 */}

            navigate("/IDFD");
          } else {
            alert("請先拍攝照片");
          }
        }}>送出</button>
      </span>
    </div>
  );
};

export default OCRReview;
