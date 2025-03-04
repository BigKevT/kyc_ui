import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ Added missing import

const OCRReview = () => {
  const navigate = useNavigate(); // ✅ Fixed typo (navigete → navigate)
  const location = useLocation();
  const capturedImage = location.state?.image;
  
  const style = {
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
    button : {
      margin: "20px",
      backgroundColor: "orange",
      borderRadius: "10%",
    },
  };

  return (
    <div style={style.container}>
      <div style={style.videoWrapper}>
        {capturedImage ? (
          <img src={capturedImage} alt="Captured" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <p>No image captured.</p>
        )}
      </div>
      
      {/* Hint Text Below Camera View */}
      <div style={style.hintTextBelow}>
        <p>請確認您拍攝的照片、</p>
        <p>文字都是清楚容易辨識</p>
      </div>
      
      {/* Capture button */}
      <span>
        <button style={style.button} onClick={() => navigate(-1)}>重新拍攝</button>
        <button style={style.button} onClick={() => {
          if (capturedImage) {
            navigate("/FV");
          } else {
            alert("請先拍攝照片");
          }
        }}>送出</button>
      </span>
    </div>
  );
};

export default OCRReview;
