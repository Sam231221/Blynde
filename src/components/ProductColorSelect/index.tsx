import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
interface ProductColorSelectProps {
  handleColorChange?: (color: string) => void;
  colors: { hex_code: string; name: string; stock?: number }[];
  direction?: "horizontal" | "vertical";
}
const ProductColorSelect: React.FC<ProductColorSelectProps> = ({
  handleColorChange,
  colors,
  direction = "horizontal",
}) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    if (handleColorChange) handleColorChange(color);
  };

  return (
    <div className={`flex flex-col gap-2 `}>
      <h1 className="font-medium text-gray-800">
        Color: <span>{selectedColor}</span>
      </h1>
      <div
        className={`flex gap-3 ${
          direction === "vertical" ? "flex-col" : "flex-row"
        }`}
      >
        {colors.map((color) => (
          <div
            id={color.name}
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
          <IoCloseOutline fontSize={15} />
          <span className="ml-2 text-xs"> Clear</span>
        </button>
      )}
    </div>
  );
};

export default ProductColorSelect;
