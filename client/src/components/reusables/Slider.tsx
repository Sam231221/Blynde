import type React from "react";
import { useState, useEffect, useRef } from "react";

interface CustomSliderProps {
  min: number;
  max: number;
  step?: number;
  className?: string;
  defaultValue?: number;
  onChange?: (value: number) => void;
}

const Slider: React.FC<CustomSliderProps> = ({
  className,
  min,
  max,
  step = 1,
  defaultValue = min,
  onChange,
}) => {
  const [value, setValue] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging && sliderRef.current) {
        const rect = sliderRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
        const percentage = x / rect.width;
        const newValue =
          Math.round((percentage * (max - min) + min) / step) * step;
        setValue(newValue);
        onChange?.(newValue);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, min, max, step, onChange]);

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div
      ref={sliderRef}
      className={`${className} relative h-2 w-full cursor-pointer rounded-full bg-gray-200`}
      onMouseDown={() => setIsDragging(true)}
    >
      <div
        className="absolute h-full rounded-full bg-blue-500 transition-all duration-150 ease-out"
        style={{ width: `${percentage}%` }}
      />
      <div
        className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full bg-white shadow-md transition-all duration-150 ease-out hover:scale-110 active:cursor-grabbing"
        style={{ left: `${percentage}%` }}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => {
          const newValue = Number(e.target.value);
          setValue(newValue);
          onChange?.(newValue);
        }}
        className="absolute inset-0 opacity-0"
        aria-label="Slider"
      />
    </div>
  );
};

export default Slider;
