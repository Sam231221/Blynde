import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
interface ProductPriceInputProps {
  qty?: number;
  id?: number;
  handleChange?: (qty: number, id: number | undefined) => void;
}
function ProductPriceInput({
  qty = 1,
  id,
  handleChange,
}: ProductPriceInputProps) {
  const [quantity, setQuantity] = useState(qty);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    if (handleChange) {
      handleChange(quantity + 1, id);
    }
  };

  const handleDecrement = () => {
    if (handleChange) {
      handleChange(quantity - 1, id);
    }
    setQuantity(quantity - 1);
  };

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
    </>
  );
}

export default ProductPriceInput;
