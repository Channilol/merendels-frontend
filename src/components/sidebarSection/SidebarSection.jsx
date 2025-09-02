import React, { useEffect, useState } from "react";
import "./SidebarSection.css";
import { useDispatch, useSelector } from "react-redux";
import { setActiveCategory } from "../../redux/actions/index";

export default function SidebarSection({ icon, category, isExpanded }) {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const activeCategory = useSelector(
    (state) => state.categoryReducer.activeCategory
  );

  useEffect(() => {
    if (activeCategory === category) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [activeCategory]);

  return (
    <div
      className={`sidebar-section ${isActive ? "active" : ""}`}
      onClick={() => dispatch(setActiveCategory(category))}
    >
      {icon}
      {isExpanded ? <p className="sidebar-section-label">{category}</p> : null}
    </div>
  );
}
