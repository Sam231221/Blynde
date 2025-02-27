import clsx from "clsx";
import { Product } from "../../../../types";

export const ProductCardTag = ({ product }: { product: Product }) => {
  return (
    <div>
      {product.discount_percentage !== null && (
        <p
          className={`absolute font-medium z-[3]  rounded-sm  text-white text-[12px]  bg-black top-[8px] px-10 py-1 left-[-29px] captialize -rotate-45  ${
            product.priceBadge === "blue" && "bg-blue-500 px-3 py-1"
          }`}
        >
          <span className="mr-4">{`${Math.floor(
            product.discount_percentage
          )}% Off`}</span>
        </p>
      )}
      {product.badge && (
        <>
          <p
            className={clsx(
              "absolute bottom-[15px] right-2 bg-slate-800 font-medium z-[3] rounded-sm py-1 px-2 text-white text-[12px]",
              product.badge === "Featured" && "bg-blue-400 px-3 py-1",
              product.badge === "Trending" && "bg-green-500 px-3 py-1",
              product.badge === "Exclusive" && "bg-purple-500 px-3 py-1",
              product.badge === "Limited Edition" && "bg-yellow-500 px-3 py-1"
            )}
          >
            {product.badge}
          </p>
        </>
      )}
    </div>
  );
};
