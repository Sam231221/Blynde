import {
  PiGlobeThin,
  PiHeartStraightLight,
  PiShareNetworkLight,
} from "react-icons/pi";
import { LazyLoadImage } from "react-lazy-load-image-component";

import ProductSlider from "../ProductSlider";
import Rating from "../Rating";
import ProductColorSelect from "../ProductColorSelect";
import SizeVariant from "../SizeVariant";
import ProductPriceInput from "../ProductPriceInput";
import { ShareProduct } from "./ShareProduct";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/reducers/CartSlice";
import { Product } from "../../types";
import { toast } from "react-toastify";
import Coupon from "./ProductGridShowCase/components/Coupon";
import { useProductCoupon } from "../../hooks/useOffers";

export interface ProductDetailProps {
  product: Product;
  handleColorChange?: (color: string) => void;
  handleSizeChange?: (size: string) => void;
  handleQuantityChange?: (quantity: number) => void;
  filters?: {
    quantity: number;
    color: string;
    size: string;
  };
  openModal?: (content: React.ReactNode) => void;
}
export const ProductDetail = ({ product, openModal }: ProductDetailProps) => {
  const [filters, setFilters] = useState({
    quantity: 1,
    color: "",
    size: "",
  });
  const [tempDisc, setTempDisc] = useState({
    price: product.price,
    discounted_price: product.discounted_price,
    discount_percentage: product.discount_percentage,
  });
  const [productCoupon, setProductCoupon] = useState("");
  const dispatch = useDispatch();
  const handleQuantityChange = (quantity: number) => {
    setFilters((prev) => ({ ...prev, quantity }));
  };
  const handleColorChange = (color: string) => {
    setFilters((prev) => ({ ...prev, color }));
  };
  const handleSizeChange = (size: string) => {
    setFilters((prev) => ({ ...prev, size }));
  };
  const { mutate, isPending, isError, data, error } = useProductCoupon();

  const handleApplyCoupon = () => {
    mutate(
      { productSlug: product.slug, couponCode: productCoupon },
      {
        onSuccess: (data) => {
          setTempDisc((prev) => ({
            ...prev,
            discounted_price: data.discounted_price,
            discount_percentage: data.discount_percentage,
          }));
        },
      }
    );
  };
  const addToCartHandler = (id: string) => {
    const { quantity, size, color } = filters;

    if (product._id === id && quantity && size && color) {
      dispatch(
        addToCart({
          productId: String(product._id),
          name: product.name,
          price: tempDisc.discounted_price
            ? tempDisc.discounted_price
            : parseFloat(tempDisc.price),
          color,
          size,
          thumbnailUrl: product.thumbnail_url,
          qty: quantity,
        })
      );
      toast.success(`${product.name} added to cart x ${quantity}`);
    } else {
      toast.error("Please select size and color");
    }
  };
  if (!product) return <>No product found.</>;

  return (
    <div className="flex my-8 flex-col md:flex-row md:h-screen gap-3">
      {product.image_albums.length > 0 && (
        <>
          {/* ProductSlider*/}
          <div className="md:flex-1 lg:flex-[3] ">
            <ProductSlider>
              {product.image_albums?.map((album, index) => (
                <LazyLoadImage
                  effect="blur"
                  key={index}
                  src={album.image_url}
                  alt="productimage"
                />
              ))}
            </ProductSlider>
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
                  text={`${product.reviews_count} reviews`}
                  color={"#fc8c04"}
                />
              </div>
              <div className="flex gap-2 items-center">
                {tempDisc.discounted_price !== parseFloat(tempDisc.price) ? (
                  <>
                    <del className="text-gray-300  tracking-wide text-lg my-2 ">
                      ${tempDisc.price}
                    </del>
                    <p className="text-slate-800 font-medium tracking-wide text-lg my-2 ">
                      ${tempDisc.discounted_price}
                    </p>
                  </>
                ) : (
                  <p className="text-slate-800 font-medium tracking-wide text-lg my-2 ">
                    ${tempDisc.price}
                  </p>
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
              <Coupon
                onApply={handleApplyCoupon}
                isLoading={isPending}
                isError={isError}
                error={error}
                data={data}
                onCouponChange={setProductCoupon}
              />

              <div className="flex mt-3 gap-2 items-center">
                {product.countInStock > 0 && (
                  <ProductPriceInput handleChange={handleQuantityChange} />
                )}

                <button
                  onClick={() => addToCartHandler(product._id)}
                  className={`${
                    product.countInStock <= 0
                      ? "bg-sky-200"
                      : "bg-sky-500 hover:bg-sky-600"
                  } w-full font-medium  text-white py-2 px-4`}
                  disabled={product.countInStock <= 0}
                  type="button"
                >
                  {" "}
                  Add to Cart
                </button>
              </div>
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
                  onClick={() =>
                    openModal &&
                    openModal(<ShareProduct id={String(product._id)} />)
                  }
                  className="text-zinc-800 flex items-center gap-2 font-medium tracking-wide text-sm my-2"
                >
                  <PiShareNetworkLight size={20} />
                  <span>Share this Product</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
