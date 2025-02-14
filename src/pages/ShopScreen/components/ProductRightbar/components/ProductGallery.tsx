import { useState, useEffect, useMemo, useCallback } from "react";

import { RxDashboard } from "react-icons/rx";
import { CiCircleList } from "react-icons/ci";

import ProductGridShowCase from "../../../../../components/reusables/ProductGridShowCase";

import { Product, RootState } from "../../../../../types";
import { apiRequest } from "../../../../../lib/api";
import { useSelector } from "react-redux";
interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}
interface FilterProductsParams {
  sortedProducts: Product[];
  selectedFilters: {
    categories: string[];
    price: [number, number];
    sizes: string[];
    color: string;
  };
}
export default function ProductGallery() {
  const selectedFilters = useSelector(
    (state: RootState) => state.productfilters
  );

  const [products, setProducts] = useState<Product[]>([]);
  const [productsDisplaytype, setProductsDisplaytype] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });
  const [productQtyPerPage, setProductQtyPerPage] = useState(8);
  const [sortOption, setSortOption] = useState("popularity");

  // fetch products
  useEffect(() => {
    async function fetchProducts() {
      try {
        const params = {
          page: pagination.currentPage,
          page_size: productQtyPerPage,
          sort: sortOption,
          ...selectedFilters,
        };
        const data = await apiRequest("/api/products/all/", "GET", {
          params,
        });
        setProducts(data.results);
        setPagination({
          currentPage: data.pagination.current_page,
          totalPages: data.pagination.total_pages,
          totalItems: data.pagination.total_items,
        });
        setLoading(false);
      } catch (err) {
        setError(
          `An error occurred while fetching products: ${
            err instanceof Error ? err.message : String(err)
          }`
        );
        setLoading(false);
      }
    }

    fetchProducts();
  }, [pagination.currentPage, productQtyPerPage, sortOption, selectedFilters]);

  const paginate = useCallback(
    (pageNumber: number) => {
      if (pageNumber >= 1 && pageNumber <= pagination.totalPages) {
        setPagination((prevPagination: Pagination) => ({
          ...prevPagination,
          currentPage: pageNumber,
        }));
      }
    },
    [pagination.totalPages]
  );

  function filterProducts({
    sortedProducts,
    selectedFilters,
  }: FilterProductsParams): Product[] {
    let tempProducts = [...sortedProducts];
    const { categories, price, sizes, color } = selectedFilters;

    // Filter by categories
    if (categories.length > 0) {
      tempProducts = tempProducts.filter((product) =>
        product.categories.some((cat) => categories.includes(cat.name))
      );
    }
    // Filter by price range
    tempProducts = tempProducts.filter(
      (product) => product.price >= price[0] && product.price <= price[1]
    );

    // Filter by sizes
    if (sizes.length > 0) {
      tempProducts = tempProducts.filter((product) =>
        product.size.some((size) => sizes.includes(size.name))
      );
    }

    // Filter by colors
    if (color.length > 0) {
      tempProducts = tempProducts.filter((product) =>
        product.colors.some((c) => color.includes(c))
      );
    }
    return tempProducts;
  }

  const sortedAndFilteredProducts = useMemo(() => {
    const sorted = [...products].sort((a, b) => {
      switch (sortOption) {
        case "price-low-high":
          return a.price - b.price;
        case "price-high-low":
          return b.price - a.price;
        case "latest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        // case "popularity":
        //   return b.popularity - a.popularity;
        default:
          return 0;
      }
    });

    return filterProducts({ sortedProducts: sorted, selectedFilters });
  }, [products, sortOption, selectedFilters]);

  const handleProductQtyPerPageChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setProductQtyPerPage(Number(event.target.value));
    },
    []
  );

  const handleSortChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSortOption(event.target?.value);
    },
    []
  );

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* filters */}
      <div className="flex text-xs font-medium items-center justify-between my-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <div className="flex gap-2">
            <RxDashboard
              className={`${
                productsDisplaytype === "grid"
                  ? "text-gray-900"
                  : "text-gray-00"
              }`}
              onClick={() => setProductsDisplaytype("grid")}
              size={15}
            />
            <CiCircleList
              className={`${
                productsDisplaytype === "list"
                  ? "text-gray-900"
                  : "text-gray-400"
              }`}
              onClick={() => setProductsDisplaytype("list")}
              size={15}
            />
          </div>
          <p>
            Showing {(pagination.currentPage - 1) * productQtyPerPage + 1}-
            {Math.min(
              pagination.currentPage * productQtyPerPage,
              pagination.totalItems
            )}{" "}
            of {pagination.totalItems} results
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <div className="flex gap-2 items-center">
            <span>Show:</span>
            <select
              value={productQtyPerPage}
              onChange={handleProductQtyPerPageChange}
              className="focus:outline-none"
              id="productQtyPerPage"
            >
              <option value="8">8 Items</option>
              <option value="16">16 Items</option>
              <option value="32">32 Items</option>
              <option value="64">64 Items</option>
              <option value="128">128 Items</option>
            </select>
          </div>
          <div>
            <span>Sort:</span>
            <select
              id="sortOption"
              value={sortOption}
              onChange={handleSortChange}
              className="focus:outline-none"
              name="sortProrducts"
            >
              <option value="popularity">By Popularity</option>
              <option value="latest">By Latest</option>
              <option value="price-low-high">By Price: Low to High</option>
              <option value="price-high-low">By Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {products.length === 0 ? (
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
          showtype={productsDisplaytype}
          productheight={`h-[200px] sm:h-[300px]`}
          products={sortedAndFilteredProducts}
        />
      )}

      {/* pagination */}
      <div className="my-4 flex justify-center">
        <nav className="inline-flex rounded-md shadow">
          <button
            onClick={() => paginate(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {[...Array(pagination.totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-3 py-2 border border-gray-300 text-sm font-medium ${
                pagination.currentPage === index + 1
                  ? "bg-blue-50 text-blue-600"
                  : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
}
