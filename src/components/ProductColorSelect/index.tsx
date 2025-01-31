import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
function ProductColorSelect({
  handleColorChange,
  colors,
  classNames,
  direction = "horizontal",
}) {
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorClick = (color) => {
    setSelectedColor(color);
    handleColorChange(color);
  };

  return (
    <div className={`flex flex-col gap-2 `}>
      <h1 className="font-medium text-gray-800">
        Colors: <span>{selectedColor}</span>
      </h1>
      <div
        className={`flex gap-3 ${
          direction === "vertical" ? "flex-col" : "flex-row"
        }`}
      >
        {colors.map((color) => (
          <div
            id={color.name}
            type="button"
            key={color.hex_code}
            className={`relative w-8 h-8 rounded-full cursor-pointer ${
              selectedColor === color.name
                ? "border-[2px] border-blue-500 "
                : ""
            } `}
            onClick={() => handleColorClick(color.name)}
          >
            <div
              style={{ backgroundColor: color.hex_code }}
              className="absolute border-2 border-gray-300 inset-0 m-1 rounded-full"
            ></div>
          </div>
        ))}
      </div>

      {selectedColor && (
        <button
          className="flex items-center mb-3"
          onClick={() => setSelectedColor(null)}
        >
          <IoCloseOutline color={15} />
          <span className="ml-2 text-xs"> Clear</span>
        </button>
      )}
    </div>
  );
}

export default ProductColorSelect;
