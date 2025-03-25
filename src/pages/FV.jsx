import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import placeholder from "../assets/img/img_face.svg";
import RoundedButton from "../components/RoundedButton";


const FV = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const navigate = useNavigate();
    const [stream, setStream] = useState(null);
    const [isFinished, setIsFinished] = useState(false);
    const [isCapturing, setIsCapturing] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [showPreview, setShowPreview] = useState(true);
    const location = useLocation();
    const userUUID = location.state?.uuid || sessionStorage.getItem("userUUID");

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
      mainContainer : {
        marginTop: "40px",
        padding: "0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%"
      },
      circleWrapperContainer: {
        position: "absolute",
        top: "35%",
        transform: "translateY(-50%)",
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
        display: "block",
      },
      previewImage: {
        position: "absolute",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity: "0.8",
        borderRadius: "50%",
        backgroundColor: "white"
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
        display: "flex",
        justifyContent: "center",
        bottom: "5%",
        width: "100%",
        textAlign: "center",
      },
      startButtonBorder : {
        width: "60px",
        height: "60px",
        border: "solid",
        borderColor: "FF6700",
        backgroundColor: "rgba(0,0,0,0.5)"
      },
      startButton: {
        padding: "10px 20px",
        width: "58px",
        height: "58px",
        fontSize: "1.2rem",
        border: "solid",
        borderRadius: "50px",
        backgroundColor: "#FF6700",
        cursor: "pointer",
      },
      hiddenCanvas: {
        display: "none",
      },
      image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
      buttonContainer: {
        position: "absolute",
        bottom: "10%",
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

    useEffect(() => {
        console.log(`UUID: ${userUUID}`);
    }, []) 

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowPreview(false);
      }, 1000);
      return () => clearTimeout(timer);
    }, [isFinished]);

    useEffect(() => {
      const startCamera = async () => {
        try {
          const userStream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: "user", width: { ideal: window.innerWidth }, height: { ideal: window.innerHeight } }
          });

          if (videoRef.current) {
            videoRef.current.srcObject = userStream;
          }

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
    }, [isFinished]);

    const startCapturing = () => {
      setIsCapturing(true);
      setIsFinished(true);
      console.log("image captured");

      if (videoRef.current && canvasRef.current) {
        const context = canvasRef.current.getContext("2d");
        const video = videoRef.current;

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
        setCapturedImage(imageDataUrl);
        setIsCapturing(true);
      }
    };

    const reTakePhoto = () => {
      setIsFinished(false);
      setCapturedImage(null);
      setIsCapturing(false);
      setStream(null);
      setShowPreview(true);
    };

    return (
      isFinished ? (
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
            <button style={styles.button} onClick={reTakePhoto}>重新拍攝</button>
            <button style={styles.button} onClick={() => navigate("/PADTurn")}>送出審核</button>
          </div>
        </div>
      ) : (
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
              // <button style={styles.startButton} onClick={startCapturing}></button>
              <RoundedButton borderColor={"#FF6700"} color={"#FF6700"} funciton={startCapturing} />
            )}
          </div>

          <canvas ref={canvasRef} style={styles.hiddenCanvas}></canvas>
        </div>
      )
    );
};

export default FV;
