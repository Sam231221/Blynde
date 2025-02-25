import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { EyeOutline, HeartOutline, RepeatOutline } from "react-ionicons";
import ProductImageTransition from "./SingleProductGridCard/ProductImageTransition";
import Rating from "../../Rating";
import ProductColorSelect from "../../ProductColorSelect";
import SizeVariant from "../../SizeVariant";
import ProductPriceInput from "../../ProductPriceInput";

import { useModalContext } from "../../../providers/ModalProvider";
import { ProductDetail } from "../ProductDetail";
import { addToCart } from "../../../redux/reducers/CartSlice";
import { Product, RootState, WishlistItemCreatePayload } from "../../../types";
import { useCreateOrDeleteWishlistItem } from "../../../hooks/useWishlist";
import { toast } from "react-toastify";
import Spinner from "../../Spinner";

interface ProductGridShowCaseProps {
  showtype?: string;
  products: Product[];
  productheight: string;
}
export default function ProductGridShowCase({
  products,
  productheight,
}: ProductGridShowCaseProps) {
  const filters = useSelector((state: RootState) => state.productfilters);
  const { productsDisplayType } = filters;
  const { openModal } = useModalContext();

  const [data, setData] = useState({
    quantity: 1,
    color: "",
    size: "",
  });
  const handleQuantityChange = (quantity: number) => {
    setData((prev) => ({ ...prev, quantity }));
  };
  const handleColorChange = (color: string) => {
    setData((prev) => ({ ...prev, color }));
  };
  const handleSizeChange = (size: string) => {
    setData((prev) => ({ ...prev, size }));
  };

  return (
    <>
      {productsDisplayType === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product, i) => (
            <div
              key={i}
              className="group border border-gray-200 overflow-hidden transition-all duration-200 ease-in"
            >
              <div className={`relative ${productheight}`}>
                <ProductImageTransition
                  name={product.name}
                  img_albums={product.image_albums}
                />
                {product.sale_price ? (
                  <p
                    className={`absolute font-medium z-[3]  rounded-sm  text-white text-[12px]  bg-black top-[8px] px-10 py-1 left-[-29px] captialize -rotate-45  ${
                      product.priceBadge === "blue" && "bg-blue-500 px-3 py-1"
                    }`}
                  >
                    <span className="mr-4">{`${Math.floor(
                      product.discount_percentage
                    )}% Off`}</span>
                  </p>
                ) : (
                  <>
                    {product.badge && (
                      <>
                        <p
                          className={`absolute top-[15px] font-medium left-[15px] z-[3]  rounded-sm py-1 text-white text-[12px]  ${
                            product.badge === "Featured" &&
                            "bg-blue-400 px-3 py-1"
                          } ${
                            product.badge === "Top Rated" &&
                            "bg-green-500 px-3 py-1"
                          }`}
                        >
                          {product.badge}
                        </p>
                      </>
                    )}
                  </>
                )}
                {/* Product Actions */}
                <div className="absolute flex flex-col top-3 right-3 text-lg  transition-all duration-200 ease-in-out z-[3] translate-x-14 group-hover:translate-x-0  ">
                  <div
                    onClick={() => handleAddToWishlist(String(product._id))}
                    className="flex justify-center items-center w-10 h-10 bg-white mb-2 text-gray-400 border border-zinc-200  transition-all duration-200 ease-in-out rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-800"
                  >
                    {isPending ? (
                      <Spinner width={3} height={3} />
                    ) : (
                      <HeartOutline
                        color={"#00000"}
                        title={"Add to Wishlist"}
                        height="20px"
                        width="20px"
                        aria-label="Add to Wishlist"
                      />
                    )}
                  </div>
                  <div
                    onClick={() =>
                      openModal(
                        <ProductDetail
                          product={product}
                          handleColorChange={handleColorChange}
                          handleSizeChange={handleSizeChange}
                          handleQuantityChange={handleQuantityChange}
                          data={data}
                          openModal={openModal}
                        />
                      )
                    }
                    className="flex justify-center items-center w-10 h-10 bg-white mb-2 py-2 text-gray-400 border border-zinc-200  transition-all duration-200 ease-in-out rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-800"
                  >
                    <MdOutlineZoomOutMap
                      color={"#00000"}
                      title={"Mini Open"}
                      height="20px"
                      width="20px"
                      aria-label="Mini Open"
                    />
                  </div>
                  <Link
                    to={`/products/${product.slug}`}
                    className="flex justify-center items-center w-10 h-10 bg-white mb-2 text-gray-400 border border-zinc-200  transition-all duration-200 ease-in-out rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-800"
                  >
                    <EyeOutline
                      color={"#00000"}
                      title={"Show In Detail"}
                      height="20px"
                      width="20px"
                      aria-label="Show In Detail"
                    />
                  </Link>
                  <button className="flex justify-center items-center w-10 h-10 bg-white mb-2 text-gray-400 border border-zinc-200  transition-all duration-200 ease-in-out rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-800">
                    <RepeatOutline
                      color={"#00000"}
                      title={"repeat-outline"}
                      height="20px"
                      width="20px"
                      aria-label="repeat outline"
                    />
                  </button>
                </div>
              </div>

              <div className="px-3 py-1">
                <Link
                  to={`/products/${product._id}`}
                  className="uppercase font-medium"
                >
                  <h3 className="text-gray-800 text-sm capitalize duration-200 ease-in-out font-medium">
                    {product.name}
                  </h3>
                </Link>

                <Rating
                  color={"#fc8c04"}
                  fontSize={14}
                  value={product.rating}
                  text={`${product.review_count} reviews`}
                />

                <div className="flex px-1 gap-3 text-gray-800 mb-2 text-sm">
                  <p className="font-bold">${product.price}</p>
                  {product.sale_price && (
                    <del className="text-gray-400">${product.sale_price}</del>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {productsDisplayType === "list" && (
        <div className={`relative`}>
          {products.map((product, i) => (
            <div
              key={i}
              className="group flex flex-col sm:flex-row  gap-2 mb-3 border border-gray-200 overflow-hidden transition-all duration-200 ease-in"
            >
              <div className="container">
                <div className={`relative w-full h-full overflow-hidden  `}>
                  <ProductImageTransition
                    name={product.name}
                    img_albums={product.image_albums}
                  />
                  {product.sale_price ? (
                    <p
                      className={`absolute font-medium  z-[3]  rounded-sm  text-white text-[12px]  bg-black top-[8px] px-10 py-1 left-[-29px] captialize -rotate-45  ${
                        product.priceBadge === "blue" && "bg-blue-500 px-3 py-1"
                      }`}
                    >
                      <span className="mr-4">{`${Math.floor(
                        product.discount_percentage
                      )}% Off`}</span>
                    </p>
                  ) : (
                    <>
                      {product.badge && (
                        <>
                          <p
                            className={`absolute top-[15px] font-medium left-[15px] z-[3]  rounded-sm py-1 text-white text-[12px]  ${
                              product.badge === "Featured" &&
                              "bg-blue-400 px-3 py-1"
                            } ${
                              product.badge === "Top Rated" &&
                              "bg-green-500 px-3 py-1"
                            }`}
                          >
                            {product.badge}
                          </p>
                        </>
                      )}
                    </>
                  )}
                  {/* Product Actions */}
                  <div className="absolute flex flex-col top-3 right-3 text-lg  transition-all duration-200 ease-in-out z-[3] translate-x-14 group-hover:translate-x-0 ">
                    <div className="flex justify-center items-center w-10 h-10 bg-white mb-2 text-gray-400 border border-zinc-200  transition-all duration-200 ease-in-out rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-800">
                      <HeartOutline
                        color={"#00000"}
                        title={"heart-outline"}
                        height="20px"
                        width="20px"
                        aria-label="heart outline"
                      />
                    </div>
                    <div className="flex justify-center items-center w-10 h-10 bg-white mb-2 py-2 text-gray-400 border border-zinc-200  transition-all duration-200 ease-in-out rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-800">
                      <MdOutlineZoomOutMap
                        onClick={() =>
                          openModal(<ProductDetail product={product} />)
                        }
                        size={15}
                      />
                    </div>
                    <Link
                      to={`/products/${product._id}`}
                      className="flex justify-center items-center w-10 h-10 bg-white mb-2 text-gray-400 border border-zinc-200  transition-all duration-200 ease-in-out rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-800"
                    >
                      <EyeOutline
                        color={"#00000"}
                        title={"add-to-wishlist"}
                        height="20px"
                        width="20px"
                        aria-label="Add to Wishlist"
                      />
                    </Link>
                    <button className="flex justify-center items-center w-10 h-10 bg-white mb-2 text-gray-400 border border-zinc-200  transition-all duration-200 ease-in-out rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-800">
                      <RepeatOutline
                        color={"#00000"}
                        title={"repeat-outline"}
                        height="20px"
                        width="20px"
                        aria-label="repeat outline"
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="container px-10 py-10">
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
                    onClick={() =>
                      addToCartHandler(
                        product._id,
                        product.name,
                        product.sale_price ? product.sale_price : product.price,
                        data.color,
                        data.size,
                        product.thumbnail_url,
                        data.quantity
                      )
                    }
                    className="bg-sky-500 w-full font-medium hover:bg-sky-600 text-white py-2 px-4"
                    disabled={product.countInStock <= 0}
                    type="button"
                  >
                    {" "}
                    {product.countInStock > 0 ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
