"use client";

import { FaInfoCircle } from "react-icons/fa";
import "@/css/Tooltip.css";

export default function Tooltip({
  id,
  children,
  position = 'top',
}) {

  const tooltipId = `tooltip=${id}`;

  return (
    <span
      id={id}
      tabIndex="0"
      className="tooltip-wrapper"
      aria-describedby={tooltipId}
      data-position={position}
    >
      <FaInfoCircle className="tooltip-icon" />
      <div
        id={tooltipId}
        className="tooltip-content"
        role="tooltip"
      >
        {children}
        <span className="tooltip-arrow" />
      </div>
    </span>
  )
}
