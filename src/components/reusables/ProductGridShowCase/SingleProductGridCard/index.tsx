import React from "react";
import ProductImageTransition from "./ProductImageTransition";
import { ProductTag } from "./ProductTag";
interface SingleProductGridCardProps {
  product: {
    name: string;
    image_albums: { image_url: string }[];
    sale_price: string;
    discount_percentage: number;
    priceBadge: string;
    badge: string;
    _id: string;
    slug: string;
    rating: number;
    review_count: number;
    price: string;
  };
  productheight: string;
  handleAddToWishlist: (id: string) => void;
  isPending: boolean;
  openModal: (content: React.ReactNode) => void;
  handleColorChange: (color: string) => void;
  handleSizeChange: (size: string) => void;
  handleQuantityChange: (quantity: number) => void;
  data: { quantity: number; color: string; size: string };
}
export const SingleProductGridCard = ({
  product,
  productheight,
  handleAddToWishlist,
  isPending,
  openModal,
  handleColorChange,
  handleSizeChange,
  handleQuantityChange,
  data,
}) => {
  return (
    <div className="group border border-gray-200 overflow-hidden transition-all duration-200 ease-in">
      <div className={`relative ${productheight}`}>
        <ProductImageTransition
          name={product.name}
          img_albums={product.image_albums}
        />
        <ProductTag product={product} />

        {/* Product Actions */}
      </div>

      <div className="px-3 py-1">
        <Link to={`/products/${product._id}`} className="uppercase font-medium">
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
  );
};
