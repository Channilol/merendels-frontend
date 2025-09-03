import React, { use, useState } from "react";
import "./DashboardRequests.css";

export default function DashboardRequests() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoadingRequests, setIsLoadingRequests] = useState(false);
  const [startDate, setStartDate] = useState("2025-09-15");
  const [endDate, setEndDate] = useState("2025-09-16");
  const [request, setRequest] = useState({
    start_date: validateDate(startDate),
    end_date: validateDate(endDate),
    request_type: "FERIE",
    notes: "Prova ferie",
  });
  const token = localStorage.getItem("token-merendels");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const requestEndpoint = `${process.env.REACT_APP_BACKEND_URL}/requests`;

  function setCreateReqStates(loading, error, success) {
    setIsLoading(loading);
    setIsError(error);
    setIsSuccess(success);
  }

  function validateDate(date) {
    return `${date}T00:00:00Z`;
  }

  const createRequest = async () => {
    setCreateReqStates(true, false, false);
    console.log(request);
    try {
      const response = await fetch(requestEndpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(request),
      });
      if (!response.ok) {
        const errorData = await response.text();
        console.log(
          `Errore durante la chiamata API: ${response.status} ${errorData}`
        );
        setCreateReqStates(false, true, false);
        return;
      }
      const data = await response.json();
      setCreateReqStates(false, false, true);
      console.log(`Request created`);
      console.log(data);
      getUserRequests();
      return data;
    } catch (error) {
      console.log(`Unexpected error: ${error}`);
      setCreateReqStates(false, true, false);
    }
  };

  const getUserRequests = async () => {
    setIsLoadingRequests(true);
    try {
      const response = await fetch(`${requestEndpoint}/me`, {
        method: "GET",
        headers,
      });
      if (!response.ok) {
        const errorData = await response.text();
        console.log(
          `Errore durante la chiamata API: ${response.status} ${errorData}`
        );
        setCreateReqStates(false, true, false);
        return;
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(`Unexpected error: ${error}`);
    } finally {
      setIsLoadingRequests(false);
    }
  };

  return (
    <div className="dashboard-right-section">
      <div className="requests-history-container"></div>
      <div className="requests-create-form">
        <div onClick={createRequest}>Crea request</div>
        <div onClick={getUserRequests}>Get user requests</div>
      </div>
    </div>
  );
}
