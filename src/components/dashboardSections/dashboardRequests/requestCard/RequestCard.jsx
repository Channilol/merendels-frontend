import React, { useEffect, useState } from "react";
import "./RequestCard.css";
import {
  FiThumbsUp,
  FiThumbsDown,
  FiClock,
  FiChevronRight,
  FiMessageSquare,
  FiEdit3,
} from "react-icons/fi";

export default function RequestCard({ request }) {
  const [approval, setApproval] = useState({});
  const token = localStorage.getItem("token-merendels");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  function getStatusIcon(status) {
    switch (request.status) {
      case "APPROVED":
        return <FiThumbsUp size={28} />;
      case "REJECTED":
        return <FiThumbsDown size={28} />;
      case "REVOKED":
        return <FiThumbsDown size={28} />;
      case "PENDING":
        return <FiClock size={28} />;
      default:
        break;
    }
  }

  function getStatusName(status) {
    switch (request.status) {
      case "APPROVED":
        return "Approvata";
      case "REJECTED":
        return "Rifiutata";
      case "REVOKED":
        return "Revocata";
      case "PENDING":
        return "In attesa";
      default:
        break;
    }
  }

  function formatDateTime(isoString) {
    const localString = isoString.replace("Z", "");
    const date = new Date(localString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  const getApproval = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/approvals/request/${request.id}`,
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
        return;
      }
      const data = await response.json();
      if (data) setApproval(data.data);
    } catch (error) {
      console.log(`Unexpected error: ${error}`);
    }
  };

  useEffect(() => {
    if (request.status !== "PENDING") getApproval();
  }, [request]);

  // useEffect(() => {
  //   console.log(approval);
  //   console.log(request);
  // }, [approval]);

  return (
    <div className="request-card">
      <div className={`request-card-header ${request.status}`}>
        <span>
          {getStatusIcon(request.status)}
          {getStatusName(request.status)}{" "}
          {request.status !== "PENDING" ? `da ${request.approver_name}` : null}
        </span>
        <p className="request-type">{request.request_type}</p>
      </div>
      <p className="request-approval-date">
        {" "}
        {approval[0] && approval[0].approved_at !== ""
          ? formatDateTime(approval[0].approved_at)
          : "In attesa di essere visionata"}
      </p>
      <div className="request-notes">
        {request.status === "PENDING" ? (
          <FiEdit3 size={24} />
        ) : (
          <FiMessageSquare size={24} />
        )}
        <p>
          {request.status === "PENDING"
            ? request.notes
            : approval[0] && approval[0].comments !== ""
            ? approval[0].comments
            : "Nessun commento"}
        </p>
      </div>
      <div className="request-card-dates">
        <p>{formatDateTime(request.start_date)}</p>
        <FiChevronRight size={24} />
        <p>{formatDateTime(request.end_date)}</p>
      </div>
    </div>
  );
}
