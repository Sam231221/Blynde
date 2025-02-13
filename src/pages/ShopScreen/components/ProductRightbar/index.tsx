import ProductBanner from "./components/ProductBanner";
import ProductGallery from "./components/ProductGallery";
interface ProductGalleryProps {
  selectedFilters: {
    categories: string[];
    price: [number, number];
    sizes: string[];
    color: string[];
  };
  categories?: { name: string }[];
}
export default function ProductRightbar({
  selectedFilters,
}: ProductGalleryProps) {
  return (
    <div className="relative pl-2 flex-1 ">
      <ProductBanner />
      <ProductGallery selectedFilters={selectedFilters} />
    </div>
  );
}
