import { Link } from "react-router-dom";
import { Product } from "../../../../types";
import Rating from "../../../Rating";

export const ProductCardBody = ({ product }: { product: Product }) => {
  return (
    <div className="px-3 py-1">
      <Link to={`/products/${product.slug}`} className="uppercase font-medium">
        <h3 className="text-gray-800 text-sm capitalize duration-200 ease-in-out font-medium">
          {product.name}
        </h3>
      </Link>

      <Rating
        color={"#fc8c04"}
        fontSize={14}
        value={product.rating}
        text={`${product.reviews_count} reviews`}
      />
      <div className="flex px-1 gap-3 text-gray-800 mb-2 text-sm">
        {product.discounted_price !== parseFloat(product.price) ? (
          <>
            <del className="text-gray-300  tracking-wide text-sm my-2 ">
              ${product.price}
            </del>
            <p className="text-slate-800 font-medium tracking-wide text-sm my-2 ">
              ${product.discounted_price}
            </p>
          </>
        ) : (
          <p className="text-slate-800 font-medium tracking-wide text-sm my-2 ">
            ${product.price}
          </p>
        )}
      </div>
    </div>
  );
};
