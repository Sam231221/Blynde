import { useState } from "react";
import Rating from "../../../Rating";
import { Product } from "../../../../types";
import ProductColorSelect from "../../../ProductColorSelect";
import SizeVariant from "../../../SizeVariant";
import ProductPriceInput from "../../../ProductPriceInput";
import { addToCart } from "../../../../redux/reducers/CartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export const ProductListBody = ({ product }: { product: Product }) => {
  const [data, setData] = useState({
    quantity: 1,
    color: "",
    size: "",
  });
  const dispatch = useDispatch();
  const handleQuantityChange = (quantity: number) => {
    setData((prev) => ({ ...prev, quantity }));
  };
  const handleColorChange = (color: string) => {
    setData((prev) => ({ ...prev, color }));
  };
  const handleSizeChange = (size: string) => {
    setData((prev) => ({ ...prev, size }));
  };

  const addToCartHandler = (id: string) => {
    const { quantity, size, color } = data;

    if (product._id === id && quantity && size && color) {
      dispatch(
        addToCart({
          _id: String(product._id),
          productId: String(product._id),
          name: product.name,
          price: product.sale_price ? product.sale_price : product.price,
          color,
          size,
          thumbnailUrl: product.thumbnail_url,
          qty: quantity,
        })
      );
    } else {
      toast.error("Please select size and color");
    }
  };
  return (
    <div className="container px-10 py-10">
      <Link
        className="text-zinc-800 font-semibold text-2xl"
        to={`/products/${product.slug}`}
      >
        {product.name}
      </Link>
      <div className="flex gap-2 items-center">
        <Rating
          fontSize={12}
          value={product.rating}
          text={`${product.review_count} reviews`}
          color={"#fc8c04"}
        />
      </div>
      <div className="flex gap-2 items-center">
        {product.sale_price ? (
          <>
            <del className="text-gray-300  tracking-wide text-lg my-2 ">
              ${product.price}
            </del>
            <p className="text-slate-800 font-medium tracking-wide text-lg my-2 ">
              ${product.sale_price}
            </p>
          </>
        ) : (
          <>
            <p className="text-slate-800 font-medium tracking-wide text-lg my-2 ">
              ${product.price}
            </p>
          </>
        )}
      </div>

      {product.description && (
        <p className="text-zinc-800 font-medium tracking-wide text-[12px] my-2 ">
          {product.description}
        </p>
      )}
      {product.colors && (
        <ProductColorSelect
          handleColorChange={handleColorChange}
          colors={product.colors}
        />
      )}
      {product.sizes && (
        <SizeVariant
          handleSizeChange={handleSizeChange}
          sizes={product.sizes}
        />
      )}
      <span className="bg-slate-100 mt-4 inline-block px-3 text-xs font-semibold text-green-600 rounded-lg p-2">
        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
      </span>
      <div className="flex mt-3 gap-2 items-center">
        {product.countInStock > 0 && (
          <ProductPriceInput handleChange={handleQuantityChange} />
        )}

        <button
          onClick={() => addToCartHandler(product._id)}
          className="bg-sky-500 w-full font-medium hover:bg-sky-600 text-white py-2 px-4"
          disabled={product.countInStock <= 0}
          type="button"
        >
          {" "}
          {product.countInStock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
};
