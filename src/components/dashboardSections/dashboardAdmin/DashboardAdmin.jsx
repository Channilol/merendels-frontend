import React, { useEffect, useState } from "react";
import "./DashboardAdmin.css";
import RequestCard from "../dashboardRequests/requestCard/RequestCard";
import { FiUser } from "react-icons/fi";

export default function DashboardAdmin() {
  const [users, setUsers] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const token = localStorage.getItem("token-merendels");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const getUsersStatus = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/timbrature/employees-status`,
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
      if (data && data.length > 0) setUsers(data);
      console.log("STATUS UTENTI:", data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPendingRequests = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/requests/pending`,
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
      if (data && data.data && data.data.length > 0)
        setPendingRequests(data.data);
      console.log("PENDING REQUESTS", data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersStatus();
    getPendingRequests();
  }, []);

  return (
    <div className="dashboard-right-section">
      <div className="dashboard-admin">
        <div className="admin-employees-status">
          <h2 className="section-title">Status Dipendenti</h2>
          <div className="employees-list">
            {users.map((user) => (
              <div key={user.id} className="employee-card">
                <div className="employee-icon">
                  <FiUser size={20} />
                </div>
                <div className="employee-info">
                  <span className="employee-name">{user.name}</span>
                  <div className="employee-status">
                    <div
                      className={`status-dot ${
                        user.is_working ? "working" : "not-working"
                      }`}
                    ></div>
                    <span className="status-text">
                      {user.is_working ? "Al lavoro" : "Non al lavoro"}
                      {user.is_working && user.work_mode
                        ? ` (${user.work_mode})`
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="admin-pending-requests">
          <h2 className="section-title">Richieste da Approvare</h2>
          <div className="requests-list">
            {pendingRequests.map((req) => (
              <RequestCard request={req} key={req.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
