import React, { useEffect, useState } from "react";
import "./DashboardTimbrature.css";
import TimbratureHistoryCard from "../timbratureHistoryCard/TimbratureHistoryCard";
import { MdOutlineWork, MdOutlineHomeWork } from "react-icons/md";
import { FiX } from "react-icons/fi";

export default function DashboardTimbrature() {
  const [timbratureHistory, setTimbratureHistory] = useState([]);
  const token = localStorage.getItem("token-merendels");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    fetchHistory(token);
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/timbrature/me`,
        {
          method: "GET",
          headers: headers,
        }
      );
      if (!response.ok) {
        const errorData = await response.text();
        console.log(`API Error: ${response.status} - ${errorData}`);
      }
      const data = await response.json();
      if (data.data && data.data.length > 0) setTimbratureHistory(data.data);
      console.log(data);
      return;
    } catch (error) {
      console.log("Errore imprevisto:", error);
    }
  };

  const createTimbrature = async (location) => {
    let actionType = "ENTRATA";
    if (timbratureHistory.length === 0) {
      actionType = "ENTRATA";
    } else if (timbratureHistory[0].action_type === "ENTRATA") {
      actionType = "USCITA";
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/timbrature`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            action_type: actionType,
            location: location,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorData}`);
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      throw new Error("Errore imprevisto:", error);
    }
  };

  const handleClick = async (location) => {
    await createTimbrature(location);
    await fetchHistory();
  };

  return (
    <div className="dashboard-right-section">
      <div className="history-section">
        <h1>Storico timbrature</h1>
        <div className="history-cards">
          {timbratureHistory.length > 0 ? (
            timbratureHistory.map((item) => (
              <TimbratureHistoryCard key={item.id} timbrature={item} />
            ))
          ) : (
            <>
              <div></div>
              <div></div>
              <div className="empty-timbrature-history">
                <FiX size={80} />
                <p>Storico timbrature vuoto</p>
              </div>
              <div></div>
              <div></div>
            </>
          )}
        </div>
      </div>
      <div className="create-timbrature-section">
        <h1>Nuova timbratura</h1>
        <h3>
          Devi timbrare l'
          {timbratureHistory.length === 0 ||
          timbratureHistory[0].action_type === "USCITA"
            ? "entrata"
            : "uscita"}
        </h3>
        <div className="locations-section">
          <div className="office" onClick={() => handleClick("UFFICIO")}>
            <MdOutlineWork size={100} />
            <p>Ufficio</p>
          </div>
          <div className="smart" onClick={() => handleClick("SMART")}>
            <MdOutlineHomeWork size={100} />
            <p>Smart working</p>
          </div>
        </div>
      </div>
    </div>
  );
}
