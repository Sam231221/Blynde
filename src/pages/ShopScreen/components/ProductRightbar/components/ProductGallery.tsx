import { useSelector } from "react-redux";
import ProductGridShowCase from "../../../../../components/reusables/ProductGridShowCase";

import { setFilters } from "../../../../../redux/reducers/FilterProductSlice";
import { ProductRightBarFilters } from "./ProductRightBarFilters";
import { useProductsQuery } from "../../../../../hooks/useProducts";
import PaginationControls from "./PaginationControls";
import { GalleryLoading } from "../../../../../components/Fallbacks/Loadings/GalleryLoading";
import NoProductsFound from "./NoProductsFound";
import { RootState } from "../../../../../types/redux";
import { useAppDispatch } from "../../../../../redux/store";
import { ServerDownError } from "../../../../../components/Fallbacks/Errors/ServerDownError";
import { useCallback } from "react";

export default function ProductGallery() {
  const filters = useSelector((state: RootState) => state.productfilters);
  const dispatch = useAppDispatch();

  const { data, isLoading, isError, refetch } = useProductsQuery();
  const handlePageChange = useCallback(
    (page: number) => {
      dispatch(setFilters({ ...filters, page }));
    },
    [dispatch, filters]
  );

  return (
    <div className="container">
      <ProductRightBarFilters />
      {isLoading && <GalleryLoading count={4} />}
      {isError && <ServerDownError refetch={refetch} />}
      {!isLoading && !isError && data?.results && (
        <>
          {data.results.length > 0 ? (
            <ProductGridShowCase
              productheight={`h-[200px] sm:h-[300px]`}
              products={data.results}
            />
          ) : (
            <NoProductsFound />
          )}
          <PaginationControls
            currentPage={filters.page}
            totalPages={data.pagination.total_pages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
