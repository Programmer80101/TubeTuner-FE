"use client";

import { FaAsterisk } from "react-icons/fa";
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
  required = false,
  disabled = false,
  error = false,
  ...props
}) {
  const inputRef = useRef(null);
  const [isInvalid, setIsInvalid] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const descriptionId = `description-${id}`

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
        {(!!tooltip || required) && (
          <Tooltip
            icon={required ? (
              <div className="text-red-500 origin-center scale-190">*</div>
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
      <div className="input-bottom">
        <span id={descriptionId}>
          {isInvalid ? errorMsg : helpMsg}
        </span>
        <span>
          {showCharacterCount && characterCount}
          {(showCharacterCount && maxLength) && (` / ${maxLength}`)}
        </span>
      </div>
    </div>
  );
}
