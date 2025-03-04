import React, { useRef, useEffect, useState } from "react";
import IDAnimation from "../components/IDAnimation";

const IDFD = ({ arg }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [capturedPhotos, setCapturedPhotos] = useState([]);
    const [isCapturing, setIsCapturing] = useState(false);
    
    const styles = {
      container: {
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        overflow: "hidden",
      },
      videoWrapper: {
        width: "90%",
        maxWidth: "500px",
        height: "30%",
        border: "4px solid green",
        borderRadius: "10px",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      },
      video: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
      hintText: {
        marginTop: "20px",
        color: "white",
        textAlign: "center",
        fontSize: "1.5rem",
        lineHeight: "1.5",
      },
      capturedPhotoContainer: {
        marginTop: "20px",
        textAlign: "center",
        display: "flex",
        overflowX: "auto",
        whiteSpace: "nowrap",
        width: "90%",
        maxWidth: "500px",
        height: "30%", // Ensure the same height as videoWrapper
        border: "4px solid green",
        borderRadius: "10px",
        padding: "10px",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        alignItems: "center",
      },
      capturedPhoto: {
        height: "100%", // Maintain aspect ratio without stretching
        objectFit: "contain",
        borderRadius: "10px",
        border: "2px solid white",
        marginRight: "10px",
      },
      startButton: {
        marginTop: "20px",
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

  useEffect(() => {
    if (!isCapturing) return;
    let count = 0;
    const capturePhoto = () => {
      if (videoRef.current && canvasRef.current) {
        const context = canvasRef.current.getContext("2d");
        const videoWidth = videoRef.current.videoWidth;
        const videoHeight = videoRef.current.videoHeight;
        const wrapperWidth = videoRef.current.clientWidth;
        const wrapperHeight = videoRef.current.clientHeight;

        // Set canvas to match the exact size of the videoWrapper
        canvasRef.current.width = wrapperWidth;
        canvasRef.current.height = wrapperHeight;
        
        context.drawImage(
          videoRef.current,
          0,
          videoHeight * 0.35, // Adjusted Y to match 30% height
          videoWidth,
          videoHeight * 0.3,
          0,
          0,
          wrapperWidth,
          wrapperHeight
        );
        
        // Convert canvas to image URL
        const imageData = canvasRef.current.toDataURL("image/png");
        setCapturedPhotos(prev => [...prev, imageData]);
      }
    };
    
    const interval = setInterval(() => {
      if (count < 10) {
        capturePhoto();
        count++;
      } else {
        clearInterval(interval);
        setIsCapturing(false);
      }
    }, 1000); // Capture a photo every second for 10 seconds

    return () => clearInterval(interval);
  }, [isCapturing]);

  return (
    <div style={styles.container}>
      
      {/* Hint Text Above Camera View */}
      <div style={styles.hintText}>
        <p>請在框框線中向{arg}翻轉您的身分證</p>
      </div>

      {isCapturing && (
        <IDAnimation />
      )}
      
      <div style={styles.videoWrapper}>
        <video ref={videoRef} autoPlay playsInline style={styles.video} />
      </div>
      
      {!isCapturing && (
        <button style={styles.startButton} onClick={() => setIsCapturing(true)}>
          換我試試看
        </button>
      )}

      {/* Captured Photo Slider */}
      {capturedPhotos.length > 0 && (
        <div style={styles.capturedPhotoContainer}>
          {capturedPhotos.map((photo, index) => (
            <img key={index} src={photo} alt={`Captured ${index + 1}`} style={styles.capturedPhoto} />
          ))}
        </div>
      )}
      
      {/* Canvas for Capturing Photo */}
      <canvas ref={canvasRef} style={styles.hiddenCanvas}></canvas>
    </div>
  );
};

export default IDFD;
