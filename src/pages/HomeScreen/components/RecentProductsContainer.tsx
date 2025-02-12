import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProductGridShowCase from "../../../components/reusables/ProductGridShowCase";
import { useRecentProducts } from "../../../hooks/useFetchData";

import { setRecentProducts } from "../../../redux/reducers/ProductSlice";

export default function RecentProductsContainer() {
  const dispatch = useDispatch();
  const { isPending, error, data, isFetching } = useRecentProducts();
  useEffect(() => {
    if (data) {
      dispatch(setRecentProducts(data));
    }
  }, [data, dispatch]);
  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const addToCartHandler = (id: number, quantity = 1) => {
    // dispatch(addToCart(id, quantity));
  };

  const addToWishlistHandler = (id: number) => {
    // dispatch(addToWishList(id));
  };

  return (
    <div className="container mx-auto my-12">
      {/* New Products */}
      <h2 className="text-2xl md:text-3xl my-2 text-center font-semibold text-zinc-900">
        New Products
      </h2>
      <p className="text-zinc-500 mb-5 text-center text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
        suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
        lacus vel facilisis.
      </p>

      <ProductGridShowCase
        productheight={`h-[300px] sm:h-[400px]`}
        addToCartHandler={addToCartHandler}
        addToWishlistHandler={addToWishlistHandler}
        products={data}
      />
    </div>
  );
}
