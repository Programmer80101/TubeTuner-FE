"use client";

import { useRef, useState, useCallback } from "react";
import Tooltip from "@/components/Tooltip";
import "@/css/Textarea.css"

export default function Textarea({
  id,
  name,
  label,
  rows = 4,
  value = "",
  placeholder = "",
  onChange,
  onBlur,
  maxLength,
  errorMsg = "Error!",
  helpMsg = "",
  tooltip = "",
  showCharacterCount = false,
  required = false,
  disabled = false,
  error = false,
  resizeable = true,
  ...props
}) {
  const textareaRef = useRef(null);
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
    const textarea = textareaRef.current;
    if (textarea) setIsInvalid(error || !textarea.checkValidity());
    if (onBlur) onBlur?.(e);
  }, [error]);

  return (
    <div className="textarea-wrapper">
      <div>
        {label && (
          <label htmlFor={id}>
            {label}
          </label>
        )}
        {(!!tooltip || required) && (
          <Tooltip
            icon={required ? (
              <div className="text-red-500 origin-center scale-195">*</div>
            ) : undefined}
          >
            {tooltip || "Required field."}
          </Tooltip>
        )}
      </div>
      <textarea
        id={id}
        name={name}
        rows={rows}
        ref={textareaRef}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
        aria-disabled={disabled}
        aria-invalid={isInvalid}
        aria-describedby={descriptionId}
        style={{
          resize: resizeable ? "vertical" : "none",
          borderBottomRightRadius: resizeable ? 0 : "2px",
        }}
        maxLength={maxLength}
        {...props}
      />
      <div className="textarea-bottom">
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
