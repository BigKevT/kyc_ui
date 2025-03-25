// 待加入function：
// 1. 照片要傳到middleEnd
// 2. 正面拍完要換背面

import React, { useRef, useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import placeholder from "../assets/img/idcard_front.svg";
import RoundedButton from "../components/RoundedButton";


const OCRFront = ({ arg }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate(); 
  const [stream, setStream] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showPreview, setShowPreview] = useState(true);

  const location = useLocation();
  const userUUID = location.state?.uuid || sessionStorage.getItem("userUUID");

  const styles = {
    container : {
      position: "fixed",
      top: "0",
      left: "0",
      display: "flex",
      flexDirection: "column",
      // justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
      backgroundColor: isFinished ? "white" : "rgba(0, 0, 0, 0.7)" 
    },
    mainContainer : {
      marginTop: isFinished ? "160px" : "40px",
      padding: "0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      height: "100%"
    },
    videoWrapper : {
      width: "90%",
      maxWidth: "500px",
      height: "30%",
      border: isFinished ? "3px solid lightgrey" : "2px solid white",
      borderRadius: "10px",
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative"
    },
    video : {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    },
    hintTextAbove : {
      color: "white",
      textAlign: "center",
      fontSize: "1.5rem",
      lineHeight: "1.5"
    },
    hintTextBelow : {
      marginTop: "40px",
      color: isFinished ? "black" : "white",
      textAlign: "center",
      fontSize: isFinished ? "1.2rem" : "1rem",
      lineHeight: "1.5"
    },
    buttonContainer : {
      position: "absolute",
      bottom: "10%",
      display: "flex",
      justifyContent: "center",
      marginTop: "40px",
      paddingL: "0px"
    },
    button : {
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
    },
    previewImage: {
      position: "absolute",
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: "0.9",
      backgroundColor: "white"
    },
  };

  useEffect(() => {
    console.log(`UUID: ${userUUID}`);
  }, []);

  const startCamera = useCallback(async () => {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment", width: { ideal: window.innerWidth }, height: { ideal: window.innerHeight } } 
      });

      if (videoRef.current) {
        videoRef.current.srcObject = userStream;
      }

      setStream(userStream);
    } catch (err) {
      console.error("Error accessing camera: ", err);
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isFinished, startCamera]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreview(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [isFinished]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      const imageDataUrl = canvasRef.current.toDataURL("image/png");
      setCapturedImage(imageDataUrl);
      setIsFinished(true);
    }
  };

  const reTakePhoto = () => {
    setStream(null);
    setIsFinished(false);
    setCapturedImage(null);
    startCamera();
  };

  return (
    isFinished ? (
      <div style={styles.container}>
        <div style={styles.mainContainer}>
          <div style={styles.videoWrapper}>
            {capturedImage ? (
              <img src={capturedImage} alt="Captured" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <p>No image captured.</p>
            )}
          </div>

          <div style={styles.hintTextBelow}>
            <p>請確認您拍攝的照片中</p>
            <p>文字與圖片都是清晰容易辨識</p>
          </div>
        </div>
        <span style={styles.buttonContainer}>
          <button style={styles.buttonRetake} onClick={reTakePhoto}>重新拍攝</button>
          <button style={styles.button} onClick={() => {
            if (capturedImage) {
              // 圖片可上傳至 backend...
              navigate("/IDFD");
            } else {
              alert("請先拍攝照片");
            }
          }}>送出照片</button>
        </span>
      </div>
    ) : (
      <div style={styles.container}>
        <div style={styles.mainContainer}>
          <div style={styles.hintTextAbove}>
            <p>在框線內完整拍攝<br/>身分證{arg}面</p>
          </div>
          <div style={styles.videoWrapper}>
            <video ref={videoRef} autoPlay playsInline style={styles.video} />
            {showPreview && <img src={placeholder} alt="Preview" style={styles.previewImage} />}
          </div>

          <div style={styles.hintTextBelow}>
            <p>光線保持明亮 | 避免文字反光</p>
          </div>
        </div>

        {/* <button style={styles.button} onClick={handleCapture}>拍攝照片</button> */}
        <div style={styles.buttonContainer}>
          <RoundedButton borderColor={"white"} color={"white"} funciton={handleCapture} />
        </div>
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      </div>
    )
  );
};

export default OCRFront;
