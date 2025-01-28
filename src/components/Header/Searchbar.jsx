import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import axios, { endpoint } from "../../lib/api";
import { GoSearch } from "react-icons/go";
import { Link } from "react-router-dom";
export default function Searchbar() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  useEffect(() => {
    async function fetchProducts(debouncedSearch) {
      try {
        setLoading(true);
        setError(null);
        // Create the query parameter if there's a search query
        const query = debouncedSearch ? `?search=${debouncedSearch}` : "";

        // Fetch products with search query
        const { data } = await axios.get(`/api/products/all/${query}`);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        //frontend filteringproducts
        const filteredproducts = data.results.filter((product) =>
          product.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
        setProducts(filteredproducts);
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

    fetchProducts(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="relative hidden sm:block min-w-[200px] sm:min-w-[300px]">
      <div className="bg-slate-50 rounded-full border flex items-center">
        <div className="px-2">
          <GoSearch className="text-gray-700" size={15} />
        </div>
        <input
          className="w-full rounded-r-full bg-slate-50  py-2 focus:outline-none text-xs text-gray-700"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Products..."
        />
      </div>
      <div className="absolute min-w-[200px] sm:min-w-[300px] top-10  text-xs py-2 overflow-y-auto ">
        {loading && debouncedSearch && (
          <div className="bg-slate-50 py-2 min-w-[200px] sm:min-w-[300px]">
            <div className="loader m-auto"></div>
          </div>
        )}
        {!loading && debouncedSearch && (
          <>
            {products.length > 0 ? (
              <div className="bg-slate-50 h-[300px]">
                {products.map((product) => {
                  return (
                    <Link
                      to={`/product/${product._id}`}
                      className="bg-slate-50 hover:bg-slate-100  p-2 flex min-w-[200px] sm:min-w-[300px]"
                      key={product._id}
                    >
                      <div className="w-10 h-10 ">
                        <img
                          className="w-full h-full object-cover"
                          src={`${endpoint}${product.image_albums[0]?.image}`}
                          alt={product.name}
                        />
                      </div>
                      <p className="gracking-wide px-2 py-3">{product.name}</p>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="bg-slate-50 p-2 ">
                No results found for {debouncedSearch}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
