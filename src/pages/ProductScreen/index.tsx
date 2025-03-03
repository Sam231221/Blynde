import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import Loader from "../../components/Loader";
import { Message } from "../../components/Message";

import { ProductDetail } from "../../components/reusables/ProductDetail";
import { useProductDetail } from "../../hooks/useProducts";

import { useSelector } from "react-redux";
import { RootState } from "../../types";
import Reviews from "./components/Reviews";

const items = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
];
export default function ProductScreen() {
  const { slug } = useParams<{ slug: string }>();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const {
    data: productDetail,
    isLoading,
    error: fetchProductError,
  } = useProductDetail(slug || "");
  if (isLoading) {
    return <Loader />;
  }
  if (fetchProductError) {
    return (
      <>
        <div className="container mx-auto mt-24">
          <Message variant="danger">{fetchProductError.message}</Message>
        </div>
      </>
    );
  }

  if (!productDetail) {
    return (
      <>
        <div className="container mx-auto mt-24">
          <Message variant="danger">Product not found</Message>
        </div>
      </>
    );
  }

  return (
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
              to={`/products/${productDetail?.slug}`}
              className="text-gray-500 hover:text-gray-700"
            >
              {productDetail?.name}
            </Link>
          </li>
        </ol>
      </nav>
      <ProductDetail product={productDetail} />

      <Reviews
        productId={String(productDetail._id)}
        productSlug={productDetail.slug}
        userInfo={userInfo}
      />
    </div>
  );
}
