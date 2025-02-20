import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  MouseEvent,
} from "react";

interface RatingProps {
  color?: string;
  count?: number;
  fontSize?: number;
  value?: number;
  text?: string;
  className?: string;
  hoverEnabled?: boolean;
  hoverColor?: string;
  onChange?: (value: number) => void;
}

const Rating: React.FC<RatingProps> = ({
  color = "gold",
  count = 5,
  fontSize = 24,
  value = 0,
  text,
  className = "",
  hoverEnabled = false,
  hoverColor = "orange",
  onChange,
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [currentValue, setCurrentValue] = useState<number>(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleClick = useCallback(
    (index: number) => {
      setCurrentValue(index);
      if (onChange) {
        onChange(index);
      }
    },
    [onChange]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLSpanElement>, index: number) => {
      if (hoverEnabled) {
        const { left, width } = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - left;
        const isHalf = x < width / 2;
        setHoverValue(isHalf ? index - 0.5 : index);
      }
    },
    [hoverEnabled]
  );

  const handleMouseLeave = useCallback(() => {
    setHoverValue(null);
  }, []);

  const stars = useMemo(() => {
    const result = [];

    for (let i = 1; i <= count; i++) {
      let starClass = "far fa-star";

      if (hoverEnabled && hoverValue !== null) {
        if (hoverValue >= i) {
          starClass = "fas fa-star";
        } else if (hoverValue >= i - 0.5) {
          starClass = "fas fa-star-half-alt";
        }
      } else if (currentValue >= i) {
        starClass = "fas fa-star";
      } else if (currentValue >= i - 0.5) {
        starClass = "fas fa-star-half-alt";
      }

      result.push(
        <span
          key={i}
          onMouseMove={(e) => handleMouseMove(e, i)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(i)}
          style={{ cursor: hoverEnabled ? "pointer" : "default" }}
        >
          <i
            className={`${starClass} ${className}`}
            style={{
              color:
                hoverEnabled && hoverValue !== null && hoverValue >= i
                  ? hoverColor
                  : color,
              fontSize,
            }}
            aria-hidden="true"
          />
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
    handleClick,
    handleMouseMove,
    handleMouseLeave,
  ]);

  return (
    <span className={`rating items-center ${className}`} role="img">
      {stars}
      {text && (
        <span className="text-zinc-800 text-sm font-semibold ml-2">{text}</span>
      )}
    </span>
  );
};

export default Rating;
