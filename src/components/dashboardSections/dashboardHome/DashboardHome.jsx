import React, { useEffect } from "react";
import "./DashboardHome.css";
import { useSelector, useDispatch } from "react-redux";
import { setUserName } from "../../../redux/actions/index";

export default function DashboardHome() {
  const user = useSelector((state) => state.userReducer);
  const token = localStorage.getItem("token-merendels");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const dispatch = useDispatch();

  useEffect(() => {
    getUserProfile();
  }, []);

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
      }
      const data = await response.json();
      if (data.data.name && data.data.name !== "")
        dispatch(setUserName(data.data.name));
      console.log(data.data.name);
    } catch (error) {
      console.log("Errore imprevisto:", error);
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="dashboard-right-section">
      <div className="dashboard-right-header">
        <p className="dashboard-welcome-message">Bentornato</p>
        <p className="dashboard-welcome-message user-name">{user.name}</p>
      </div>
    </div>
  );
}
