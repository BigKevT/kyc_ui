import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import placeholder from "../assets/placeholder.jpg";

const FV = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const navigate = useNavigate();
    const [stream, setStream] = useState(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [showPreview, setShowPreview] = useState(true);

    useEffect(() => {
      // Hide preview image after 1 second
      const timer = setTimeout(() => {
        setShowPreview(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }, []);

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
      video: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block", // Ensure video shows immediately
      },
      previewImage: {
        position: "absolute",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity: "0.6",
        borderRadius: "50%"
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

    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCapturing = () => {
    setIsCapturing(true);
    console.log("image captured");
    
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      const video = videoRef.current;
      
      // Ensure the canvas captures only the circular area
      const size = Math.min(video.videoWidth, video.videoHeight);
      const startX = (video.videoWidth - size) / 2;
      const startY = (video.videoHeight - size) / 2;
      
      canvasRef.current.width = size;
      canvasRef.current.height = size;
      
      context.beginPath();
      context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      context.clip();
      
      context.drawImage(video, startX, startY, size, size, 0, 0, size, size);
      
      const imageDataUrl = canvasRef.current.toDataURL("image/png");
      navigate("/FVReview", { state: { image: imageDataUrl } });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.circleWrapperContainer}>
        <div style={styles.circleWrapper}>
          <video ref={videoRef} autoPlay playsInline style={styles.video} />
          {showPreview && <img src={placeholder} alt="Preview" style={styles.previewImage} />}
        </div>
      </div>
      
      <div style={styles.hintTextContainer}>
        <p style={styles.hintText}>請完整地將您的臉放在圓框內 <br/> 請勿遮擋臉部</p>
        <p>請移除口罩、帽子或墨鏡等遮住臉的物品</p>
      </div>

      <div style={styles.startButtonContainer}>
        {!isCapturing && (
          <button style={styles.startButton} onClick={startCapturing}>
            拍攝照片
          </button>
        )}
      </div>
      
      <canvas ref={canvasRef} style={styles.hiddenCanvas}></canvas>
    </div>
  );
};

export default FV;
