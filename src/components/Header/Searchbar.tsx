import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { apiRequest, endpoint } from "../../lib/axiosClient";
import { GoSearch } from "react-icons/go";
import { Link } from "react-router-dom";
import { Product } from "../../types";

export default function Searchbar() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search); // Added debounce delay

  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setProducts([]);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = (await apiRequest(
          `/api/products/all/?search=${debouncedSearch}`,
          "GET"
        )) as { results: Product[] };
        setProducts(data.results || []);
      } catch (err) {
        setError(
          `Failed to fetch products: ${
            err instanceof Error ? err.message : String(err)
          }`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedSearch]);

  return (
    <div className="relative hidden sm:block min-w-[200px] sm:min-w-[300px]">
      <div className="bg-slate-50 rounded-full flex items-center px-2">
        <GoSearch className="text-gray-700" size={15} />
        <input
          className="w-full rounded-r-full bg-slate-50 py-2 px-2 focus:outline-none text-xs text-gray-700"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Products..."
          aria-label="Search products"
        />
      </div>

      {debouncedSearch && (
        <div
          className="absolute min-w-[200px] sm:min-w-[300px] top-10 bg-slate-50 text-xs py-2 shadow-md rounded"
          aria-live="polite"
        >
          {loading && (
            <div className="py-2 flex justify-center items-center">
              <div className="loader"></div>{" "}
              {/* Add a proper loader component */}
            </div>
          )}

          {!loading && error && <div className="p-2 text-red-500">{error}</div>}

          {!loading && !error && products.length > 0 ? (
            <div className="max-h-[300px] overflow-y-auto">
              {products.map((product) => (
                <Link
                  to={`/product/${product._id}`}
                  className="flex items-center p-2 hover:bg-slate-100 border-b"
                  key={product._id}
                >
                  <img
                    className="w-10 h-10 object-cover rounded"
                    src={`${endpoint}${product.image_albums[0]?.image}`}
                    alt={product.name}
                  />
                  <p className="px-2 truncate">{product.name}</p>
                </Link>
              ))}
            </div>
          ) : (
            !loading &&
            !error && (
              <div className="p-2 text-gray-500">
                No results found for <strong>{debouncedSearch}</strong>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
