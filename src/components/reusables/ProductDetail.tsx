import {
  PiGlobeThin,
  PiHeartStraightLight,
  PiShareNetworkLight,
} from "react-icons/pi";
import ProductSlider from "../ProductSlider";
import Rating from "../Rating";
import ProductColorSelect from "../ProductColorSelect";
import SizeVariant from "../SizeVariant";
import ProductPriceInput from "../ProductPriceInput";
import { endpoint } from "../../lib/api";
import { ShareProduct } from "./ShareProduct";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/reducers/Cart/CartSlice";

export const ProductDetail = ({ product, openModal }) => {
  const [data, setData] = useState({
    quantity: 1,
    color: "",
    size: "",
  });
  const dispatch = useDispatch();
  const handleQuantityChange = (quantity) => {
    setData((prev) => ({ ...prev, quantity }));
  };
  const handleColorChange = (color) => {
    setData((prev) => ({ ...prev, color }));
  };
  const handleSizeChange = (size) => {
    setData((prev) => ({ ...prev, size }));
  };
  console.log(data);
  const addToCartHandler = () => {
    const { quantity, size, color } = data;
    if (quantity && size && color) {
      dispatch(
        addToCart({
          productId: product._id,
          name: product.name,
          price: product.sale_price ? product.sale_price : product.price,
          color,
          size,
          thumbnail: product.thumbnail,
          quantity,
        })
      );
    } else {
      alert("Please select size and color");
    }
  };

  return (
    <div className="flex my-8 flex-col md:flex-row md:h-screen gap-3">
      {/* ProductSlider*/}

      <div className="md:flex-1 lg:flex-[3] ">
        {product.image_albums && (
          <ProductSlider>
            {product.image_albums?.map((album, index) => (
              <img
                key={index}
                src={`${endpoint}${album.image}`}
                alt={album.image}
              />
            ))}
          </ProductSlider>
        )}
      </div>

      {/* Rightbar */}
      <div className="md:flex-1 lg:flex-[2] ">
        <div>
          <h2 className="text-zinc-800 font-semibold text-2xl">
            {product.name}
          </h2>
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
          {product.size && (
            <SizeVariant
              handleSizeChange={handleSizeChange}
              sizes={product.size}
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
              onClick={() => addToCartHandler()}
              className="bg-sky-500 w-full font-medium hover:bg-sky-600 text-white py-2 px-4"
              disabled={product.countInStock <= 0}
              type="button"
            >
              {" "}
              Add to Cart
            </button>
          </div>

          {/* {product.countInStock == 0} returns booleand value */}
          <div className="flex my-2 justify-between items-center">
            <a
              href="#"
              className="text-zinc-800 flex items-center gap-2 font-medium tracking-wide text-sm my-2"
            >
              <PiGlobeThin size={20} />
              <span>Size Guide</span>
            </a>{" "}
            <button className="text-zinc-800 flex items-center gap-2 font-medium tracking-wide text-sm my-2">
              <PiHeartStraightLight size={20} />
              <span>Add to Wishlist</span>
            </button>
            <button
              onClick={() => openModal(<ShareProduct id={product._id} />)}
              className="text-zinc-800 flex items-center gap-2 font-medium tracking-wide text-sm my-2"
            >
              <PiShareNetworkLight size={20} />
              <span>Share this Product</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
