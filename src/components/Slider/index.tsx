import { useState } from "react";
import "./style.css";
const Slider = ({ currentValue, onChange, enableLabel = false }) => {
  const [value, setValue] = useState(currentValue);

  const handleChange = (event) => {
    setValue(Number(event.target.value));
    onChange(Number(event.target.value));
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <label
        htmlFor="customRange"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Price Range
      </label>

      {/* Slider container */}
      <div className="relative w-full">
        {/* Filled track */}
        <div
          className="absolute top-[9px] z-[3] left-0 h-2 bg-blue-500 rounded-lg"
          style={{ width: `${value}%` }}
        ></div>

        {/* Slider input */}
        <input
          type="range"
          id="customRange"
          min="0"
          max="100"
          value={value}
          onChange={handleChange}
          className="w-full h-2 z-[2] bg-gray-200 rounded-lg appearance-none cursor-pointer range-thumb relative "
        />
      </div>

      {/* Value labels */}
      {enableLabel && (
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>$0</span>
          <span>${value}</span>
          <span>$100</span>
        </div>
      )}
    </div>
  );
};

export default Slider;
