import React from "react";
import "./LoadingAnimation.css";

export default function LoadingAnimation({
  size = "medium",
  type = "spinner",
  text = "",
  fullscreen = false,
}) {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  const LoadingSpinner = () => (
    <div className={`loading-spinner ${sizeClasses[size]}`}>
      <div className="spinner-circle"></div>
    </div>
  );

  const LoadingDots = () => (
    <div className="loading-dots">
      <div className="dot dot-1"></div>
      <div className="dot dot-2"></div>
      <div className="dot dot-3"></div>
    </div>
  );

  const LoadingPulse = () => (
    <div className={`loading-pulse ${sizeClasses[size]}`}></div>
  );

  const renderAnimation = () => {
    switch (type) {
      case "dots":
        return <LoadingDots />;
      case "pulse":
        return <LoadingPulse />;
      default:
        return <LoadingSpinner />;
    }
  };

  const containerClass = fullscreen
    ? "loading-container fullscreen"
    : "loading-container inline";

  return (
    <div className={containerClass}>
      {renderAnimation()}
      {text !== "" && <p className="loading-text">{text}</p>}
    </div>
  );
}
