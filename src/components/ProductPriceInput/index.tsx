import React, { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
function ProductPriceInput({ unitPrice = 1, qty = 1, id, handleChange }) {
  const [quantity, setQuantity] = useState(qty);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    handleChange(quantity + 1, id);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      handleChange(quantity + 1, id);
    }
  };

  const totalPrice = quantity * unitPrice;

  return (
    <>
      <div className="relative inline-flex border items-center   ">
        <button
          className="text-gray-700  font-bold px-3 py-2 rounded"
          onClick={handleDecrement}
          disabled={quantity === 1}
        >
          <FiMinus size={15} />
        </button>

        <input
          type="text"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className=" active:border-none leading-6 active:outline-none  focus:outline-none focus:border-none p-2 w-8 text-center"
        />
        <button
          className="text-gray-700 font-bold px-3 py-2 rounded"
          onClick={handleIncrement}
          disabled={quantity === 20}
        >
          <FiPlus size={15} />
        </button>
      </div>
      {/* <span className='mt-4 ml-4'>Total: ${totalPrice}</span> */}
    </>
  );
}

export default ProductPriceInput;
