import { Link } from "react-router-dom";
import {
  useCreateOrDeleteWishlistItem,
  useUserWishlist,
} from "../hooks/useWishlist";
import Rating from "../components/Rating";
import { X } from "lucide-react";
import ProductImageTransition from "../components/reusables/ProductGridShowCase/ProductGridTypeCard/ProductImageTransition";
import { toast } from "react-toastify";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES } from "../routes/Routes";

const items = [
  { label: "Home", path: ROUTES.HOME },
  { label: "Wishlist", path: ROUTES.ORDER_SHIPPING },
];

function WishlistScreen() {
  const { data, isLoading, error } = useUserWishlist();
  const wishlist = data?.items;
  console.log(data);
  const { mutate } = useCreateOrDeleteWishlistItem();
  const handleDeleteWishlistItem = (wishlistItemId: string) => {
    mutate(wishlistItemId, {
      onSuccess: () => {
        toast.success("Item removed from wishlist");
      },
      onError: (error) => {
        console.error(error);
        toast.error("Failed to remove item from wishlist");
      },
    });
  };

  return (
    <div className="container mx-auto py-2 overflow-auto mt-10">
      <BreadCrumbs items={items} />
      <div className="mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading && <p>Loading...</p>}
          {error && <p>{error.message}</p>}
          {!isLoading && !error && wishlist?.length === 0 && (
            <p className="text-gray-500">No items in wishlist</p>
          )}
          {!isLoading &&
            !error &&
            wishlist &&
            wishlist.length > 0 &&
            wishlist.map((item, i) => (
              <div className="relative" key={i}>
                <button
                  onClick={() => handleDeleteWishlistItem(item.id)}
                  className="absolute z-[997] -top-2 -right-2 bg-white rounded-full p-1 shadow-lg hover:bg-red-100 transition-colors duration-200"
                >
                  <X size={20} className="text-red-500" />
                </button>
                <div className="group border border-gray-200 overflow-hidden transition-all duration-200 ease-in">
                  <div className={`relative h-[300px]`}>
                    <ProductImageTransition
                      name={item.product.name}
                      img_albums={item.product.image_albums}
                    />
                    {item.product.discounted_price ? (
                      <p
                        className={`absolute font-medium z-[3]  rounded-sm  text-white text-[12px]  bg-black top-[8px] px-10 py-1 left-[-29px] captialize -rotate-45  ${
                          item.product.priceBadge === "blue" &&
                          "bg-blue-500 px-3 py-1"
                        }`}
                      >
                        <span className="mr-4">{`${Math.floor(
                          item.product.discount_percentage
                        )}% Off`}</span>
                      </p>
                    ) : (
                      <>
                        {item.product.badge && (
                          <>
                            <p
                              className={`absolute top-[15px] font-medium left-[15px] z-[3]  rounded-sm py-1 text-white text-[12px]  ${
                                item.product.badge === "Featured" &&
                                "bg-blue-400 px-3 py-1"
                              } ${
                                item.product.badge === "Top Rated" &&
                                "bg-green-500 px-3 py-1"
                              }`}
                            >
                              {item.product.badge}
                            </p>
                          </>
                        )}
                      </>
                    )}
                  </div>

                  <div className="px-3 py-1">
                    <Link
                      to={`/products/${item.product.slug}`}
                      className="uppercase font-medium"
                    >
                      <h3 className="text-gray-800 text-sm capitalize duration-200 ease-in-out font-medium">
                        {item.product.name}
                      </h3>
                    </Link>

                    <Rating
                      color={"#fc8c04"}
                      fontSize={14}
                      value={item.product.rating}
                      text={`${item.product.reviews_count} reviews`}
                    />

                    <div className="flex px-1 gap-3 text-gray-800 mb-2 text-sm">
                      <p className="font-bold">${item.product.price}</p>
                      {item.product.discounted_price && (
                        <del className="text-gray-400">
                          ${item.product.discounted_price}
                        </del>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default WishlistScreen;
