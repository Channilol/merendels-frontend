import React, { useState, useCallback } from "react";
import "./LoginBox.css";
import Logo from "../../assets/logo_merendels.png";
import LoginInput from "../loginInput/LoginInput";
import { FiLogIn } from "react-icons/fi";

export default function LoginBox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showValidation, setShowValidation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  function setEmailInput(input) {
    setEmail(input);
  }

  function setPasswordInput(input) {
    setPassword(input);
  }

  const handleLoginClick = useCallback(
    async (event) => {
      if (event && event.preventDefault) {
        event.preventDefault();
      }

      if (isLoading) return; // Prevent multiple clicks

      setShowValidation(true);
      setIsLoading(true);
      setIsError(false);

      console.log("Login attempt:", { email, password });

      // Small delay to prevent ResizeObserver issues
      setTimeout(async () => {
        try {
          const obj = {
            email: email,
            password: password,
          };

          const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
          });

          if (!response.ok) {
            setIsLoading(false);
            setIsError(true);
            const errorData = await response.text();
            throw new Error(`API Error: ${response.status} - ${errorData}`);
          }

          const data = await response.json();
          setIsLoading(false);
          setIsError(false);
          console.log(data);
          return data;
        } catch (error) {
          setIsLoading(false);
          setIsError(true);
          console.log(`Unexpected error: ${error}`);
        }
      }, 100);
    },
    [email, password, isLoading]
  );

  return (
    <div className="login-container">
      <img className="login-logo" src={Logo} alt="Logo Aziendale" />
      <h1 className="login-welcome">Accedi al Sistema</h1>
      <p className="login-subtitle">
        Inserisci le tue credenziali per continuare
      </p>
      <div className="login-form">
        <LoginInput
          func={setEmailInput}
          isEmail={true}
          showValidation={showValidation}
        />
        <LoginInput
          func={setPasswordInput}
          isPassword={true}
          showValidation={showValidation}
        />
        <button
          type="button"
          className="login-button"
          onClick={(event) => handleLoginClick(event)}
          disabled={isLoading}
        >
          {isLoading ? (
            <>Loading...</>
          ) : (
            <>
              <FiLogIn /> Login
            </>
          )}
        </button>
      </div>
    </div>
  );
}
