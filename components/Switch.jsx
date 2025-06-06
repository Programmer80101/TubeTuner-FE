"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import "@/css/Switch.css";

export default function Switch({
  checked = false,
  onChange,
  label = "",
  disabled = false,
  fullWidth = true,
  children,
  ...props
}) {

  const id = useId();
  const labelId = `switch-button-${id}`

  return (
    <div className="switch-wrapper" data-full-width={fullWidth} {...props}>
      <div className="switch-label">
        <label htmlFor={labelId}>
          {children}
        </label>
      </div>
      <button
        id={labelId}
        type="button"
        title={label}
        className="switch-button"
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        aria-label={label}
        aria-checked={checked}
        aria-disabled={disabled}
        role="switch"
      >
        <motion.span
          className="switch-thumb"
          initial={false}
          animate={{ x: checked ? 20 : 0 }}
          transition={{ duration: 0.2, ease: "easeIn" }}
          layout
        />
      </button>
    </div>
  );
}
