import React, { use, useEffect, useState } from "react";
import "./DashboardRequests.css";
import LoadingAnimation from "../../loadingAnimation/LoadingAnimation";
import RequestCard from "./requestCard/RequestCard";

export default function DashboardRequests() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoadingRequests, setIsLoadingRequests] = useState(false);
  const [startDate, setStartDate] = useState("2025-09-15");
  const [endDate, setEndDate] = useState("2025-09-16");
  const [requests, setRequests] = useState([]);
  const [request, setRequest] = useState({
    start_date: validateDate(startDate, true),
    end_date: validateDate(endDate, false),
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

  function validateDate(date, isStartDate) {
    return isStartDate ? `${date}T00:00:00Z` : `${date}T23:59:59Z`;
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
      setRequests(data.data);
      return;
    } catch (error) {
      console.log(`Unexpected error: ${error}`);
    } finally {
      setIsLoadingRequests(false);
    }
  };

  useEffect(() => {
    getUserRequests();
  }, []);

  useEffect(() => {
    console.log(requests);
  }, [requests]);

  return (
    <div className="dashboard-right-section">
      <div className="requests-history-section">
        <h1>Richieste</h1>
        <div className="history-content">
          <div className="pending-requests">
            <h3>In attesa</h3>
            <div className="requests-cards-container">
              {isLoadingRequests ? (
                <LoadingAnimation size="large" type="dots" />
              ) : (
                <></>
              )}
              {requests.length > 0
                ? requests
                    .filter((item) => item.status === "PENDING")
                    .map((item) => <RequestCard request={item} />)
                : null}
            </div>
          </div>
          <div className="requests-history">
            <h3>Risolte</h3>
            <div className="requests-cards-container">
              {isLoadingRequests ? (
                <LoadingAnimation size="large" type="dots" />
              ) : (
                <></>
              )}
              {requests.length > 0
                ? requests
                    .filter((item) => item.status !== "PENDING")
                    .map((item) => <RequestCard request={item} />)
                : null}
            </div>
          </div>
        </div>
      </div>
      <div className="create-request-section">
        crea request
        <div className="requests-create-form">form</div>
      </div>
    </div>
  );
}
