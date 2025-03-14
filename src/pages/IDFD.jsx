import React, { useRef, useEffect, useState } from "react";
import IDAnimation from "../components/IDAnimation";
import { useLocation, useNavigate } from "react-router-dom";

const IDFD = ({ arg }) => {
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [capturedPhotos, setCapturedPhotos] = useState([]);
    const [isCapturing, setIsCapturing] = useState(false);
    const navigate = useNavigate();
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
            if (videoRef.current) {
                const videoElement = videoRef.current;
                const videoWidth = videoElement.videoWidth;
                const videoHeight = videoElement.videoHeight;

                // Create an offscreen canvas dynamically
                const offscreenCanvas = document.createElement("canvas");
                const context = offscreenCanvas.getContext("2d");

                // Set canvas size to match the video
                offscreenCanvas.width = videoWidth;
                offscreenCanvas.height = videoHeight;

                // Draw the current video frame onto the canvas
                context.drawImage(videoElement, 0, 0, videoWidth, videoHeight);

                // Convert to image data URL
                const imageData = offscreenCanvas.toDataURL("image/png");

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
        }, 1000);

        return () => clearInterval(interval);
    }, [isCapturing]);

    return (
        <div style={styles.container}>
            <div style={styles.hintText}>
                <p>請在框線中向{arg}翻轉您的身分證</p>
            </div>

            {isCapturing && <IDAnimation />}

            <div style={styles.videoWrapper}>
                <video ref={videoRef} autoPlay playsInline style={styles.video} />
            </div>

            {!isCapturing && capturedPhotos.length < 10 && (
                <button style={styles.startButton} onClick={() => setIsCapturing(true)}>
                    換我試試看
                </button>
            )}

            {capturedPhotos.length === 10 && (
                <button style={styles.startButton} onClick={() => navigate("/FV")}>
                    前往下一步
                </button>
            )}
        </div>
    );
};

export default IDFD;
