import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlinkEyes from "../components/animation/BlinkEyes";

const PADBlink = () => {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const [isStarted, setIsStarted] = useState(false);
    const [capturedPhotos, setCapturedPhotos] = useState([]);

    const styles = {
        container: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            overflow: "hidden",
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
        },
    };

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Error accessing camera: ", error);
            }
        };
        if (isStarted) startCamera();
    }, [isStarted]);

    useEffect(() => {
        if (!isStarted) return;

        let count = 0;
        const interval = setInterval(() => {
            if (count < 10 && videoRef.current) {
                const video = videoRef.current;
                const canvas = document.createElement("canvas");
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const photo = canvas.toDataURL("image/png");
                setCapturedPhotos(prev => [...prev, photo]);
                console.log(`Captured photo ${count + 1}/10`);
                count++;
            } else {
                clearInterval(interval);
                console.log("all set");
                console.log(capturedPhotos);
                navigate("/Endpage");
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isStarted]);

    const buttonAction = () => {
        setIsStarted(true);
    };

    return (
        isStarted ? (
            <div style={styles.container}>
                <div style={styles.cameraContainer}>
                    <video ref={videoRef} autoPlay playsInline style={styles.cameraView} />
                </div>
                <div style={styles.hintText}>
                    <p>請拉近手機與眼睛的距離</p>
                    <p>對著鏡頭慢眨眨眼</p>
                    <p style={styles.smallText}>請移除口罩、帽子或墨鏡等任何遮住臉的物品</p>
                </div>
            </div>
        ) : (
            <div style={styles.container}>
                <div style={styles.animationContainer}>
                    <BlinkEyes />   
                </div>
                <div style={styles.hintText}>
                    <p>請拉近手機與眼睛的距離</p>
                    <p>對著鏡頭慢眨眨眼</p>
                    <p style={styles.smallText}>請移除口罩、帽子或墨鏡等任何遮住臉的物品</p>
                </div>
                <button style={styles.startButton} onClick={buttonAction}>換我試試看</button>
            </div>
        )    
    );
};

export default PADBlink;
