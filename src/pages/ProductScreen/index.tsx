import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import Loader from "../../components/Loader";
import { Message } from "../../components/Message";

import { ProductDetail } from "../../components/reusables/ProductDetail";
import { useProductDetail } from "../../hooks/useProducts";

import { useSelector } from "react-redux";

import Reviews from "./components/Reviews";
import { RootState } from "../../types/redux";
import { ROUTES } from "../../routes/Routes";
import { BreadCrumbs } from "../../components/BreadCrumbs";

const items = [
  { label: "Home", path: ROUTES.HOME },
  { label: "Shop", path: "#" },
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
      <BreadCrumbs items={items} />
      <ProductDetail product={productDetail} />
      <Reviews
        productId={String(productDetail._id)}
        productSlug={productDetail.slug}
        userInfo={userInfo}
      />
    </div>
  );
}
