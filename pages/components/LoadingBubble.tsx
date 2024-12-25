import React from "react";
import styles from "./LoadingBubble.module.css"; // Import the CSS Module

const LoadingBubble = () => {
  return (
    <div className={styles["loading-container"]}>
      <span className={styles["loading-span"] + " " + styles["blur-5"]}></span>
      <span className={styles["loading-span"] + " " + styles["blur-10"]}></span>
      <span className={styles["loading-span"] + " " + styles["blur-25"]}></span>
      <span className={styles["loading-span"] + " " + styles["blur-50"]}></span>
    </div>
  );
};

export default LoadingBubble;
