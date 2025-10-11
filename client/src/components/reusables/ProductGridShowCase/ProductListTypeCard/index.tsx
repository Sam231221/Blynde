import { Product } from "../../../../types";
import { ProductCardActions } from "../components/ProductCardActions";
import ProductImageTransition from "../ProductGridTypeCard/ProductImageTransition";
import { ProductCardTag } from "../components/ProductCardTag";
import { ProductListBody } from "./ProductListBody";

export const ProductListTypeCard = ({ product }: { product: Product }) => {
  return (
    <div className="group flex flex-col sm:flex-row  gap-2 mb-3 border border-gray-200 overflow-hidden transition-all duration-200 ease-in">
      <div className="container">
        <div className={`relative w-full h-full overflow-hidden  `}>
          <ProductImageTransition
            name={product.name}
            img_albums={product.image_albums}
          />
          <ProductCardTag product={product} />
          <ProductCardActions product={product} />
        </div>
      </div>
      <ProductListBody product={product} />
    </div>
  );
};
