import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import Loader from "../../components/Loader";
import { Message } from "../../components/Message";
import PageContainer from "../../components/PageContainer";
import Reviews from "./components/Reviews";
import { ProductDetail } from "../../components/reusables/ProductDetail";

import { AppDispatch, RootState } from "../../types";
import { fetchProductDetail } from "../../redux/reducers/ProductSlice";
import NotFound from "../NotFound";
import { toast } from "react-toastify";
const items = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
];
export default function ProductScreen() {
  const dispatch: AppDispatch = useDispatch();
  const { slug } = useParams<{ slug: string }>();

  const { productDetail, loading, error } = useSelector(
    (state: RootState) => state.product
  );
  const auth = useSelector((state: RootState) => state.auth);
  const { userInfo } = auth;

  useEffect(() => {
    if (slug) {
      dispatch(fetchProductDetail(slug)); // Fetch product data
    }
  }, [slug, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return toast.error("Something went wrong while fetching Product.");
  if (!productDetail) return <NotFound />;
  return (
    <PageContainer>
      <div className="container mx-auto mt-24">
        {/* Breadcrumbs */}
        <nav className="text-xs mt-3" aria-label="Breadcrumb">
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
            <li className="flex items-center gap-2">
              <span className="text-gray-300">/</span>
              <Link
                to={`/product/${productDetail._id}`}
                className="text-gray-500 hover:text-gray-700"
              >
                {productDetail.name}
              </Link>
            </li>
          </ol>
        </nav>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <ProductDetail product={productDetail} />

            <Reviews
              productSlug={String(productDetail._id)}
              userInfo={userInfo}
            />
          </>
        )}
      </div>
    </PageContainer>
  );
}
