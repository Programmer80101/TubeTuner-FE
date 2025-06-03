import { useCallback, useId } from 'react';
import "@/css/Range.css";

export default function RangeSlider({
  label = "",
  min = 0,
  max = 100,
  step = 1,
  value,
  setValue,
  trackColor = '#ccc',
  fillColor = '#007bff',
  height = 8,
}) {
  const percentage = ((value - min) / (max - min)) * 100;
  const id = useId();

  const trackStyle = {
    background: `linear-gradient(90deg, ${fillColor} ${percentage}%, ${trackColor} ${percentage}%)`,
    height: `${height}px`,
  };

  const handleInputChange = useCallback((e) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
  }, [setValue]);

  return (
    <div className="range-wrapper">
      <label htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleInputChange}
        style={trackStyle}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        role="slider"
      />
    </div>
  );
}
