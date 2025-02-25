import { useSelector } from "react-redux";

import { Product, RootState } from "../../../types";

import { ProductGridTypeCard } from "./ProductGridTypeCard";

import { ProductListTypeCard } from "./ProductListTypeCard";

interface ProductGridShowCaseProps {
  showtype?: string;
  products: Product[];
}
export default function ProductGridShowCase({
  products,
}: ProductGridShowCaseProps) {
  const filters = useSelector((state: RootState) => state.productfilters);
  const { productsDisplayType } = filters;

  return (
    <>
      {productsDisplayType === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product, i) => (
            <ProductGridTypeCard key={i} imageHeight={300} product={product} />
          ))}
        </div>
      )}
      {productsDisplayType === "list" && (
        <div className={`relative`}>
          {products.map((product, i) => (
            <ProductListTypeCard key={i} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
