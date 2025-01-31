import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import Loader from "../../components/Loader";
import { Message } from "../../components/Message";
import PageContainer from "../../components/PageContainer";
import Reviews from "./components/Reviews";
import { ProductDetail } from "../../components/reusables/ProductDetail";

import { useModalContext } from "../../providers/ModalProvider";
import { RootState } from "../../types";
import { fetchProductDetail } from "../../redux/reducers/Product/ProductSlice";
const items = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
];
export default function ProductScreen() {
  const { openModal } = useModalContext();
  const dispatch = useDispatch();

  const { id } = useParams<{ id: string }>();

  const { productDetail, loading, error } = useSelector(
    (state: RootState) => state.product
  );
  const userLogin = useSelector((state) => state.auth);
  const { userInfo } = userLogin;

  // const { success } = useSelector((state) => state.reviews);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetail(Number(id))); // Fetch product data
    }
  }, [id, dispatch]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!productDetail) return <p>Product not found</p>;
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
            <ProductDetail product={productDetail} openModal={openModal} />
            {/* <Reviews userInfo={userInfo} productId={product._id} /> */}
          </>
        )}
      </div>
    </PageContainer>
  );
}
