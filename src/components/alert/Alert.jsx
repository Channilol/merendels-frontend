import React, { createContext, useContext, useState, useEffect } from "react";
import "./Alert.css";
import { FiAlertTriangle } from "react-icons/fi";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alertState, setAlertState] = useState({
    visible: false,
    title: "",
    description: "",
    onClose: null,
    onConfirm: null,
  });

  const showAlert = ({ title, description, onClose, onConfirm }) => {
    setAlertState({
      visible: true,
      title,
      description,
      onClose,
      onConfirm,
    });
  };

  const hideAlert = () => {
    setAlertState((prev) => ({ ...prev, visible: false }));
  };

  useEffect(() => {
    if (alertState.visible) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [alertState.visible]);

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert, alertState }}>
      {children}
      <Alert />
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert deve essere usato dentro AlertProvider");
  }
  return context;
};

export default function Alert() {
  const { alertState, hideAlert } = useAlert();

  const handleClose = () => {
    if (alertState.onClose) {
      alertState.onClose();
    }
    hideAlert();
  };

  const handleConfirm = () => {
    if (alertState.onConfirm) {
      alertState.onConfirm();
    }
    hideAlert();
  };
  return (
    <div className={`alert-background ${alertState.visible ? "visible" : ""}`}>
      <div className="alert">
        <div className="alert-header">
          <div className="alert-icon-container">
            <FiAlertTriangle size={40} />
          </div>
        </div>
        <p className="alert-title">{alertState.title}</p>
        <p className="alert-description">{alertState.description}</p>
        <div className="alert-buttons">
          <button className="alert-close-button" onClick={handleClose}>
            Annulla
          </button>
          <button className="alert-confirm-button" onClick={handleConfirm}>
            Conferma
          </button>
        </div>
      </div>
    </div>
  );
}
