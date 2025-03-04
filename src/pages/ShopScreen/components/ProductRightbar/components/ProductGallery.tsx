import { useSelector } from "react-redux";
import ProductGridShowCase from "../../../../../components/reusables/ProductGridShowCase";

import { setFilters } from "../../../../../redux/reducers/FilterProductSlice";
import { ProductRightBarFilters } from "./ProductRightBarFilters";
import { useProductsQuery } from "../../../../../hooks/useProducts";
import PaginationControls from "./PaginationControls";
import { GalleryLoading } from "./GalleryLoading";
import NoProductsFound from "./NoProductsFound";
import { RootState } from "../../../../../types/redux";
import { useAppDispatch } from "../../../../../redux/store";

export default function ProductGallery() {
  const filters = useSelector((state: RootState) => state.productfilters);
  const dispatch = useAppDispatch();

  const { data, isLoading, isError, error } = useProductsQuery();
  const handlePageChange = (page: number) => {
    dispatch(setFilters({ ...filters, page }));
  };

  if (isLoading) {
    return (
      <>
        <ProductRightBarFilters />
        <GalleryLoading />
      </>
    );
  }

  if (isError) {
    return (
      <div>
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  return (
    <>
      {data && data.results.length > 0 ? (
        <div className="container">
          {/* filters */}
          <ProductRightBarFilters />
          {data.results.length === 0 ? (
            <div className="container mx-auto py-8 px-4">
              <div
                className="bg-zinc-100 border border-gray-400 text-gray-790 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">
                  No products were found matching your selection.
                </span>
              </div>
            </div>
          ) : (
            <ProductGridShowCase
              productheight={`h-[200px] sm:h-[300px]`}
              products={data.results}
            />
          )}
          {/* pagination */}
          <PaginationControls
            currentPage={filters.page || 1}
            totalPages={data?.pagination.total_pages || 1}
            onPageChange={handlePageChange}
          />
        </div>
      ) : (
        <NoProductsFound />
      )}
    </>
  );
}
