import React, { useState } from "react";
import "./LoginInput.css";
import { FiMail, FiKey } from "react-icons/fi";

export default function LoginInput({ func, isEmail, isPassword, showValidation = false }) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  const handleInputChange = (event) => {
    setValue(event.target.value);
    func(event.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const getContainerClass = () => {
    let className = "login-input-container";
    if (isFocused) className += " focused";
    return className;
  };

  const getInputClass = () => {
    let className = "login-input";
    if (showValidation && value) {
      if (isEmail) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        className += emailRegex.test(value) ? " valid" : " invalid";
      }
      if (isPassword && value.length < 6) {
        className += " invalid";
      }
      if (isPassword && value.length >= 6) {
        className += " valid";
      }
    }
    return className;
  };

  return (
    <div className={getContainerClass()}>
      <label className="login-input-label">
        {isEmail ? "Indirizzo Email" : isPassword ? "Password" : "Campo Testo"}
      </label>
      <div style={{ position: 'relative' }}>
        <div className="login-input-icon">
          {isEmail ? <FiMail /> : isPassword ? <FiKey /> : null}
        </div>
        <input
          type={isEmail ? "email" : isPassword ? "password" : "text"}
          className={getInputClass()}
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={isEmail ? "nome@azienda.com" : isPassword ? "••••••••" : "Inserisci testo"}
        />
      </div>
    </div>
  );
}
