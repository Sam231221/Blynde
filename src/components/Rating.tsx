import { useState, useEffect, useMemo } from "react";

export default function Rating({
  color = "gold",
  count = 5,
  fontSize = "24px",
  value = 0,
  text,
  className = "",
  hoverEnabled = false,
  hoverColor = "orange",
  onChange,
}) {
  const [hoverValue, setHoverValue] = useState(null);
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value); // Update currentValue when value prop changes
  }, [value]);

  const handleClick = (index) => {
    setCurrentValue(index);
    if (onChange) {
      onChange(index);
    }
  };

  const handleMouseMove = (e, index) => {
    if (hoverEnabled) {
      const { left, width } = e.target.getBoundingClientRect();
      const x = e.clientX - left;
      const isHalf = x < width / 2;
      setHoverValue(isHalf ? index - 0.5 : index);
    }
  };

  const stars = useMemo(() => {
    const result = [];
    for (let i = 1; i <= count; i++) {
      let starClass = "far fa-star";
      if (hoverEnabled && hoverValue >= i) {
        starClass = "fas fa-star";
      } else if (hoverEnabled && hoverValue >= i - 0.5) {
        starClass = "fas fa-star-half-alt";
      } else if (currentValue >= i) {
        starClass = "fas fa-star";
      } else if (currentValue >= i - 0.5) {
        starClass = "fas fa-star-half-alt";
      }

      result.push(
        <span
          key={i}
          onMouseMove={(e) => handleMouseMove(e, i)}
          onMouseLeave={() => setHoverValue(null)}
          onClick={() => handleClick(hoverValue)}
        >
          <i
            className={`${starClass} ${className}`}
            style={{
              color: hoverEnabled && hoverValue >= i ? hoverColor : color,
              fontSize,
            }}
            aria-hidden="true"
          ></i>
        </span>
      );
    }
    return result;
  }, [
    count,
    currentValue,
    hoverEnabled,
    hoverValue,
    color,
    hoverColor,
    fontSize,
    className,
  ]);

  return (
    <span className={`rating items-center ${className}`} role="img">
      {stars}
      {text && (
        <span className="text-zinc-800 text-sm font-semibold ml-2">{text}</span>
      )}
    </span>
  );
}
