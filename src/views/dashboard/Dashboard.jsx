import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import {
  setUserId,
  setUserEmail,
  setHierarchyLevel,
} from "../../redux/actions/index";
import LoginBox from "../../components/loginBox/LoginBox";
import Sidebar from "../../components/sidebar/Sidebar";
import DashboardHome from "../../components/dashboardHome/DashboardHome";
import DashboardProfile from "../../components/dashboardProfile/DashboardProfile";
import DashboardTimbrature from "../../components/dashboardTimbrature/DashboardTimbrature";
import DashboardRequests from "../../components/dashboardRequests/DashboardRequests";

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingUser, setCheckingUser] = useState(true);
  const [activeCategState, setActiveCategState] = useState("");
  const dispatch = useDispatch();
  const selectorActiveCategory = useSelector(
    (state) => state.categoryReducer.activeCategory
  );
  const categoriesComponents = {
    home: <DashboardHome />,
    profile: <DashboardProfile />,
    timbrature: <DashboardTimbrature />,
    requests: <DashboardRequests />,
  };

  // Check se l'utente era giá loggato
  useEffect(() => {
    // Delay per prevenire ResizeObserver error
    const timer = setTimeout(() => {
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
          setCheckingUser(false);
        } else {
          console.log("token scaduto, rifare login");
        }
      } else {
        console.log("token non presente in memoria");
        setCheckingUser(false);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    setActiveCategState(selectorActiveCategory);
  }, [selectorActiveCategory]);

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
    <div className="dashboard">
      {checkingUser ? (
        <>
          <div className="loading-container"></div>
        </>
      ) : isLoggedIn ? (
        <div className="dashboard-container">
          <Sidebar />
          {categoriesComponents[activeCategState]}
        </div>
      ) : (
        <LoginBox setIsLoggedIn={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}
