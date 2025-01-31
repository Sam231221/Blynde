import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import Loader from "../../components/Loader";
import { Message } from "../../components/Message";
import PageContainer from "../../components/PageContainer";
import Reviews from "./components/Reviews";
import { ProductDetail } from "../../components/reusables/ProductDetail";

import { listProductDetails } from "../../redux/actions/productActions";
import { useModalContext } from "../../providers/ModalProvider";
const items = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
];
export default function ProductScreen() {
  const { openModal } = useModalContext();

  const dispatch = useDispatch();
  const { id } = useParams();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  //select a particular state i.e productList state which is an obj
  const productDetail = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetail;
  const { success } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id, success]);

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
                to={`/product/${product._id}`}
                className="text-gray-500 hover:text-gray-700"
              >
                {product.name}
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
            <ProductDetail product={product} openModal={openModal} />
            <Reviews userInfo={userInfo} productId={product._id} />
          </>
        )}
      </div>
    </PageContainer>
  );
}
