import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
function SizeVariant({ handleSizeChange, sizes }) {
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    handleSizeChange(size);
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-medium  my-2 text-gray-800">
        Size: <span>{selectedSize}</span>
      </h1>
      <div className="flex">
        {sizes.map((size) => (
          <button
            key={size.id}
            className={`mr-3 border rounded px-6 py-1 hover:bg-blue-500 hover:text-white ${
              selectedSize === size.name ? "bg-blue-500 text-white" : ""
            } `}
            onClick={() => handleSizeClick(size.name)}
            disabled={size.stock === 0}
          >
            <span>{size.name}</span>
            {/* {size.stock === 0 && (
              <span className="text-xs ml-2">(Out of Stock)</span>
            )} */}
          </button>
        ))}
      </div>

      {selectedSize && (
        <button
          className="flex items-center mb-3"
          onClick={() => setSelectedSize(null)}
        >
          <IoCloseOutline size={18} />
          <span className="ml-2 text-xs"> Clear</span>
        </button>
      )}
    </div>
  );
}

export default SizeVariant;
