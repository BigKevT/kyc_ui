// 待加入function：
// 1. 照片要傳到middleEnd
// 2. middleEnd回傳true/ false要可以終止這個IDFD流程
// 3. 向上、向右流程

import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CardHintTop from "../components/animation/CardHintTop";
import CardHintRight from "../components/animation/CardHintRight";
import HandFlipTop from "../components/animation/HandFlipTop";
import HandFlipRight from "../components/animation/HandFlipRight";
import Spining from "../components/animation/Spining";

const TestingIDFD = () => {
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [capturedPhotos, setCapturedPhotos] = useState([]);
    const [isStarted, setIsStarted] = useState(false);
    const [stage, setStage] = useState(1);
    const [isFinished, setIsFinished] = useState(false);
    const [isCapturing, setIsCapturing] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const navigate = useNavigate();

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
            border: "4px solid white",
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
            height: "3rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
        animationWrapper: {
            marginTop: isStarted ? "150px" : "180px",
            marginBottom: "30px",
            width: isStarted ? "150px" : "96vw",
            height: isStarted ? "80px" : "250px",
            maxWidth: "370px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "5px dashed orange",
            borderRadius: "8%"
        },
        LoadingWrapper: {
            width: "90%",
            maxWidth: "500px",
            height: "30%",
            border: "4px solid white",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
        },
    };

    useEffect(() => {
        console.log(`UUID: ${userUUID}`);
    }, []);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const userStream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "environment", width: { ideal: window.innerWidth }, height: { ideal: window.innerHeight } }
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = userStream;
                }
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
        if (capturedPhotos.length === 20 && stage === 2) {
            setIsFinished(true);
            console.log("All captured photos:", capturedPhotos);
        }
    }, [capturedPhotos, stage]);

    const buttonAction = (stageNum) => {
        setIsCapturing(true);
        setIsStarted(true);
        console.log(`start stage ${stageNum}`);
    };

    const moveToNextStage = () => {
        setStage(2);
        setIsStarted(false);
        setIsCapturing(false);
    };

    return (
        stage === 1 ? (
            isStarted ? (
                <div style={styles.container}>
                    <div style={styles.hintTextContainer}>
                        {capturedPhotos.length === 10 ? (<p>請點選下方按鈕前往下一步</p>) : (<p>請在框線中 向上下翻轉您的身分證</p>)}
                    </div>
                    <div style={styles.animationWrapper}><CardHintTop /></div>
                    <div style={styles.videoWrapper}><video ref={videoRef} autoPlay playsInline style={styles.video} /></div>
                    <div style={styles.startButtonContainer}>
                        {capturedPhotos.length === 10 && (
                            <button style={styles.startButton} onClick={moveToNextStage}>前往下一步</button>
                        )}
                    </div>
                </div>
            ) : (
                <div style={styles.container}>
                    <div style={styles.hintTextContainer}>
                        <p>請在框線中 向上下翻轉您的身分證</p>
                    </div>
                    <div><div style={styles.animationWrapper}><HandFlipTop /></div></div>
                    <div style={styles.startButtonContainer}>         
                        <button style={styles.startButton} onClick={() => buttonAction(1)} disabled={isButtonDisabled}>換我試試看</button>
                    </div>
                </div>
            )
        ) : (
            isStarted ? (
                isFinished ? (
                    <div style={styles.container}>
                        <div style={styles.hintTextContainer}><p>請稍後 身分證驗證中</p></div>
                        <div style={styles.animationWrapper}><CardHintRight /></div>
                        <div style={styles.LoadingWrapper}><Spining /></div>
                        <button style={styles.startButton} onClick={() => navigate("/FV")}>前往下一步</button>
                    </div>
                ) : (
                    <div style={styles.container}>
                        <div style={styles.hintTextContainer}><p>請在框線中 向右翻轉您的身分證</p></div>
                        <div style={styles.animationWrapper}><CardHintRight /></div>
                        <div style={styles.videoWrapper}><video ref={videoRef} autoPlay playsInline style={styles.video} /></div>
                    </div>
                )
            ) : (
                <div style={styles.container}>
                    <div style={styles.hintTextContainer}><p>請在框線中 向左右翻轉您的身分證</p></div>
                    <div><div style={styles.animationWrapper}><HandFlipRight /></div></div>
                    <div style={styles.startButtonContainer}>         
                        <button style={styles.startButton} onClick={() => buttonAction(2)} disabled={isButtonDisabled}>換我試試看</button>
                    </div>
                </div>
            )
        )
    );
};

export default TestingIDFD;
