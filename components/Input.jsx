import { useRef, useState } from "react";
import Tooltip from "@/components/Tooltip";
import "@/css/Input.css";

export default function Input(
  {
    id,
    name,
    label,
    type = "text",
    placeholder = "",
    value,
    onChange,
    onBlur,
    error = false,
    pattern,
    errorMsg = "Error!",
    helpMsg = "",
    disabled = false,
    tooltip = "",
    ...props
  }
) {
  const inputRef = useRef(null);
  const [isInvalid, setIsInvalid] = useState(false);

  const handleBlur = (e) => {
    const input = inputRef.current;
    if (input) setIsInvalid(error || !input.checkValidity());
    if (onBlur) onBlur?.(e);
  };

  return (
    <div className="input-wrapper">
      {label && (
        <label htmlFor={id}>
          {label}
          {!!tooltip && (
            <Tooltip>
              {tooltip}
            </Tooltip>
          )}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        ref={inputRef}
        value={value}
        pattern={pattern}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={handleBlur}
        disabled={disabled}
        aria-invalid={isInvalid}
        {...props}
      />
      <span className="input-msg">
        {isInvalid ? errorMsg : helpMsg}
      </span>
    </div>
  );
}
