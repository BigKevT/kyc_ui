import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import idcardpng from "../assets/idcard.png";

const StartPage = () => {
  const navigate = useNavigate();
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

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
      padding: "20px",
    },
    titleContainer: {
      textAlign: "center",
      width: "90%",
      maxWidth: "400px",
    },
    title: {
      fontSize: "1.8rem",
      fontWeight: "bold",
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
    },
    idCardImage: {
      width: "80%",
      maxWidth: "300px",
    },
    termsContainer: {
      marginTop: "20px",
      textAlign: "left",
      fontSize: "0.9rem",
      width: "90%",
      maxWidth: "400px",
    },
    termItem: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "10px",
    },
    checkbox: {
      width: "20px",
      height: "20px",
      appearance: "none",
      border: "2px solid orange",
      borderRadius: "4px",
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    checkedCheckbox: {
      backgroundColor: "orange",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    startButtonContainer: {
      position: "absolute",
      bottom: "5%",
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
    policySpan: {
      flex: 1,
    },
  };

  return (
    <div style={styles.container}>
      {/* Title and subtitle */}
      <div style={styles.titleContainer}>
        <p style={styles.title}>請準備身份證件進行驗證</p>
        <p style={styles.subtitle}>依法規規定，需核實本人身份</p>
      </div>

      {/* ID Card Illustration */}
      <div style={styles.idCardImageContainer}>
        <img 
          src={idcardpng}
          alt="ID Card Illustration" 
          style={styles.idCardImage} 
        />
      </div>

      {/* Terms and Conditions */}
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
          <span style={styles.policySpan}>已閱讀台灣大哥大身份驗證服務使用條款。</span>
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
          <span style={styles.policySpan}>已閱讀台灣大哥大會員告知事項並同意留存證件資料，以維護個人資料的準確性。</span>
        </div>
      </div>

      {/* Start Button */}
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
  );
};

export default StartPage;
