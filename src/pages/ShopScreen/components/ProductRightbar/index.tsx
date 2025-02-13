import ProductBanner from "./components/ProductBanner";
import ProductGallery from "./components/ProductGallery";

export default function ProductRightbar() {
  return (
    <div className="relative pl-2 flex-1 ">
      <ProductBanner />
      <ProductGallery />
    </div>
  );
}
