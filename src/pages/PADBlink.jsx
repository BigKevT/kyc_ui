import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FaceAnimation from "../components/FaceAnimation";

const PADBlink = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const navigate = useNavigate();
    const [stream, setStream] = useState(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [showPreview, setShowPreview] = useState(true);
    const [hintText, setHintText] = useState("請對著鏡頭眨眨眼");
    const [progress, setProgress] = useState(0);
    const totalPhotos = 10;
    const captureDuration = 5000; // 5 seconds
    
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
        width: "260px",
        height: "260px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      svgProgress: {
        position: "absolute",
        width: "270px",
        height: "270px",
        transition: "stroke-dashoffset 0.5s linear", // Ensure smooth progress bar animation
      },
      circleWrapper: {
        width: "250px",
        height: "250px",
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
      },
      startButtonContainer: {
        position: "absolute",
        bottom: "10%",
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
    setHintText("可以稍微眨慢一點");
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
          navigate("/Endpage"); // Navigate to next page after completion
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
        {/* <svg style={styles.svgProgress}>
          <circle cx="135" cy="135" r="125" stroke="lightgray" strokeWidth="10" fill="none" />
          <circle cx="135" cy="135" r="125" stroke="orange" strokeWidth="10" fill="none" 
            strokeDasharray="785" strokeDashoffset={`${785 - (progress / 100) * 785}`} 
            strokeLinecap="round" />
        </svg> */}
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

export default PADBlink;
