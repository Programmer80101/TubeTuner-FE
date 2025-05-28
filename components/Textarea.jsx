"use client";

import { useRef, useState } from "react";
import Tooltip from "@/components/Tooltip";
import "@/css/Textarea.css"

export default function Textarea({
  id,
  name,
  label,
  placeholder = "",
  value = "",
  onChange,
  onBlur,
  rows = 4,
  error = false,
  errorMsg = "Error!",
  helpMsg = "",
  disabled = false,
  tooltip = "",
  ...props
}) {
  const textareaRef = useRef(null);
  const [isInvalid, setIsInvalid] = useState(false);
  const descriptionId = `description-${id}`

  const handleBlur = (e) => {
    const textarea = textareaRef.current;
    if (textarea) setIsInvalid(error || !textarea.checkValidity());
    if (onBlur) onBlur?.(e);
  };

  return (
    <div className="textarea-wrapper">
      <div>
        {label && (
          <label htmlFor={id}>
            {label}
          </label>
        )}
        {!!tooltip && (
          <Tooltip>
            {tooltip}
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
        onChange={onChange}
        onBlur={handleBlur}
        disabled={disabled}
        aria-disabled={disabled}
        aria-invalid={isInvalid}
        aria-describedby={descriptionId}
        {...props}
      />
      <span id={descriptionId} className="textarea-msg">
        {isInvalid ? errorMsg : helpMsg}
      </span>
    </div>
  );
}
