import react from "react";

const RoundedButton = ({borderColor, color, funciton}) => {

    const styles = {
        firstCircle : {
            width: "58px",
            height: "58px",
            borderRadius: "50px",
            backgroundColor: `${color}`,
        },
        secondCircle : {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "62px",
            height: "62px",
            borderRadius: "50px",
            backgroundColor: "none",
            border: `2px solid ${borderColor}`
        }
    }


    return(
        <div style={styles.secondCircle} onClick={funciton}>
            <div style={styles.firstCircle}></div>
        </div>
    )
}

export default RoundedButton;