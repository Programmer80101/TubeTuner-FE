"use client";

import { FaAsterisk } from "react-icons/fa6";
import { useRef, useState, useCallback } from "react";
import Tooltip from "@/components/Tooltip";
import "@/css/Input.css";

export default function Input({
  id,
  name,
  label,
  type = "text",
  value = "",
  placeholder = "",
  onChange,
  onBlur,
  pattern,
  maxLength,
  errorMsg = "Error!",
  helpMsg = "",
  tooltip = "",
  showCharacterCount = false,
  showDetails = true,
  showTooltip = true,
  required = false,
  disabled = false,
  error = false,
  ...props
}) {
  const inputRef = useRef(null);
  const [isInvalid, setIsInvalid] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const descriptionId = `description-${id}`;

  const handleChange = useCallback((e) => {
    if (showCharacterCount) {
      setCharacterCount(e.target.value.length);
    }

    if (onChange) onChange?.(e);
  }, [showCharacterCount]);

  const handleBlur = useCallback((e) => {
    const input = inputRef.current;
    if (input) setIsInvalid(error || !input.checkValidity());
    if (onBlur) onBlur?.(e);
  }, [error]);

  return (
    <div className="input-wrapper">
      <div>
        {label && (
          <label htmlFor={id}>
            {label}
          </label>
        )}
        {(showTooltip && (!!tooltip || required)) && (
          <Tooltip
            icon={required ? (
              <FaAsterisk className="text-red-600" />
            ) : undefined}
          >
            {tooltip || "Required field."}
          </Tooltip>
        )}
      </div>
      <input
        id={id}
        name={name}
        type={type}
        ref={inputRef}
        value={value}
        pattern={pattern}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
        aria-invalid={isInvalid}
        aria-disabled={disabled}
        aria-describedby={descriptionId}
        maxLength={maxLength}
        {...props}
      />
      {showDetails && (
        <div className="input-bottom">
          <span id={descriptionId}>
            {isInvalid ? errorMsg : helpMsg}
          </span>
          <span>
            {showCharacterCount && characterCount}
            {(showCharacterCount && maxLength) && (` / ${maxLength}`)}
          </span>
        </div>
      )}
    </div>
  );
}
