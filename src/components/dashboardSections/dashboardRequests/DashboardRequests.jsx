import React, { useEffect, useState } from "react";
import "./DashboardRequests.css";
import LoadingAnimation from "../../loadingAnimation/LoadingAnimation";
import RequestCard from "./requestCard/RequestCard";
import { FiPlus } from "react-icons/fi";
import { useAlert } from "../../alert/Alert";

export default function DashboardRequests() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoadingRequests, setIsLoadingRequests] = useState(false);
  const [startDate, setStartDate] = useState(today.toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(tomorrow.toISOString().split("T")[0]);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [requests, setRequests] = useState([]);
  const [request, setRequest] = useState({
    request_type: "FERIE",
    notes: "",
  });
  const token = localStorage.getItem("token-merendels");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const requestEndpoint = `${process.env.REACT_APP_BACKEND_URL}/requests`;
  const { showAlert } = useAlert();

  function setCreateReqStates(loading, error, success) {
    setIsLoading(loading);
    setIsError(error);
    setIsSuccess(success);
  }

  const createRequest = async (req) => {
    setCreateReqStates(true, false, false);
    try {
      const response = await fetch(requestEndpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(req),
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
      console.log(`Request created: `, data);
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
      if (data.data && data.data.length > 0) setRequests(data.data);
      return;
    } catch (error) {
      console.log(`Unexpected error: ${error}`);
    } finally {
      setIsLoadingRequests(false);
    }
  };

  const handleFormClick = (e) => {
    e.preventDefault();
    const requestData = {
      ...request,
      start_date: `${startDate}T${startTime}:00Z`,
      end_date: `${endDate}T${endTime}:59Z`,
    };
    console.log(requestData);
    showAlert({
      title: `Conferma Richiesta ${request.request_type}`,
      description: `Vuoi confermare la richiesta di ${request.request_type} dal ${startDate} ${startTime} al ${endDate} ${endTime}?`,
      onClose: null,
      onConfirm: () => createRequest(requestData),
    });
  };

  useEffect(() => {
    getUserRequests();
  }, []);

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
              {requests !== null && requests.length > 0
                ? requests
                    .filter((item) => item.status === "PENDING")
                    .map((item) => <RequestCard key={item.id} request={item} />)
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
                    .map((item) => <RequestCard key={item.id} request={item} />)
                : null}
            </div>
          </div>
        </div>
      </div>
      <div className="create-request-section">
        <h1>Crea una Richiesta</h1>
        <div className="requests-create-form">
          <div className="request-type-switch">
            <p
              className={`${
                request.request_type === "FERIE" ? "selected" : ""
              }`}
              onClick={() => setRequest({ ...request, request_type: "FERIE" })}
            >
              Ferie
            </p>
            <p
              className={`${
                request.request_type === "PERMESSO" ? "selected" : ""
              }`}
              onClick={() =>
                setRequest({ ...request, request_type: "PERMESSO" })
              }
            >
              Permesso
            </p>
          </div>
          <div className="request-date-title">
            <h2>Dal</h2>
            <h2>Al</h2>
          </div>
          <div className="request-date-container">
            <input
              className="request-date-picker"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              className="request-date-picker"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="request-time-container">
            <input
              className="request-time-picker"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <input
              className="request-time-picker"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
          <div className="request-notes-container">
            <h3>Note Richiesta</h3>
            <textarea
              name="request-notes"
              id="request-notes"
              cols="45"
              rows="3"
              onChange={(e) =>
                setRequest({ ...request, notes: e.target.value })
              }
            ></textarea>
          </div>
          <button
            className="request-form-button"
            onClick={(e) => handleFormClick(e)}
          >
            <FiPlus size={24} />
            CREA RICHIESTA
          </button>
        </div>
      </div>
    </div>
  );
}
