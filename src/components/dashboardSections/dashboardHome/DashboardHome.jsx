import React from "react";
import "./DashboardHome.css";
import { useSelector } from "react-redux";

export default function DashboardHome() {
  const user = useSelector((state) => state.userReducer);

  return (
    <div className="dashboard-right-section">
      <div className="dashboard-right-header">
        <p className="dashboard-welcome-message">Bentornato {user.nome}</p>
        <p className="dashboard-welcome-message user-email">{user.email}</p>
      </div>
    </div>
  );
}
