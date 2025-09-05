import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../../assets/logo_merendels_no_text.png";
import { FiHome, FiClock, FiCalendar, FiLock } from "react-icons/fi";
import SidebarSection from "./sidebarSection/SidebarSection";
import { jwtDecode } from "jwt-decode";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const categories = [
    { name: "Home", icon: <FiHome size={24} /> },
    { name: "Timbrature", icon: <FiClock size={24} /> },
    { name: "Requests", icon: <FiCalendar size={24} /> },
    { name: "Admin", icon: <FiLock size={24} /> },
  ];
  let token = localStorage.getItem("token-merendels");
  const decoded = jwtDecode(token);
  const isAdmin = decoded.hierarchy_level <= 1;
  return (
    <div className={`sidebar ${isExpanded ? "expanded" : ""}`}>
      <div
        className="sidebar-logo-container"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <img src={Logo} alt="logo" />
      </div>
      {categories
        .filter((item) => isAdmin || item.name !== "Admin")
        .map((item) => (
          <SidebarSection
            key={item.name}
            category={item.name}
            icon={item.icon}
            isExpanded={isExpanded}
          />
        ))}
    </div>
  );
}
