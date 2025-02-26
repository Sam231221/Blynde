import { Product, RootState } from "../../../../types";
import { useSelector } from "react-redux";
import {
  useCreateOrDeleteWishlistItem,
  useUserWishlist,
} from "../../../../hooks/useWishlist";
import { toast } from "react-toastify";
import Spinner from "../../../Spinner";
import { IoMdHeart } from "react-icons/io";
import { EyeOutline, HeartOutline, RepeatOutline } from "react-ionicons";
import { ProductDetail } from "../../ProductDetail";
import { useModalContext } from "../../../../providers/ModalProvider";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const ProductCardActions = ({ product }: { product: Product }) => {
  const { data } = useUserWishlist();
  const wishlistItems = data?.items;
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { openModal } = useModalContext();
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
  useEffect(() => {
    if (wishlistItems) {
      const productInWishlist = wishlistItems.find(
        (item) => item.product._id === product._id
      );
      setIsInWishlist(!!productInWishlist);
    }
  }, [wishlistItems, product._id]);

  return (
    <div className="absolute flex flex-col top-3 right-3 text-lg  transition-all duration-200 ease-in-out z-[3] translate-x-14 group-hover:translate-x-0  ">
      <div
        onClick={() => handleAddToWishlist(String(product._id))}
        className="flex justify-center items-center w-10 h-10 bg-white mb-2 text-gray-400 border border-zinc-200  transition-all duration-200 ease-in-out rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-800"
      >
        {isPending ? (
          <Spinner width={4} height={4} />
        ) : (
          <>
            {isInWishlist ? (
              <IoMdHeart
                color={"#00000"}
                title={"Remove from Wishlist"}
                height="20px"
                width="20px"
                aria-label="Remove from Wishlist"
              />
            ) : (
              <HeartOutline
                color={"#00000"}
                title={"Add to Wishlist"}
                height="20px"
                width="20px"
                aria-label="Add to Wishlist"
              />
            )}
          </>
        )}
      </div>
      <div
        onClick={() =>
          openModal(<ProductDetail product={product} openModal={openModal} />)
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
          title={"Compare"}
          height="20px"
          width="20px"
          aria-label="Compare"
        />
      </button>
    </div>
  );
};
