import ProductSidebar from "./components/ProductSidebar";
import ProductRightbar from "./components/ProductRightbar";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { ROUTES } from "../../routes/Routes";
import { BreadCrumbs } from "../../components/BreadCrumbs";
import { useProductFilters } from "../../redux/reducers/FilterProductSlice";

const items = [
  { label: "Home", path: ROUTES.HOME },
  { label: "Shop", path: "#" },
];

export default function ShopScreen() {
  const productfilters = useProductFilters();
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
    <div className="container mx-auto mt-14 ">
      <BreadCrumbs items={items} />
      <div className="mt-5 flex flex-col md:flex-row ">
        <ProductSidebar />
        <ProductRightbar />
      </div>
    </div>
  );
}
