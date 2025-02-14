import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Color } from "../../../../../../types";
interface ProductColorSelectProps {
  handleColorChange: (color: string) => void;
  colors: Color[];
  direction?: "horizontal" | "vertical";
}
const ColorCheckBox: React.FC<ProductColorSelectProps> = ({
  handleColorChange,
  colors,
  direction = "horizontal",
}) => {
  const [selectedColor, setSelectedColor] = useState<string>("");

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    handleColorChange(color);
  };

  return (
    <div className={`flex flex-col gap-2 `}>
      <div
        className={`flex gap-3 ${
          direction === "vertical" ? "flex-col" : "flex-row"
        }`}
      >
        {selectedColor && (
          <div className="flex items-center">
            <h1 className="font-medium mr-1">Selected:</h1>
            <span className="mr-1">{selectedColor}</span>
            <button
              className="flex bg-red-500 hover:bg-red-400 rounded-md px-2 py-1 text-white items-center my-2"
              onClick={() => {
                setSelectedColor("");
                handleColorChange("");
              }}
            >
              <IoCloseOutline fontSize={15} />
              <span className="ml-2 text-xs"> Clear</span>
            </button>
          </div>
        )}
        {colors.map((color) => (
          <div
            id={color.name}
            key={color.hex_code}
            className="flex items-center"
          >
            <div
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
            <span className="mx-2 text-sm">{color.name}</span>
            <div className="text-sm text-gray-400">({color.product_count})</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorCheckBox;
