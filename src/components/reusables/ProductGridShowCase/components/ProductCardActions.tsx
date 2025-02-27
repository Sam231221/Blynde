import { Product, RootState } from "../../../../types";
import { useDispatch, useSelector } from "react-redux";
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
import { addProduct } from "../../../../redux/reducers/CompareProductsSlice";
import clsx from "clsx";

export const ProductCardActions = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();
  const { data } = useUserWishlist();
  const { products: compareProducts } = useSelector(
    (state: RootState) => state.comparelist
  );
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
  // Function to add a product to compare list
  const handleAddToCompare = (product: Product) => {
    if (compareProducts.length < 3) {
      dispatch(addProduct(product));
    } else {
      toast.error("You can compare up to 3 products at a time.");
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

      <button
        onClick={() => handleAddToCompare(product)}
        disabled={compareProducts.some((p) => p._id === product._id)}
        className={clsx(
          "flex justify-center items-center w-10 h-10 mb-2 text-gray-400 border border-zinc-200  transition-all duration-200 ease-in-out rounded-full ",
          compareProducts.some((p) => p._id === product._id)
            ? "bg-gray-900 text-white border-gray-800"
            : "bg-white text-gray-400 border-zinc-200"
        )}
      >
        {/* bg-white hover:bg-gray-900 hover:text-white hover:border-gray-800 */}
        {compareProducts.some((p) => p._id === product._id) ? (
          <RepeatOutline
            color={"#00000"}
            title={"Already Added to Compare list"}
            height="20px"
            width="20px"
            aria-label="Already Added to Compare list"
          />
        ) : (
          <RepeatOutline
            color={"#00000"}
            title={"Add to Compare list"}
            height="20px"
            width="20px"
            aria-label="Add to Compare list"
          />
        )}
      </button>
    </div>
  );
};
