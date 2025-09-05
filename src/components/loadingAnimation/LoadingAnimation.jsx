import React from "react";

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
      {text && <p className="loading-text">{text}</p>}

      <style jsx>{`
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .loading-container.fullscreen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(255, 252, 255, 0.9);
          backdrop-filter: blur(4px);
          z-index: 9999;
        }

        .loading-container.inline {
          padding: 20px;
        }

        /* SPINNER ANIMATION */
        .loading-spinner {
          position: relative;
          display: inline-block;
        }

        .spinner-circle {
          width: 100%;
          height: 100%;
          border: 3px solid rgba(11, 153, 96, 0.2);
          border-top: 3px solid var(--primary, rgba(11, 153, 96, 1));
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* DOTS ANIMATION */
        .loading-dots {
          display: flex;
          gap: 6px;
          align-items: center;
        }

        .dot {
          width: 8px;
          height: 8px;
          background: var(--primary, rgba(11, 153, 96, 1));
          border-radius: 50%;
          animation: dotPulse 1.4s infinite ease-in-out;
        }

        .dot-1 {
          animation-delay: -0.32s;
        }
        .dot-2 {
          animation-delay: -0.16s;
        }
        .dot-3 {
          animation-delay: 0s;
        }

        @keyframes dotPulse {
          0%,
          80%,
          100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          40% {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* PULSE ANIMATION */
        .loading-pulse {
          background: var(--primary, rgba(11, 153, 96, 1));
          border-radius: var(--border-radius-m, 16px);
          animation: pulse 1.5s infinite ease-in-out;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.6;
            transform: scale(0.95);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        /* LOADING TEXT */
        .loading-text {
          margin: 0;
          font-size: 14px;
          font-weight: 500;
          color: var(--text-secondary, rgba(98, 106, 102, 1));
          text-align: center;
          animation: fadeInUp 0.4s ease-out;
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(16px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* RESPONSIVE */
        .w-6 {
          width: 24px;
          height: 24px;
        }
        .w-8 {
          width: 32px;
          height: 32px;
        }
        .w-12 {
          width: 48px;
          height: 48px;
        }
      `}</style>
    </div>
  );
}
