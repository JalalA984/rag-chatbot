import React from "react";
import "./LoadingBubble.css"; 

const LoadingBubble = () => {
  return (
    <div className="loading-container">
      <span className="loading-span blur-5"></span>
      <span className="loading-span blur-10"></span>
      <span className="loading-span blur-25"></span>
      <span className="loading-span blur-50"></span>
    </div>
  );
};

export default LoadingBubble;
