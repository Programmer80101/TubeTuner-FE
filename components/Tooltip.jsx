"use client";

import { FaInfoCircle } from "react-icons/fa";
import { useId } from "react";
import "@/css/Tooltip.css";

export default function Tooltip({
  icon,
  children,
  position = 'top',
}) {
  const id = useId();
  const tooltipId = `tooltip-${id}`;

  return (
    <span
      id={id}
      tabIndex="0"
      className="tooltip-wrapper"
      aria-describedby={tooltipId}
      data-position={position}
    >
      <div className="tooltip-icon">
        {!!icon ? icon : <FaInfoCircle />}
      </div>
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
