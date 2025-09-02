import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../../assets/logo_merendels_no_text.png";
import { FiHome, FiUser, FiClock, FiCalendar } from "react-icons/fi";
import SidebarSection from "../sidebarSection/SidebarSection";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const categories = [
    { name: "home", icon: <FiHome size={24} /> },
    { name: "profile", icon: <FiUser size={24} /> },
    { name: "timbrature", icon: <FiClock size={24} /> },
    { name: "requests", icon: <FiCalendar size={24} /> },
  ];
  return (
    <div className={`sidebar ${isExpanded ? "expanded" : ""}`}>
      <div
        className="sidebar-logo-container"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <img src={Logo} alt="logo" />
      </div>
      {categories.map((item) => (
        <SidebarSection
          category={item.name}
          icon={item.icon}
          isExpanded={isExpanded}
        />
      ))}
    </div>
  );
}
