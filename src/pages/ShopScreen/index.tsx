import { useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer";
import ProductSidebar from "./components/ProductSidebar";
import ProductRightbar from "./components/ProductRightbar";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
const items = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
];

export default function ShopScreen() {
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    price: [0, 500],
    sizes: [],
    color: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories, price, sizes, color } = selectedFilters;
  useEffect(() => {
    // Update query params when categories change
    if (categories.length > 0) {
      setSearchParams((prevParams) => {
        const params = new URLSearchParams(prevParams);
        params.set("categories", categories.join(","));
        return params;
      });
    } else {
      setSearchParams((prevParams) => {
        const params = new URLSearchParams(prevParams);
        params.delete("categories"); // Remove the categories param if no categories are selected
        return params;
      });
    }

    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);
      if (color) {
        params.set("colors", color);
      } else {
        params.delete("colors");
      }
      return params;
    });

    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);
      if (sizes.length > 0) {
        params.set("sizes", sizes.map(encodeURIComponent).join(","));
      } else {
        params.delete("sizes"); // Remove the sizes param if no sizes are selected
      }
      return params;
    });

    if (price) {
      const [minValue, maxValue] = price;
      setSearchParams((prevParams) => {
        const params = new URLSearchParams(prevParams);
        params.set("minPrice", minValue);
        params.set("maxPrice", maxValue);
        return params;
      });
    }
  }, [categories, price, color, sizes, setSearchParams]);

  const handleCategoriesChange = (categories) => {
    setSelectedFilters((preb) => ({ ...preb, categories }));
  };
  const handlePriceChange = (price) => {
    setSelectedFilters((prev) => ({ ...prev, price }));
  };

  const handleSizeChange = (size) => {
    setSelectedFilters((prev) => ({ ...prev, sizes: size }));
  };

  const handleColorChange = (color) => {
    setSelectedFilters((prev) => ({
      ...prev,
      color,
    }));
  };

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
          {/* Breadcrumbs */}

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
