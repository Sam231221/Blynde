import PageContainer from "../components/PageContainer";
import { useDispatch, useSelector } from "react-redux";
import { endpoint } from "../lib/api";
import { Link } from "react-router-dom";
import { removeFromWishList } from "../redux/actions/userActions";
import { addToCart } from "../redux/actions/cartAction";
import Rating from "../components/Rating";
export default function WishlistScreen() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const { userLikes } = wishlist;
  const removeFromWishlistHandler = (id) => {
    dispatch(removeFromWishList(id));
  };
  const addToCartHandler = (id, quantity = 1) => {
    dispatch(addToCart(id, quantity));
  };
  return (
    <PageContainer>
      <div className="container-lg mx-auto my-10">
        {/* New Products */}
        <div className="my-16">
          <h2 className="text-3xl my-4 uppercase font-bold text-zinc-800">
            My Wishlist
          </h2>

          <div className="product-container product-grid">
            {userLikes.map((product, i) => (
              <div key={i} className="showcase">
                <div className="showcase-banner">
                  <img
                    src={`${endpoint}${product.thumbnail}`}
                    alt={product.name}
                    className="product-img default"
                    width="300"
                  />
                  <img
                    src={`${endpoint}${product.thumbnail}`}
                    alt={product.name}
                    className="product-img hover"
                    width="300"
                  />
                  {product.sale_price && (
                    <p className="showcase-badge angle black">sale</p>
                  )}
                  <div className="showcase-actions">
                    <button
                      onClick={() => removeFromWishlistHandler(product._id)}
                      className="btn-action"
                    >
                      <ion-icon
                        name="heart-outline"
                        role="img"
                        className="md hydrated"
                        aria-label="heart outline"
                      ></ion-icon>
                    </button>

                    <Link to={`/product/${product._id}`} className="btn-action">
                      <ion-icon
                        name="eye-outline"
                        role="img"
                        className="md hydrated"
                        aria-label="eye outline"
                      ></ion-icon>
                    </Link>
                    <button className="btn-action">
                      <ion-icon name="repeat-outline"></ion-icon>
                    </button>
                    <button
                      onClick={() => addToCartHandler(product._id)}
                      className="btn-action"
                    >
                      <ion-icon
                        name="bag-add-outline"
                        role="img"
                        className="md hydrated"
                        aria-label="bag add outline"
                      ></ion-icon>
                    </button>
                  </div>
                </div>

                <div className="showcase-content">
                  <Link
                    to={`/product/${product._id}`}
                    className="showcase-category"
                  >
                    <h3 className="showcase-title">{product.name}</h3>
                  </Link>

                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                    color={"#F6A355"}
                  />

                  <div className="price-box">
                    {product.on_sale ? (
                      <>
                        <p className="price">${product.sale_price}</p>
                        <del>${product.price}</del>
                      </>
                    ) : (
                      <>
                        <p className="price">${product.price}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
