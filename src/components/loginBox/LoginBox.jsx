import React, { useEffect, useState } from "react";
import "./LoginBox.css";
import Logo from "../../assets/logo_merendels.png";
import LoginInput from "../loginInput/LoginInput";
import { FiLogIn, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

export default function LoginBox({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showValidation, setShowValidation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function setEmailInput(input) {
    setEmail(input);
  }

  function setPasswordInput(input) {
    setPassword(input);
  }

  const handleLoginClick = async (event) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    if (isLoading || isSuccess) return;

    setShowValidation(true);
    setLoggingStates(true, false, false);

    console.log("Login attempt:", { email, password });
    console.log(`${process.env.REACT_APP_BACKEND_URL}/auth/login`);

    // Piccolo delay per prevenire problema con ResizeObserver
    setTimeout(async () => {
      try {
        const obj = {
          email: email,
          password: password,
        };
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
          }
        );

        if (!response.ok) {
          setLoggingStates(false, true, false);
          const errorData = await response.text();
          throw new Error(`API Error: ${response.status} - ${errorData}`);
        }

        const data = await response.json();
        localStorage.setItem("token-merendels", data.data.token);
        console.log("Logged in");
        setLoggingStates(false, false, true);
        return data;
      } catch (error) {
        setLoggingStates(false, true, false);
        console.log(`Unexpected error: ${error}`);
      }
    }, 100);
  };

  function setLoggingStates(loading, error, success) {
    setIsLoading(loading);
    setIsError(error);
    setIsSuccess(success);
  }

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setIsLoggedIn();
      }, 250);
    }
  }, [isSuccess]);

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
        <div className={`error-box ${isError ? "active" : ""}`}>
          <FiAlertCircle size={20} />
          <p>Email o password errate.</p>
        </div>
        <button
          type="button"
          className="login-button"
          onClick={(event) => handleLoginClick(event)}
          disabled={isLoading}
        >
          {isLoading ? (
            <>Loading...</>
          ) : isSuccess ? (
            <FiCheckCircle size={20} />
          ) : (
            <>
              <FiLogIn size={20} /> Login
            </>
          )}
        </button>
      </div>
    </div>
  );
}
