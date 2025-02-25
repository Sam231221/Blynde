import React from "react";
import { Product } from "../../../../types";
import { useDispatch, useSelector } from "react-redux";
import { useCreateOrDeleteWishlistItem } from "../../../../hooks/useWishlist";
import { toast } from "react-toastify";

export const ProductActions = ({ product }: { product: Product }) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const { mutate: addorDeletetoWishlist, isPending } =
    useCreateOrDeleteWishlistItem();
  const handleAddToWishlist = (productId: string) => {
    if (userInfo) {
      addorDeletetoWishlist(productId, {
        onSuccess: (data) => {
          if (data === 204) {
            toast.success("Removed from wishlist");
          } else if (typeof data !== "number" && data?.product) {
            toast.success("Added to wishlist");
          }
          console.log("data:", data);
        },
        onError: (error) => {
          console.error("Failed to add to wishlist", error);
        },
      });
    } else {
      if (!userInfo) {
        toast.error("Please login to add to wishlist");
      }
    }
  };
  const addToCartHandler = (
    productId: string,
    name: string,
    price: number,
    color: string,
    size: string,
    thumbnailUrl: string,
    quantity: number
  ) => {
    if (productId && quantity && size && color) {
      dispatch(
        addToCart({
          _id: String(productId),
          productId: String(productId),
          name,
          price,
          color,
          size,
          thumbnailUrl: thumbnailUrl,
          qty: quantity,
        })
      );
    } else {
      alert("Please select size and color");
    }
  };
  return (
    <div className="absolute flex flex-col top-3 right-3 text-lg  transition-all duration-200 ease-in-out z-[3] translate-x-14 group-hover:translate-x-0  ">
      <div
        onClick={() => handleAddToWishlist(String(product._id))}
        className="flex justify-center items-center w-10 h-10 bg-white mb-2 text-gray-400 border border-zinc-200  transition-all duration-200 ease-in-out rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-800"
      >
        {isPending ? (
          <Spinner width={3} height={3} />
        ) : (
          <HeartOutline
            color={"#00000"}
            title={"Add to Wishlist"}
            height="20px"
            width="20px"
            aria-label="Add to Wishlist"
          />
        )}
      </div>
      <div
        onClick={() =>
          openModal(
            <ProductDetail
              product={product}
              handleColorChange={handleColorChange}
              handleSizeChange={handleSizeChange}
              handleQuantityChange={handleQuantityChange}
              data={data}
              openModal={openModal}
            />
          )
        }
        className="flex justify-center items-center w-10 h-10 bg-white mb-2 py-2 text-gray-400 border border-zinc-200  transition-all duration-200 ease-in-out rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-800"
      >
        <MdOutlineZoomOutMap
          color={"#00000"}
          title={"Mini Open"}
          height="20px"
          width="20px"
          aria-label="Mini Open"
        />
      </div>
      <Link
        to={`/products/${product.slug}`}
        className="flex justify-center items-center w-10 h-10 bg-white mb-2 text-gray-400 border border-zinc-200  transition-all duration-200 ease-in-out rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-800"
      >
        <EyeOutline
          color={"#00000"}
          title={"Show In Detail"}
          height="20px"
          width="20px"
          aria-label="Show In Detail"
        />
      </Link>
      <button className="flex justify-center items-center w-10 h-10 bg-white mb-2 text-gray-400 border border-zinc-200  transition-all duration-200 ease-in-out rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-800">
        <RepeatOutline
          color={"#00000"}
          title={"repeat-outline"}
          height="20px"
          width="20px"
          aria-label="repeat outline"
        />
      </button>
    </div>
  );
};
