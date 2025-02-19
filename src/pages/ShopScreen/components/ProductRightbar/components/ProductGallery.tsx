import { useState } from "react";

import { RxDashboard } from "react-icons/rx";
import { CiCircleList } from "react-icons/ci";

import ProductGridShowCase from "../../../../../components/reusables/ProductGridShowCase";

import {
  AppDispatch,
  Pagination,
  Product,
  RootState,
} from "../../../../../types";
import ContentLoader from "react-content-loader";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchProducts } from "../../../../../lib/productApi";
import { setFilters } from "../../../../../redux/reducers/FilterProductSlice";

export default function ProductGallery() {
  const filters = useSelector((state: RootState) => state.productfilters);
  const dispatch: AppDispatch = useDispatch();

  const [productsDisplaytype, setProductsDisplaytype] = useState("grid");
  const [productQtyPerPage, setProductQtyPerPage] = useState(8);
  const [sortOption, setSortOption] = useState("popularity");

  // Use useDebounce to debounce the filters state (debounce 500ms)
  const [debouncedFilters] = useDebounce(filters, 500);
  // Use Tanstack Query to fetch products with debounced filters
  // const { data, isLoading, isError, error } = useQuery<{
  //   results: Product[];
  //   pagination: Pagination;
  // }>({
  //   queryKey: ["products", debouncedFilters], // Query key and debounced filters
  //   queryFn: () =>
  //     fetchProducts(debouncedFilters as unknown as Record<string, string>), // Fetch function
  //   staleTime: 1000 * 60 * 5, // 5 minutes
  // });
  const isLoading = true;
  const handleProductQtyPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setProductQtyPerPage(Number(e.target.value));
    dispatch(
      setFilters({ ...filters, products_limit: Number(e.target.value) })
    );
  };
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
    dispatch(setFilters({ ...filters, ordering: e.target.value }));
  };

  // const currentPage = debouncedFilters.page || 1;
  // const totalPages = data?.pagination.total_pages || 1;

  // const handlePageChange = (page: number) => {
  //   dispatch(setFilters({ ...filters, page }));
  // };
  const showtype = "list";
  if (isLoading) {
    return (
      <>
        {showtype === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative h-[200px] sm:h-[300px]">
              <ContentLoader
                speed={2}
                className="w-full h-full"
                viewBox="0 0 400 460"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="0" y="60" rx="2" ry="2" width="400" height="400" />
              </ContentLoader>
              <div className="px-3 py-1">
                <ContentLoader
                  speed={2}
                  width={340}
                  height={84}
                  viewBox="0 0 340 84"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                  <rect x="2" y="-1" rx="3" ry="3" width="120" height="15" />
                  <rect x="2" y="21" rx="3" ry="4" width="160" height="15" />
                  <rect x="2" y="42" rx="3" ry="4" width="55" height="15" />
                  <rect x="70" y="41" rx="3" ry="4" width="55" height="15" />
                </ContentLoader>
              </div>
            </div>
            <div className="relative h-[200px] sm:h-[300px]">
              <ContentLoader
                speed={2}
                className="w-full h-full"
                viewBox="0 0 400 460"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="0" y="60" rx="2" ry="2" width="400" height="400" />
              </ContentLoader>
              <div className="px-3 py-1">
                <ContentLoader
                  speed={2}
                  width={340}
                  height={84}
                  viewBox="0 0 340 84"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                  <rect x="2" y="-1" rx="3" ry="3" width="120" height="15" />
                  <rect x="2" y="21" rx="3" ry="4" width="160" height="15" />
                  <rect x="2" y="42" rx="3" ry="4" width="55" height="15" />
                  <rect x="70" y="41" rx="3" ry="4" width="55" height="15" />
                </ContentLoader>
              </div>
            </div>
            <div className="relative h-[200px] sm:h-[300px]">
              <ContentLoader
                speed={2}
                className="w-full h-full"
                viewBox="0 0 400 460"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="0" y="60" rx="2" ry="2" width="400" height="400" />
              </ContentLoader>
              <div className="px-3 py-1">
                <ContentLoader
                  speed={2}
                  width={340}
                  height={84}
                  viewBox="0 0 340 84"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                  <rect x="2" y="-1" rx="3" ry="3" width="120" height="15" />
                  <rect x="2" y="21" rx="3" ry="4" width="160" height="15" />
                  <rect x="2" y="42" rx="3" ry="4" width="55" height="15" />
                  <rect x="70" y="41" rx="3" ry="4" width="55" height="15" />
                </ContentLoader>
              </div>
            </div>
            <div className="relative h-[200px] sm:h-[300px]">
              <ContentLoader
                speed={2}
                className="w-full h-full"
                viewBox="0 0 400 460"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="0" y="60" rx="2" ry="2" width="400" height="400" />
              </ContentLoader>
              <div className="px-3 py-1">
                <ContentLoader
                  speed={2}
                  width={340}
                  height={84}
                  viewBox="0 0 340 84"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                  <rect x="2" y="-1" rx="3" ry="3" width="120" height="15" />
                  <rect x="2" y="21" rx="3" ry="4" width="160" height="15" />
                  <rect x="2" y="42" rx="3" ry="4" width="55" height="15" />
                  <rect x="70" y="41" rx="3" ry="4" width="55" height="15" />
                </ContentLoader>
              </div>
            </div>
            <div className="relative h-[200px] sm:h-[300px]">
              <ContentLoader
                speed={2}
                className="w-full h-full"
                viewBox="0 0 400 460"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="0" y="60" rx="2" ry="2" width="400" height="400" />
              </ContentLoader>
              <div className="px-3 py-1">
                <ContentLoader
                  speed={2}
                  width={340}
                  height={84}
                  viewBox="0 0 340 84"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                  <rect x="2" y="-1" rx="3" ry="3" width="120" height="15" />
                  <rect x="2" y="21" rx="3" ry="4" width="160" height="15" />
                  <rect x="2" y="42" rx="3" ry="4" width="55" height="15" />
                  <rect x="70" y="41" rx="3" ry="4" width="55" height="15" />
                </ContentLoader>
              </div>
            </div>
            <div className="relative h-[200px] sm:h-[300px]">
              <ContentLoader
                speed={2}
                className="w-full h-full"
                viewBox="0 0 400 460"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="0" y="60" rx="2" ry="2" width="400" height="400" />
              </ContentLoader>
              <div className="px-3 py-1">
                <ContentLoader
                  speed={2}
                  width={340}
                  height={84}
                  viewBox="0 0 340 84"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                  <rect x="2" y="-1" rx="3" ry="3" width="120" height="15" />
                  <rect x="2" y="21" rx="3" ry="4" width="160" height="15" />
                  <rect x="2" y="42" rx="3" ry="4" width="55" height="15" />
                  <rect x="70" y="41" rx="3" ry="4" width="55" height="15" />
                </ContentLoader>
              </div>
            </div>
            <div className="relative h-[200px] sm:h-[300px]">
              <ContentLoader
                speed={2}
                className="w-full h-full"
                viewBox="0 0 400 460"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="0" y="60" rx="2" ry="2" width="400" height="400" />
              </ContentLoader>
              <div className="px-3 py-1">
                <ContentLoader
                  speed={2}
                  width={340}
                  height={84}
                  viewBox="0 0 340 84"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                  <rect x="2" y="-1" rx="3" ry="3" width="120" height="15" />
                  <rect x="2" y="21" rx="3" ry="4" width="160" height="15" />
                  <rect x="2" y="42" rx="3" ry="4" width="55" height="15" />
                  <rect x="70" y="41" rx="3" ry="4" width="55" height="15" />
                </ContentLoader>
              </div>
            </div>
            <div className="relative h-[200px] sm:h-[300px]">
              <ContentLoader
                speed={2}
                className="w-full h-full"
                viewBox="0 0 400 460"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="0" y="60" rx="2" ry="2" width="400" height="400" />
              </ContentLoader>
              <div className="px-3 py-1">
                <ContentLoader
                  speed={2}
                  width={340}
                  height={84}
                  viewBox="0 0 340 84"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                  <rect x="2" y="-1" rx="3" ry="3" width="120" height="15" />
                  <rect x="2" y="21" rx="3" ry="4" width="160" height="15" />
                  <rect x="2" y="42" rx="3" ry="4" width="55" height="15" />
                  <rect x="70" y="41" rx="3" ry="4" width="55" height="15" />
                </ContentLoader>
              </div>
            </div>
          </div>
        )}
        {showtype === "list" && (
          <div className="group flex flex-col sm:flex-row  gap-2 mb-3 border border-gray-200 overflow-hidden transition-all duration-200 ease-in">
            <div className="container">
              <ContentLoader
                speed={2}
                className="w-full h-full"
                viewBox="0 0 400 460"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="0" y="60" rx="2" ry="2" width="200" height="200" />
              </ContentLoader>
            </div>
            <div className="px-10 py-10"></div>
          </div>
        )}
      </>
    );
  }

  // if (isError) {
  //   return (
  //     <div>
  //       Error: {error instanceof Error ? error.message : "Unknown error"}
  //     </div>
  //   );
  // }

  return <></>;
}
// {
//   data && data.results.length > 0 ? (
//     <div className="container">
//       {/* filters */}
//       <div className="flex text-xs font-medium items-center justify-between my-4">
//         <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
//           <div className="flex gap-2">
//             <RxDashboard
//               className={`${
//                 productsDisplaytype === "grid"
//                   ? "text-gray-900"
//                   : "text-gray-00"
//               }`}
//               onClick={() => setProductsDisplaytype("grid")}
//               size={15}
//             />
//             <CiCircleList
//               className={`${
//                 productsDisplaytype === "list"
//                   ? "text-gray-900"
//                   : "text-gray-400"
//               }`}
//               onClick={() => setProductsDisplaytype("list")}
//               size={15}
//             />
//           </div>
//           <p>
//             Showing{" "}
//             {(data.pagination.current_page - 1) * filters.products_limit +
//               1}
//             -
//             {Math.min(
//               data.pagination.current_page * filters.products_limit,
//               data.pagination.total_items
//             )}{" "}
//             of {data.pagination.total_items} results
//           </p>
//         </div>
//         <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
//           <div className="flex gap-2 items-center">
//             <span>Show:</span>
//             <select
//               value={productQtyPerPage}
//               onChange={handleProductQtyPerPageChange}
//               className="focus:outline-none"
//               id="productQtyPerPage"
//             >
//               <option value="8">8 Items</option>
//               <option value="16">16 Items</option>
//               <option value="32">32 Items</option>
//               <option value="64">64 Items</option>
//               <option value="128">128 Items</option>
//             </select>
//           </div>
//           <div>
//             <span>Sort:</span>
//             <select
//               id="sortOption"
//               value={sortOption}
//               onChange={handleSortChange}
//               className="focus:outline-none"
//               name="sortProrducts"
//             >
//               <option value="-review_count">By Popularity</option>
//               <option value="-createdAt">By Latest</option>
//               <option value="price">By Price: Low to High</option>
//               <option value="-price">By Price: High to Low</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {data.results.length === 0 ? (
//         <div className="container mx-auto py-8 px-4">
//           <div
//             className="bg-zinc-100 border border-gray-400 text-gray-790 px-4 py-3 rounded relative"
//             role="alert"
//           >
//             <span className="block sm:inline">
//               No products were found matching your selection.
//             </span>
//           </div>
//         </div>
//       ) : (
//         <ProductGridShowCase
//           showtype={productsDisplaytype}
//           productheight={`h-[200px] sm:h-[300px]`}
//           products={data.results}
//         />
//       )}

//       {/* pagination */}
//       <div className="my-4 flex justify-center">
//         <nav className="inline-flex rounded-md shadow">
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Previous
//           </button>
//           {Array.from(
//             { length: totalPages },
//             (_, index) => index + 1
//           ).map((page) => (
//             <button
//               key={page}
//               onClick={() => handlePageChange(page)}
//               className={`px-3 py-2 border border-gray-300 text-sm font-medium ${
//                 currentPage === page
//                   ? "bg-blue-50 text-blue-600"
//                   : "bg-white text-gray-500 hover:bg-gray-50"
//               }`}
//             >
//               {page}
//             </button>
//           ))}
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Next
//           </button>
//         </nav>
//       </div>
//     </div>
//   ) : (
//     <>No products found</>
//   );
// }
