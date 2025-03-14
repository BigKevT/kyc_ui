import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FaceAnimation from "../components/FaceAnimation";

const PADTurn = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const navigate = useNavigate();
    const [stream, setStream] = useState(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [showPreview, setShowPreview] = useState(true);
    const [hintText, setHintText] = useState([
      "請完整地將您的臉放在圓框內",
      <br key="break" />,
      "請勿遮擋臉部",
    ]);
    const [progress, setProgress] = useState(0);
    const totalPhotos = 10;
    const captureDuration = 5000; 

    //use the same UUID
    const location = useLocation();
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
      svgProgress: {
        position: "absolute",
        width: "320px",
        height: "320px",
        transition: "stroke-dashoffset 0.5s linear", // Ensure smooth progress bar animation
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
      video: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block", // Ensure video shows immediately
      },
      animationWrapper: {
        position: "absolute",
        width: "100%",
        height: "100%",
        display: showPreview ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
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
        padding: "15px"
      },
      startButtonContainer: {
        position: "absolute",
        bottom: "15%",
        width: "100%",
        textAlign: "center",
      },
      startButton: {
        padding: "10px 20px",
        fontSize: "1.2rem",
        borderRadius: "5px",
        backgroundColor: "orange",
        color: "white",
        border: "none",
        cursor: "pointer",
      },
      hiddenCanvas: {
        display: "none",
      },
    };
    
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop()); // Stop camera when unmounting
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user", width: { ideal: window.innerWidth }, height: { ideal: window.innerHeight } }
      });
      videoRef.current.srcObject = userStream;
      setStream(userStream);
    } catch (err) {
      console.error("Error accessing camera: ", err);
    }
  };

  const capturePhoto = (count) => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      console.log(`Captured photo ${count + 1}`);
    }
  };

  const startCapturing = async () => {
    setShowPreview(false);
    setIsCapturing(true);
    setHintText([
      "請先看一下左邊",
      <br key="break" />,
      "再看一下右邊"
    ])
    console.log("Starting camera...");
    await startCamera();
    console.log("Camera started and capturing in progress");

    let count = 0;
    const interval = setInterval(() => {
      if (count < totalPhotos) {
        capturePhoto(count);
        setProgress((prev) => prev + (100 / totalPhotos));
        count++;
      } else {
        clearInterval(interval);
        setHintText("拍攝完成");
        setProgress(100);
        setTimeout(() => {
          navigate("/PADBlink"); 
        }, 1000); // Delay before navigating
      }
    }, captureDuration / totalPhotos);
  };

  return (
    <div style={styles.container}>
      <div style={styles.hintTextContainer}>
        <p style={styles.hintText}>{hintText}</p>
      </div>
      
      <div style={styles.circleWrapperContainer}>
        <svg style={styles.svgProgress}>
          <circle cx="160" cy="160" r="150" stroke="lightgray" strokeWidth="10" fill="none" />
          <circle cx="160" cy="160" r="150" stroke="orange" strokeWidth="10" fill="none" 
            strokeDasharray="945" strokeDashoffset={`${945 - (progress / 100) * 945}`} 
            strokeLinecap="round" />
        </svg>
        <div style={styles.circleWrapper}>
          <video ref={videoRef} autoPlay playsInline style={styles.video} />
          {showPreview && <div style={styles.animationWrapper}><FaceAnimation /></div>}
        </div>
      </div>

      <div style={styles.startButtonContainer}>
        {!isCapturing && <button style={styles.startButton} onClick={startCapturing}>開始拍攝</button>}
      </div>
      <canvas ref={canvasRef} style={styles.hiddenCanvas}></canvas>
    </div>
  );
};

export default PADTurn;
