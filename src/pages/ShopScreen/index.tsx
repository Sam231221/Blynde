import { useEffect, useState, useCallback } from "react";
import PageContainer from "../../components/PageContainer";
import ProductSidebar from "./components/ProductSidebar";
import ProductRightbar from "./components/ProductRightbar";
import { Link, useSearchParams } from "react-router-dom";

const items = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
];

interface SelectedFilters {
  categories: string[];
  price: [number, number];
  sizes: string[];
  color: string;
}

export default function ShopScreen() {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    categories: [],
    price: [0, 500],
    sizes: [],
    color: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories, price, sizes, color } = selectedFilters;

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (categories.length > 0) {
      params.set("categories", categories.join(","));
    } else {
      params.delete("categories");
    }

    if (color) {
      params.set("colors", color);
    } else {
      params.delete("colors");
    }

    if (sizes.length > 0) {
      params.set("sizes", sizes.map(encodeURIComponent).join(","));
    } else {
      params.delete("sizes");
    }

    if (price) {
      const [minValue, maxValue] = price;
      params.set("minPrice", minValue.toString());
      params.set("maxPrice", maxValue.toString());
    }

    setSearchParams(params);
  }, [categories, price, color, sizes, setSearchParams]);

  const handleCategoriesChange = useCallback((categories: string[]) => {
    setSelectedFilters((prev) => ({ ...prev, categories }));
  }, []);

  const handlePriceChange = useCallback((price: [number, number]) => {
    setSelectedFilters((prev) => ({ ...prev, price }));
  }, []);

  const handleSizeChange = useCallback((sizes: string[]) => {
    setSelectedFilters((prev) => ({ ...prev, sizes }));
  }, []);

  const handleColorChange = useCallback((color: string) => {
    setSelectedFilters((prev) => ({ ...prev, color }));
  }, []);

  return (
    <PageContainer>
      <div className="container mx-auto mt-14 ">
        <nav className="text-xs mt-20" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            {items.map((item, index) => (
              <li className="flex items-center gap-2" key={index}>
                <Link
                  to={item.path}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {item.label}
                </Link>
                {index < items.length - 1 && (
                  <span className="text-gray-300">/</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="mt-5 flex flex-col md:flex-row ">
          <ProductSidebar
            handleCategoriesChange={handleCategoriesChange}
            handlePriceChange={handlePriceChange}
            handleSizeChange={handleSizeChange}
            handleColorChange={handleColorChange}
          />
          <ProductRightbar
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </div>
      </div>
    </PageContainer>
  );
}
