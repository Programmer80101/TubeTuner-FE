"use client";

import { useRef, useState } from "react";
import Tooltip from "@/components/Tooltip";
import "@/css/Input.css";

export default function Input({
  id,
  name,
  label,
  type = "text",
  placeholder = "",
  value = "",
  onChange,
  onBlur,
  error = false,
  pattern,
  maxLength,
  errorMsg = "Error!",
  helpMsg = "",
  tooltip = "",
  showCharacterCount = false,
  required = false,
  disabled = false,
  ...props
}) {
  const inputRef = useRef(null);
  const [isInvalid, setIsInvalid] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const descriptionId = `description-${id}`

  const handleChange = (e) => {
    if (showCharacterCount) {
      setCharacterCount(e.target.value.length);
    }

    if (onChange) onChange?.(e);
  }

  const handleBlur = (e) => {
    const input = inputRef.current;
    if (input) setIsInvalid(error || !input.checkValidity());
    if (onBlur) onBlur?.(e);
  };

  return (
    <div className="input-wrapper">
      <div>
        {label && (
          <label htmlFor={id}>
            {label}
          </label>
        )}
        {}
        {!!tooltip && (
          <Tooltip>
            {tooltip}
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
        {...props}
      />
      <div className="input-bottom">
        <span id={descriptionId} className="input-msg">
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
