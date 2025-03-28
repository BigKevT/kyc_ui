// 待加入function：
// 1. 照片要傳到middleEnd
// 2. middleEnd回傳true/ false要可以終止這個IDFD流程
// 3. 向上、向右流程

import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CardHintTop from "../components/animation/CardHintTop";
import HandFlipTop from "../components/animation/HandFlipTop";
import Spining from "../components/animation/Spining";
import placeholder from "../assets/img/img_face.svg";
import RoundedButton from "../components/RoundedButton";


const Testing = ({ arg }) => {
//     const videoRef = useRef(null);
//     const [stream, setStream] = useState(null);
//     const [capturedPhotos, setCapturedPhotos] = useState([]);
//     const [isStarted, setIsStarted] = useState(false);
//     const [isFinished, setIsFinished] = useState(false);
//     const [isCapturing, setIsCapturing] = useState(false);
//     const [isButtonDisabled, setIsButtonDisabled] = useState(true);
//     const navigate = useNavigate();

//     //use the same UUID
//     const location = useLocation();
//     const userUUID = location.state?.uuid || sessionStorage.getItem("userUUID");

//     const styles = {
//         container: {
//             position: "fixed",
//             top: 0,
//             left: 0,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             height: "100vh",
//             width: "100vw",
//             backgroundColor: "rgba(0, 0, 0, 0.8)",
//         },
//         videoWrapper: {
//             width: "90%",
//             maxWidth: "500px",
//             height: "30%",
//             border: "4px solid white",
//             borderRadius: "10px",
//             overflow: "hidden", 
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             position: "relative",
//         },
//         LoadingWrapper: {
//             width: "90%",
//             maxWidth: "500px",
//             height: "30%",
//             border: "4px solid white",
//             borderRadius: "10px",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             position: "relative",
//         },
//         video: {
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//         },
//         hintTextContainer: {
//             position: "absolute",
//             top: "10%",
//             color: "white",
//             textAlign: "center",
//             fontSize: "1.5rem",
//             lineHeight: "1.5",
//             height: "3rem", // Fixed height to prevent shifting
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//         },
//         startButtonContainer: {
//             marginTop: "20px",
//             height: "3rem", // Fixed height to prevent layout shift
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//         },
//         startButton: {
//             position: "absolute",
//             bottom: "10%",
//             padding: "10px 20px",
//             width: "275px",
//             fontSize: "1.2rem",
//             borderRadius: "5px",
//             backgroundColor: "orange",
//             color: "white",
//             border: "none",
//             cursor: "pointer",
//             opacity: isButtonDisabled ? 0.5 : 1, // Dim button when disabled
//             pointerEvents: isButtonDisabled ? "none" : "auto", // Disable clicks when disabled
//         },
//         animationWrapper: {
//             marginTop: isStarted ? "150px" : "180px",
//             marginBottom: "30px",
//             width: isStarted ? "150px" : "96vw",
//             height: isStarted ? "80px" : "250px",
//             maxWidth: "370px",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             border: "5px dashed orange",
//             borderRadius: "8%"
//         }, 
//         // LoadingWrapper: {
//         //     position: "fixed",
//         //     top: 0,
//         //     left: 0,
//         //     display: "flex",
//         //     flexDirection: "column",
//         //     justifyContent: "center",
//         //     alignItems: "center",
//         //     height: "100vh",
//         //     width: "100vw",
//         //     backgroundColor: "white",
//         //     overflow: "hidden",
//         //     opacity: "0.4",
//         //     zIndex: "5"
//         // },
//     };

//     useEffect(() => {
//         console.log(`UUID: ${userUUID}`);
//     }, []) 
    
//     useEffect(() => {
//         const startCamera = async () => {
//             try {
//                 const userStream = await navigator.mediaDevices.getUserMedia({
//                     video: { facingMode: "environment", width: { ideal: window.innerWidth }, height: { ideal: window.innerHeight } }
//                 });
//                 videoRef.current.srcObject = userStream;
//                 setStream(userStream);
//             } catch (err) {
//                 console.error("Error accessing camera: ", err);
//             }
//         };

//         if (isStarted) startCamera();
//         return () => {
//             if (stream) {
//                 stream.getTracks().forEach(track => track.stop());
//             }
//         };
//     }, [isStarted]);

//     // Disable button for first 3 seconds
//     useEffect(() => {
//         setTimeout(() => {
//             setIsButtonDisabled(false);
//         }, 3000); 
//     }, []);

//     useEffect(() => {
//         if (!isCapturing) return;

//         let count = 0;
//         const capturePhoto = () => {
//             if (videoRef.current) {
//                 const videoElement = videoRef.current;
//                 const videoWidth = videoElement.videoWidth;
//                 const videoHeight = videoElement.videoHeight;

//                 const offscreenCanvas = document.createElement("canvas");
//                 const context = offscreenCanvas.getContext("2d");
//                 offscreenCanvas.width = videoWidth;
//                 offscreenCanvas.height = videoHeight;
//                 context.drawImage(videoElement, 0, 0, videoWidth, videoHeight);

//                 const imageData = offscreenCanvas.toDataURL("image/png");
//                 setCapturedPhotos(prev => [...prev, imageData]);
//             }
//         };

//         const interval = setInterval(() => {
//             if (count < 10) {
//                 capturePhoto();
//                 console.log(`Captured photo ${count + 1}/10`)
//                 count++;
//             } else {
//                 clearInterval(interval);
//                 setIsCapturing(false);
//                 console.log("all set")
//             }
//         }, 1000);

//         return () => clearInterval(interval);
//     }, [isCapturing]);

//     //check all captured photos
//     useEffect(() => {
//         if (capturedPhotos.length === 10) {
//             console.log("All captured photos:", capturedPhotos);
//         }
//     }, [capturedPhotos]);

//     // button function
//     const buttonAction = () => {
//         setIsCapturing(true);
//         setIsStarted(true);
//     }

//     return (
//         isStarted ? (
//             //IDFD step 2 向上翻轉 
//             isFinished ? (
//                 <>  
//                     <div style={styles.container}>
//                         <div style={styles.hintTextContainer}>
//                             <p>請稍後 身分證驗證中</p>
//                         </div>
                        
//                         <div style={styles.animationWrapper}>
//                             <CardHintTop />
//                         </div>   

//                         {/* 等待backend回傳結果 */}
//                         <div style={styles.LoadingWrapper}>
//                             <Spining />
//                         </div>
//                         <button style={styles.startButton} onClick={() => navigate("/FV")}>
//                             前往下一步
//                         </button>
//                     </div>
//                 </>
//             ) : (
//                 <div style={styles.container}>
//                 <div style={styles.hintTextContainer}>
//                     <p>請在框線中 向{arg}翻轉您的身分證</p>
//                 </div>
                
//                 <div style={styles.animationWrapper}>
//                     <CardHintTop />
//                 </div>   

//                 <div style={styles.videoWrapper}>
//                     <video ref={videoRef} autoPlay playsInline style={styles.video} />
//                 </div>

//                 {capturedPhotos.length === 10 && (setIsFinished(true))}
//             </div>
//             )         
//         ) : (
//             //IDFD step 1 動畫說明
//             <div style={styles.container}>
//             <div style={styles.hintTextContainer}>
//                 <p>請在框線中向{arg}翻轉您的身分證</p>
//             </div>
            
            
//             <div>
//                 {/* <div style={styles.animationWrapper}><HandFlipTop /></div> */}
//                 <div style={styles.animationWrapper}><HandFlipTop /></div>
//             </div>

//             <div style={styles.startButtonContainer}>
    
//                 <button style={styles.startButton} onClick={buttonAction} disabled={isButtonDisabled}>
//                     換我試試看
//                 </button>
            
//             </div>
//         </div>
//         )
//     );





    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const navigate = useNavigate();
    const [stream, setStream] = useState(null);
    const [isFinished, setIsFinished] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
        LoadingWrapper: {
            position: "fixed",
            top: 0,
            left: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
            backgroundColor: "white",
            overflow: "hidden",
            opacity: "0.4",
            zIndex: "5"
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


    const sendPhotoBtn = () => {
        setIsLoading(true);
    };

    return (
      isFinished ? (
        isLoading ? (
            <div style={styles.container}>
                <div style={styles.LoadingWrapper}><Spining /></div>
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
                {/* <button style={styles.button} onClick={() => navigate("/PADTurn")}>送出審核</button> */}
                <button style={styles.button} onClick={sendPhotoBtn}>送出審核</button>
                </div>
          </div>


        )
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



export default Testing;
