import { useState } from "react";
import "./style.css";
import DoubleSlider from "../../../../../../components/reusables/DoubleSlider";

interface DoubleRangeSliderProps {
  handlePriceChange: (range: [number, number]) => void;
  min: number;
  max: number;
}

export default function DoubleRangePriceSlider({
  handlePriceChange,
  min = 0,
  max = 100,
}: DoubleRangeSliderProps) {
  const [values, setValues] = useState<[number, number]>([min, max]);

  const handleSliderChange = (minValue: number, maxValue: number) => {
    setValues([minValue, maxValue]);
    handlePriceChange([minValue, maxValue]);
  };

  return (
    <div className="w-full mb-4">
      <h2 className="text-lg tracking-wide font-medium text-gray-900">
        Price Range
      </h2>

      <div className="px-3 text-[14px] font-medium">
        <div>
          ${values[0]} - ${values[1]}
        </div>

        <p>Current Range: ${values[1] - values[0]}</p>

        <DoubleSlider
          className="slider"
          min={min}
          max={max}
          defaultMinValue={values[0]}
          defaultMaxValue={values[1]}
          onChange={handleSliderChange}
        />
      </div>
    </div>
  );
}
