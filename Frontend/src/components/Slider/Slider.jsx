import React, { useState } from "react";
import "./Slider.css";

const Slider = ({ label, min, max, step, unit = "", value, onChange }) => {
  const [internalValue, setInternalValue] = useState(min);

  const isControlled = value !== undefined;

  const handleChange = (event) => {
    const newValue = event.target.value;
    if (isControlled && onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  const displayedValue = isControlled ? value : internalValue;

  return (
    <div className="slider-container">
      <div className="slider-label">
        {label}: {unit}{displayedValue}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={displayedValue}
        onChange={handleChange}
        className="slider"
      />
    </div>
  );
};

export default Slider;
