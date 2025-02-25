import { Product } from "../../../../types";

export const ProductCardTag = ({ product }: { product: Product }) => {
  return (
    <div>
      {" "}
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
                  product.badge === "Featured" && "bg-blue-400 px-3 py-1"
                } ${product.badge === "Top Rated" && "bg-green-500 px-3 py-1"}`}
              >
                {product.badge}
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
};
