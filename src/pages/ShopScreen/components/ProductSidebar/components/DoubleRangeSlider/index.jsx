import { useEffect, useState } from "react";
import "./style.css";
import Slider from "react-slider";

export default function DoubleRangeSlider({ handlePriceChange, min, max }) {
  const [values, setValues] = useState([min, max]);

  const handleSliderChange = (newValue) => {
    setValues(newValue);

    handlePriceChange(newValue);
  };

  return (
    <div className="w-full mb-4">
      <h2 className="text-lg tracking-wide font-medium text-gray-900">
        Price Range
      </h2>

      <div className="px-3 text-[14px] font-medium">
        <div className="">
          ${values[0]} - ${values[1]}
        </div>

        <p>Current Range:${values[1] - values[0]}</p>
        <Slider
          className={"slider"}
          onChange={handleSliderChange}
          value={values}
          min={min}
          max={max}
        />
      </div>
    </div>
  );
}
