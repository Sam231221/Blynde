import ProductImageTransition from "./ProductImageTransition";
import { ProductCardTag } from "../components/ProductCardTag";
import { ProductCardActions } from "../components/ProductCardActions";
import { ProductCardBody } from "./ProductCardBody";
import { Product } from "../../../../types";
interface ProductGridTypeCard {
  product: Product;
  imageHeight: number;
}
export const ProductGridTypeCard = ({
  product,
  imageHeight,
}: ProductGridTypeCard) => {
  return (
    <div className="group border border-gray-200 overflow-hidden transition-all duration-200 ease-in">
      <div className={`relative h-[${imageHeight}px]`}>
        <ProductImageTransition
          name={product.name}
          img_albums={product.image_albums}
        />
        <ProductCardTag product={product} />
        <ProductCardActions product={product} />
      </div>
      <ProductCardBody product={product} />
    </div>
  );
};
