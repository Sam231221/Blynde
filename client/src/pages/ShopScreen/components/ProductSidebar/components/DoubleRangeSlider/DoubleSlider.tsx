import type React from "react";
import { useState, useEffect, useRef } from "react";

interface CustomDoubleSliderProps {
  min: number;
  max: number;
  className?: string;
  step?: number;
  defaultMinValue?: number;
  defaultMaxValue?: number;
  onChange?: (minValue: number, maxValue: number) => void;
}

const DoubleSlider: React.FC<CustomDoubleSliderProps> = ({
  min,
  max,
  className,
  step = 1,
  defaultMinValue = min,
  defaultMaxValue = max,
  onChange,
}) => {
  const [minValue, setMinValue] = useState(defaultMinValue);
  const [maxValue, setMaxValue] = useState(defaultMaxValue);
  const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging && sliderRef.current) {
        const rect = sliderRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
        const percentage = x / rect.width;
        const newValue =
          Math.round((percentage * (max - min) + min) / step) * step;

        if (isDragging === "min") {
          setMinValue(Math.min(newValue, maxValue - step));
        } else {
          setMaxValue(Math.max(newValue, minValue + step));
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(null);
      onChange?.(minValue, maxValue);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, min, max, step, onChange, minValue, maxValue]);

  const minPercentage = ((minValue - min) / (max - min)) * 100;
  const maxPercentage = ((maxValue - min) / (max - min)) * 100;

  return (
    <div className="relative py-4">
      <div
        ref={sliderRef}
        className={`${className} relative h-2 w-full cursor-pointer rounded-full bg-gray-200`}
      >
        <div
          className="absolute h-full rounded-full bg-blue-500 transition-all duration-150 ease-out"
          style={{
            left: `${minPercentage}%`,
            right: `${100 - maxPercentage}%`,
          }}
        />
        <div
          className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full bg-white shadow-md transition-all duration-150 ease-out hover:scale-110 active:cursor-grabbing"
          style={{ left: `${minPercentage}%` }}
          onMouseDown={() => setIsDragging("min")}
        />
        <div
          className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full bg-white shadow-md transition-all duration-150 ease-out hover:scale-110 active:cursor-grabbing"
          style={{ left: `${maxPercentage}%` }}
          onMouseDown={() => setIsDragging("max")}
        />
      </div>
      <div className="mt-4 flex justify-between text-sm text-gray-600">
        <span>{minValue}</span>
        <span>{maxValue}</span>
      </div>
    </div>
  );
};

export default DoubleSlider;
