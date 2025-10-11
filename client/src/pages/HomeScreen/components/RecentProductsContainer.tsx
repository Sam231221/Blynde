import ProductGridShowCase from "../../../components/reusables/ProductGridShowCase";
import { useRecentProducts } from "../../../hooks/useProducts";
import { GalleryLoading } from "../../../components/Fallbacks/Loadings/GalleryLoading";
import { ServerDownError } from "../../../components/Fallbacks/Errors/ServerDownError";

export default function RecentProductsContainer() {
  const { isLoading, isError, data, refetch } = useRecentProducts();

  return (
    <div className="container mx-auto my-12">
      <h2 className="text-2xl md:text-3xl my-2 text-center font-semibold text-zinc-900">
        New Products
      </h2>
      <p className="text-zinc-500 mb-5 text-center text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
        suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
        lacus vel facilisis.
      </p>
      {isLoading && <GalleryLoading count={4} />}
      {isError && <ServerDownError refetch={refetch} />}
      {!isLoading && !isError && data && (
        <ProductGridShowCase
          productheight={`h-[300px] sm:h-[400px]`}
          products={data}
        />
      )}
    </div>
  );
}
