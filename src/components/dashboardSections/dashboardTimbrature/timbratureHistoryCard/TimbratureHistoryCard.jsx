import React from "react";
import "./TimbratureHistoryCard.css";
import { MdOutlineWork, MdOutlineHomeWork } from "react-icons/md";
import { FiCalendar, FiClock, FiKey } from "react-icons/fi";

export default function TimbratureHistoryCard({ timbrature }) {
  const dateObj = new Date(timbrature.timestamp);
  const dateOnly = dateObj.toISOString().split("T")[0];
  const timeOnly = dateObj.toISOString().split("T")[1].split(".")[0];

  return (
    <div className={`timbrature-history-card `}>
      <div className="history-card-header">
        <h3 className={`${timbrature.action_type}`}>
          {timbrature.action_type}
        </h3>
        <h3>
          <FiKey size={20} /> #{timbrature.id}
        </h3>
      </div>
      <div className="location-type">
        {timbrature.location === "UFFICIO" ? (
          <MdOutlineWork size={24} />
        ) : (
          <MdOutlineHomeWork size={24} />
        )}
        <h4>{timbrature.location}</h4>
      </div>
      <div className="history-card-date">
        <div>
          <FiCalendar /> {dateOnly}
        </div>
        <div>
          <FiClock /> {timeOnly}
        </div>
      </div>
    </div>
  );
}
