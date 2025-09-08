import React, { useEffect, useState } from "react";
import "./DashboardHome.css";
import { useSelector, useDispatch } from "react-redux";
import { setUserName } from "../../../redux/actions/index";
import TimbratureHistoryCard from "../dashboardTimbrature/timbratureHistoryCard/TimbratureHistoryCard";

export default function DashboardHome() {
  const user = useSelector((state) => state.userReducer);
  const [userStatus, setUserStatus] = useState({});
  const token = localStorage.getItem("token-merendels");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const dispatch = useDispatch();

  useEffect(() => {
    getUserProfile();
    getUserStatus();
  }, []);

  const getUserStatus = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/timbrature/me/status`,
        {
          method: "GET",
          headers,
        }
      );
      if (!response.ok) {
        const errorData = await response.text();
        console.log(
          `Errore durante la chiamata API: ${response.status} ${errorData}`
        );
      }
      const data = await response.json();
      if (data) setUserStatus(data.data);
    } catch (error) {
      console.log("Errore imprevisto:", error);
    }
  };

  const getUserProfile = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/profile`,
        {
          method: "GET",
          headers,
        }
      );
      if (!response.ok) {
        const errorData = await response.text();
        console.log(
          `Errore durante la chiamata API: ${response.status} ${errorData}`
        );
      }
      const data = await response.json();
      if (data.data.name && data.data.name !== "")
        dispatch(setUserName(data.data.name));
    } catch (error) {
      console.log("Errore imprevisto:", error);
    }
  };

  return (
    <div className="dashboard-home-container">
      <div className="dashboard-hero-section">
        <div className="welcome-card">
          <h1 className="welcome-title">Bentornato</h1>
          <h2 className="welcome-username">{user.name || "Utente"}</h2>
        </div>

        <div className="status-card">
          <div className="status-indicator">
            <div
              className={`status-dot ${
                userStatus.is_working ? "working" : "not-working"
              }`}
            ></div>
            <span className="status-text">
              {userStatus && userStatus.is_working
                ? "Al Lavoro"
                : "Non al Lavoro"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-main-grid">
        {/* Last Activity Card */}
        <div className="dashboard-card last-activity">
          <h3 className="card-title">Ultima Timbratura</h3>
          <div className="card-content">
            {userStatus && userStatus.last_timbratura ? (
              <TimbratureHistoryCard timbrature={userStatus.last_timbratura} />
            ) : (
              "Nessuna timbratura recente"
            )}
          </div>
        </div>

        {/* Statistics Placeholder */}
        <div className="dashboard-card stats-placeholder">
          <h3 className="card-title">Statistiche</h3>
          <div className="card-content coming-soon">
            <div className="placeholder-content">
              <span>Dati in arrivo...</span>
            </div>
          </div>
        </div>

        {/* Quick Actions Placeholder */}
        <div className="dashboard-card actions-placeholder">
          <h3 className="card-title">Azioni Rapide</h3>
          <div className="card-content coming-soon">
            <div className="placeholder-content">
              <span>Funzionalità in sviluppo...</span>
            </div>
          </div>
        </div>

        {/* Activity Summary Placeholder */}
        <div className="dashboard-card activity-placeholder">
          <h3 className="card-title">Attività Recenti</h3>
          <div className="card-content coming-soon">
            <div className="placeholder-content">
              <span>Cronologia in preparazione...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
