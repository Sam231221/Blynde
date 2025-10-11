import { useState } from "react";
import "./style.css";
import DoubleSlider from "./DoubleSlider";
import { setPrice } from "../../../../../../redux/reducers/FilterProductSlice";
import { useAppDispatch } from "../../../../../../types/redux";

export default function DoubleRangePriceSlider() {
  const dispatch = useAppDispatch();

  const [values, setValues] = useState<[number, number]>([0, 600]);

  const handleSliderChange = (minValue: number, maxValue: number) => {
    setValues([minValue, maxValue]);
    dispatch(setPrice([minValue, maxValue]));
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
          min={0}
          max={600}
          defaultMinValue={values[0]}
          defaultMaxValue={values[1]}
          onChange={handleSliderChange}
        />
      </div>
    </div>
  );
}
