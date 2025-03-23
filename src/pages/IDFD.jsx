import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CardHintTop from "../components/animation/CardHintTop";
import HandFlipTop from "../components/animation/HandFlipTop";

const IDFD = ({ arg }) => {
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [capturedPhotos, setCapturedPhotos] = useState([]);
    const [isStarted, setIsStarted] = useState(false)
    const [isCapturing, setIsCapturing] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const navigate = useNavigate();

    //use the same UUID
    const location = useLocation();
    const userUUID = location.state?.uuid || sessionStorage.getItem("userUUID");

    const styles = {
        container: {
            position: "fixed",
            top: 0,
            left: 0,
            display: "flex",
            flexDirection: "column",
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
        hintTextContainer: {
            position: "absolute",
            top: "10%",
            color: "white",
            textAlign: "center",
            fontSize: "1.5rem",
            lineHeight: "1.5",
            height: "3rem", // Fixed height to prevent shifting
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        startButtonContainer: {
            marginTop: "20px",
            height: "3rem", // Fixed height to prevent layout shift
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
            opacity: isButtonDisabled ? 0.5 : 1, // Dim button when disabled
            pointerEvents: isButtonDisabled ? "none" : "auto", // Disable clicks when disabled
        },
        animationWrapper: {
            marginTop: "180px",
            marginBottom: "30px",
            width: isStarted ? "150px" : "96vw",
            height: isStarted ? "80px" : "280px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "5px dashed orange",
            borderRadius: "10%"
        }, 
    };

    useEffect(() => {
        console.log(`UUID: ${userUUID}`);
    }, []) 
    
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

        if (isStarted) startCamera();
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [isStarted]);

    // Disable button for first 3 seconds
    useEffect(() => {
        setTimeout(() => {
            setIsButtonDisabled(false);
        }, 3000); 
    }, []);

    useEffect(() => {
        if (!isCapturing) return;

        let count = 0;
        const capturePhoto = () => {
            if (videoRef.current) {
                const videoElement = videoRef.current;
                const videoWidth = videoElement.videoWidth;
                const videoHeight = videoElement.videoHeight;

                const offscreenCanvas = document.createElement("canvas");
                const context = offscreenCanvas.getContext("2d");
                offscreenCanvas.width = videoWidth;
                offscreenCanvas.height = videoHeight;
                context.drawImage(videoElement, 0, 0, videoWidth, videoHeight);

                const imageData = offscreenCanvas.toDataURL("image/png");
                setCapturedPhotos(prev => [...prev, imageData]);
            }
        };

        const interval = setInterval(() => {
            if (count < 10) {
                capturePhoto();
                console.log(`Captured photo ${count + 1}/10`)
                count++;
            } else {
                clearInterval(interval);
                setIsCapturing(false);
                console.log("all set")
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isCapturing]);

    useEffect(() => {
        if (capturedPhotos.length === 10) {
            console.log("All captured photos:", capturedPhotos);
        }
    }, [capturedPhotos]);

    // button function
    const buttonAction = () => {
        setIsCapturing(true);
        setIsStarted(true);
    }

    return (
        isStarted ? (
            //IDFD step 2
            <div style={styles.container}>
                <div style={styles.hintTextContainer}>
                    <p>請在框線中向{arg}翻轉您的身分證</p>
                </div>
                
                <div style={styles.animationWrapper}>
                    <CardHintTop />
                </div>   

                <div style={styles.videoWrapper}>
                    <video ref={videoRef} autoPlay playsInline style={styles.video} />
                </div>

                <div style={styles.startButtonContainer}>
                    {capturedPhotos.length === 10 && (
                        <button style={styles.startButton} onClick={() => navigate("/FV")}>
                            前往下一步
                        </button>
                    )}
                </div>
            </div>
        ) : (
            //IDFD step 1
            <div style={styles.container}>
            <div style={styles.hintTextContainer}>
                <p>請在框線中向{arg}翻轉您的身分證</p>
            </div>
            
            
            <div>
                <div style={styles.animationWrapper}><HandFlipTop /></div>
            </div>

            <div style={styles.startButtonContainer}>
    
                <button style={styles.startButton} onClick={buttonAction} disabled={isButtonDisabled}>
                    換我試試看
                </button>
            
            </div>
        </div>
        )
    );
};

export default IDFD;
