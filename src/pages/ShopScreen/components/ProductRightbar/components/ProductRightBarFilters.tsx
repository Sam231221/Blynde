import { CiCircleList } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";
import {
  setFilters,
  setProductsDisplayType,
} from "../../../../../redux/reducers/FilterProductSlice";
import { useMemo, useState } from "react";

import { useProductsQuery } from "../../../../../hooks/useProducts";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../types/redux";
import { useAppDispatch } from "../../../../../redux/store";

export const ProductRightBarFilters = () => {
  const filters = useSelector((state: RootState) => state.productfilters);
  const dispatch = useAppDispatch();
  const { productsDisplayType, products_limit } = filters;
  const [productQtyPerPage, setProductQtyPerPage] = useState(8);
  const [sortOption, setSortOption] = useState("popularity");
  const { data, isLoading } = useProductsQuery();

  const paginationInfo = useMemo(() => {
    if (!data) return null;
    const { current_page, total_items } = data.pagination;
    const start = (current_page - 1) * products_limit + 1;
    const end = Math.min(current_page * products_limit, total_items);
    return `Showing ${start}-${end} of ${total_items} results`;
  }, [data, products_limit]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;

    if (id === "productQtyPerPage") {
      setProductQtyPerPage(Number(value));
      dispatch(setFilters({ ...filters, products_limit: Number(value) }));
    } else if (id === "sortOption") {
      setSortOption(value);
      dispatch(setFilters({ ...filters, ordering: value }));
    }
  };

  return (
    <div className="flex text-xs font-medium items-center justify-between my-4">
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
        <div className="flex gap-2">
          <RxDashboard
            className={`${
              productsDisplayType === "grid" ? "text-gray-900" : "text-gray-400"
            }`}
            onClick={() => dispatch(setProductsDisplayType("grid"))}
            size={15}
          />
          <CiCircleList
            className={`${
              productsDisplayType === "list" ? "text-gray-900" : "text-gray-400"
            }`}
            onClick={() => dispatch(setProductsDisplayType("list"))}
            size={15}
          />
        </div>
        {isLoading ? <p>Loading...</p> : <p>{paginationInfo}</p>}
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
        <div className="flex gap-2 items-center">
          <span>Show:</span>
          <select
            value={productQtyPerPage}
            onChange={handleChange}
            className="focus:outline-none"
            id="productQtyPerPage"
          >
            {[8, 16, 32, 64, 128].map((qty) => (
              <option key={qty} value={qty}>
                {qty} Items
              </option>
            ))}
          </select>
        </div>
        <div>
          <span>Sort:</span>
          <select
            id="sortOption"
            value={sortOption}
            onChange={handleChange}
            className="focus:outline-none"
            name="sortProrducts"
          >
            <option value="-review_count">By Popularity</option>
            <option value="-createdAt">By Latest</option>
            <option value="price">By Price: Low to High</option>
            <option value="-price">By Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};
