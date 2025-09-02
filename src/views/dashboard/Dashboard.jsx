import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import {
  setUserId,
  setUserEmail,
  setHierarchyLevel,
} from "../../redux/actions/index";
import LoginBox from "../../components/loginBox/LoginBox";
import Sidebar from "../../components/sidebar/Sidebar";

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  // Check se l'utente era giá loggato
  useEffect(() => {
    let token = localStorage.getItem("token-merendels");
    if (token && token !== "") {
      const decoded = jwtDecode(token);
      console.log(decoded);
      if (!isTokenExpired(token)) {
        console.log("token valido");
        if (decoded.user_id) {
          dispatch(setUserId(decoded.user_id));
          console.log("settato user_id");
        }
        if (decoded.email) {
          dispatch(setUserEmail(decoded.email));
          console.log("settata email");
        }
        if (decoded.hierarchy_level) {
          dispatch(setHierarchyLevel(decoded.hierarchy_level));
          console.log("settato hierarchy level");
        }
        setIsLoggedIn(true);
      } else {
        console.log("token scaduto, rifare login");
      }
    } else {
      console.log("token non presente in memoria");
    }
  }, []);

  function isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        return true; // token scaduto
      }
      return false; // token valido
    } catch (e) {
      return true; // se il token non è valido lo considero scaduto
    }
  }

  return (
    <div className="dashboard-container">
      {isLoggedIn ? (
        <>
          <Sidebar />
        </>
      ) : (
        <LoginBox setIsLoggedIn={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}
