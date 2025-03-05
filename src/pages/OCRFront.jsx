import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OCRFront = ({ arg }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate(); 
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const userStream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "environment", width: { ideal: window.innerWidth }, height: { ideal: window.innerHeight } } 
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

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      
      const imageDataUrl = canvasRef.current.toDataURL("image/png");
      navigate("/OCRReview", { state: { image: imageDataUrl } });
    }
  };

  const styles = {
    container : {
        position: "fixed",
        top: "0",
        left: "0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(0, 0, 0, 0.7)"
      }, 
    
      videoWrapper : {
        width: "90%",
        maxWidth: "500px",
        height: "30%",
        border: "4px solid green",
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
        marginTop: "20px",
        color: "white",
        textAlign: "center",
        fontSize: "1.5rem",
        lineHeight: "1.5"
      },

      hintTextBelow : {
        marginTop: "20px",
        color: "white",
        textAlign: "center",
        fontSize: "0.9rem",
        lineHeight: "1.5"
      },

      button : {
        marginTop: "20px",
        backgroundColor: "white",
        padding: "24px",
        borderRadius: "50%",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        cursor: "pointer" // ✅ Ensure it's clickable
      },
  };

  return (
    <div style={styles.container}>
      <div style={styles.hintTextAbove}>
        <p>在框線內完整拍攝身分證 {arg} </p>
      </div>
      <div style={styles.videoWrapper}>
        <video ref={videoRef} autoPlay playsInline style={styles.video} />
      </div>
      
      {/* Hint Text Below Camera View */}
      <div style={styles.hintTextBelow}>
        <p>畫面模擬身分證 對準鏡頭</p>
        <p>光線保持明亮 | 避免文字反光</p>
      </div>
      
      {/* Capture button */}
      <button style={styles.button} onClick={handleCapture}></button>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  );
};

export default OCRFront;
