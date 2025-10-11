import ProductGridShowCase from "../../../components/reusables/ProductGridShowCase";
import { useRelatedProducts } from "../../../hooks/useProducts";

export const RelatedProducts = ({ productSlug }: { productSlug: string }) => {
  const { data, isLoading, error } = useRelatedProducts(productSlug);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="container mx-auto my-12">
      <h2 className="text-2xl md:text-3xl my-2 font-semibold text-zinc-900">
        Related Products
      </h2>
      {data && <ProductGridShowCase products={data} />}
    </div>
  );
};
