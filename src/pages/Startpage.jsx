import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import idcardpng from "../assets/idcard.png";

const StartPage = () => {
  const navigate = useNavigate();
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  //assign UUID for visitor
  const [userUUID] = useState(() => {
    let storedUUID = sessionStorage.getItem('userUUID');
    if (!storedUUID) {
        storedUUID = crypto.randomUUID();
        sessionStorage.setItem('userUUID', storedUUID);
    }
    return storedUUID;
  });
  

  useEffect(() => {
    console.log(`UUID: ${userUUID}`);
  }, [])  

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
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      overflow: "hidden",
    },
    contentWrapper: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "90%",
      maxWidth: "400px",
      margin: "0 auto", // Ensure center alignment
    },
    title: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      color: "#000000",
    },
    subtitle: {
      fontSize: "1rem",
      color: "#666",
      marginTop: "10px",
    },
    idCardImageContainer: {
      marginTop: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    idCardImage: {
      width: "80%",
      maxWidth: "300px",
    },
    termsContainer: {
      marginTop: "20px",
      textAlign: "left", // Align text to the left
      fontSize: "0.9rem",
      width: "100%",
      maxWidth: "400px",
    },
    termItem: {
      display: "flex",
      alignItems: "center",
      color: "black",
      justifyContent: "flex-start", // Align text and checkbox properly
      gap: "10px",
      marginBottom: "10px",
    },
    checkbox: {
      width: "22px", 
      height: "22px",
      minWidth: "22px",
      minHeight: "22px",
      appearance: "none",
      border: "2px solid orange",
      borderRadius: "4px",
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexShrink: 0, // Prevent shrinking
    },
    checkedCheckbox: {
      backgroundColor: "orange",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    startButtonContainer: {
      marginTop: "20px",
      width: "100%",
      textAlign: "center",
    },
    startButton: {
      width: "80%",
      maxWidth: "300px",
      padding: "15px",
      fontSize: "1.2rem",
      borderRadius: "10px",
      backgroundColor: isChecked1 && isChecked2 ? "orange" : "gray",
      color: "white",
      border: "none",
      cursor: isChecked1 && isChecked2 ? "pointer" : "not-allowed",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <p style={styles.title}>請準備身份證件進行驗證</p>
        <p style={styles.subtitle}>依法規規定，需核實本人身份</p>
        
        <div style={styles.idCardImageContainer}>
          <img 
            src={idcardpng}
            alt="ID Card Illustration" 
            style={styles.idCardImage} 
          />
        </div>

        <div style={styles.termsContainer}>
          <div style={styles.termItem}>
            <div
              style={{
                ...styles.checkbox,
                ...(isChecked1 ? styles.checkedCheckbox : {}),
              }}
              onClick={() => setIsChecked1(!isChecked1)}
            >
              {isChecked1 && "✔"}
            </div>
            <span>已閱讀台灣大哥大身份驗證服務使用條款。</span>
          </div>
          <div style={styles.termItem}>
            <div
              style={{
                ...styles.checkbox,
                ...(isChecked2 ? styles.checkedCheckbox : {}),
              }}
              onClick={() => setIsChecked2(!isChecked2)}
            >
              {isChecked2 && "✔"}
            </div>
            <span>已閱讀台灣大哥大會員告知事項並同意留存證件資料，以維護個人資料的準確性。</span>
          </div>
        </div>

        <div style={styles.startButtonContainer}>
          <button 
            style={styles.startButton} 
            onClick={() => isChecked1 && isChecked2 && navigate("/OCRFront")} 
            disabled={!isChecked1 || !isChecked2}
          >
            開始驗證
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
