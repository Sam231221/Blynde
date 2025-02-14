import PageContainer from "../../components/PageContainer";
import ProductSidebar from "./components/ProductSidebar";
import ProductRightbar from "./components/ProductRightbar";
import { Link, useSearchParams } from "react-router-dom";
import { RootState } from "../../types";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const items = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
];

export default function ShopScreen() {
  const productfilters = useSelector(
    (state: RootState) => state.productfilters
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories, price, sizes, color } = productfilters;

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (categories.length > 0) {
      params.set("categories", categories.map(encodeURIComponent).join(","));
    } else {
      params.delete("categories");
    }

    if (color) {
      params.set("color", color);
    } else {
      params.delete("color");
    }

    if (sizes.length > 0) {
      params.set("sizes", sizes.map(encodeURIComponent).join(","));
    } else {
      params.delete("sizes");
    }

    if (price) {
      const [minValue, maxValue] = price;
      params.set("min_price", minValue.toString());
      params.set("max_price", maxValue.toString());
    }

    setSearchParams(params);
  }, [categories, price, color, sizes, searchParams, setSearchParams]);

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
          <ProductSidebar />
          <ProductRightbar />
        </div>
      </div>
    </PageContainer>
  );
}
