import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BlinkEyes from "../components/animation/BlinkEyes";

const PADBlink = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const navigate = useNavigate();
    const [stream, setStream] = useState(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [capturedPhotos, setCapturedPhotos] = useState([]);
    const [showPreview, setShowPreview] = useState(true);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [hintText, setHintText] = useState("請拉近手機與眼睛的距離");

    const totalPhotos = 10;
    const captureDuration = 5000; 

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
            // justifyContent: "center",
            alignItems: "center",
        },
        animationContainer: {
            position: "relative",
            marginTop: "150px",
            width: "18rem",
            height: "10rem",
            borderRadius: "9999px",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "10px solid #e5e5e5",
            overflow: "hidden",
        },
        cameraContainer: {
            position: "relative",
            marginTop: "150px",
            width: "18rem",
            height: "10rem",
            borderRadius: "9999px",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "10px solid #e5e5e5",
            overflow: "hidden",
        },
        cameraView: {
            width: "100%",
            height: "100%",
            objectFit: "cover",
        },
        hintText: {
            marginTop: "16px",
            textAlign: "center",
            fontSize: "1.5rem",
            fontWeight: "500",
            color: "#444",
        },
        smallText: {
            fontSize: "0.9rem",
            color: "#777",
            marginTop: "8px",
        },
        startButtonContainer: {
            marginTop: "20px",
            height: "3rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        startButton: {
            position: "absolute",
            bottom: "10%",
            padding: "10px 20px",
            width: "275px",
            fontSize: "1.2rem",
            borderRadius: "5px",
            backgroundColor: "orange",
            color: "white",
            border: "none",
            cursor: "pointer",
            opacity: isButtonDisabled ? 0.5 : 1,
            pointerEvents: isButtonDisabled ? "none" : "auto",
        },
    };

    useEffect(() => {
        console.log(`UUID: ${userUUID}`);
    }, []) 

    useEffect(() => {
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [stream]);

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

    const capturePhoto = (count) => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext("2d");
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
            const imageData = canvasRef.current.toDataURL("image/png");
            setCapturedPhotos(prev => [...prev, imageData]);
        }
    };

    const startCapturing = async () => {
        setShowPreview(false);
        setIsCapturing(true);

        console.log("Starting camera...");
        await startCamera();
        console.log("Camera started and capturing in progress");

        let count = 0;
        const interval = setInterval(() => {
            if (count < totalPhotos) {
                capturePhoto(count);
                console.log(`Captured photo ${count + 1}/10`);
                count++;
            } else {
                clearInterval(interval);
                setHintText("拍攝完成");
                setTimeout(() => {
                    navigate("/endpage"); 
                }, 1000);
            }
        }, captureDuration / totalPhotos);
    };

    useEffect(() => {
        if (capturedPhotos.length === 10) {
            console.log("All captured photos:", capturedPhotos);
        }
    }, [capturedPhotos]); 

    useEffect(() => {
        setTimeout(() => {
            setIsButtonDisabled(false);
        }, 2000); 
    }, []);

    const buttonAction = () => {
        setShowPreview(false);
        startCapturing();
    };

    return (
        showPreview ? (
            <div style={styles.container}>
                <div style={styles.animationContainer}>
                    <BlinkEyes />  
                </div>
                <div style={styles.hintText}>
                    <p>{hintText}</p>
                    <p>對著鏡頭慢眨眨眼</p>
                    <p style={styles.smallText}>請移除口罩、帽子或墨鏡等任何遮住臉的物品</p>
                </div>
                <button style={styles.startButton} onClick={buttonAction}>換我試試看</button>
            </div>
        ) : (
            <div style={styles.container}>
                <div style={styles.cameraContainer}>
                    <video ref={videoRef} autoPlay playsInline style={styles.cameraView} />
                </div>
                <div style={styles.hintText}>
                    <p>{hintText}</p>
                    {hintText != "拍攝完成" && 
                    <><p>對著鏡頭慢眨眨眼</p>
                    <p style={styles.smallText}>請移除口罩、帽子或墨鏡等任何遮住臉的物品</p></>
                    }
                </div>
                <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
            </div>
        )    
    );
};

export default PADBlink;
