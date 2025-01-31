import React, { useEffect, useState } from "react";

function ColorCheckBox({
  colors,
  classNames,
  direction = "horizontal",
  handleColorChange,
}) {
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorClick = (color) => {
    if (selectedColor == color) {
      setSelectedColor(null);
      handleColorChange("");
    } else {
      setSelectedColor(color);
      handleColorChange(color);
    }
  };

  return (
    <div className={`flex flex-col gap-2 `}>
      <div
        className={`flex ${direction === "vertical" ? "flex-col" : "flex-row"}`}
      >
        {colors.map((color, i) => (
          <div
            key={i}
            className="flex justify-between items-center font-medium"
          >
            <div className="flex items-center">
              <div
                id={`color-${color.hex_code}`}
                type="button"
                key={color.hex_code}
                className={`relative w-8 h-8 rounded-full cursor-pointer ${
                  selectedColor === color.name
                    ? "border-[1px] border-blue-500"
                    : ""
                } ${
                  color.stock === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : ""
                }`}
                onClick={() => handleColorClick(color.name)}
                disabled={color.stock === 0}
              >
                <div
                  style={{ backgroundColor: color.hex_code }}
                  className="absolute border-2 border-gray-200 inset-0 m-1 rounded-full"
                ></div>
              </div>
              <span className="ml-2 text-sm">{color.name}</span>
            </div>
            <div className="text-sm text-gray-400">({color.product_count})</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ColorCheckBox;
