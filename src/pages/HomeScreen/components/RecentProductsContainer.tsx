import NoProductsFound from "../../../components/NoProductsFound";
import ProductGridShowCase from "../../../components/reusables/ProductGridShowCase";
import { useRecentProducts } from "../../../hooks/useProducts";

export default function RecentProductsContainer() {
  const { isLoading, error, data } = useRecentProducts();

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

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

      {data ? (
        <ProductGridShowCase
          productheight={`h-[300px] sm:h-[400px]`}
          products={data}
        />
      ) : (
        <NoProductsFound />
      )}
    </div>
  );
}
