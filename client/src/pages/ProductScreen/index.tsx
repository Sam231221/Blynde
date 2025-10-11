import { useParams } from "react-router-dom";

import Loader from "../../components/Loader";
import { Message } from "../../components/Message";

import { useProductDetail } from "../../hooks/useProducts";

import Reviews from "./components/Reviews";

import { ROUTES } from "../../routes/Routes";
import { BreadCrumbs } from "../../components/BreadCrumbs";
import { useModalContext } from "../../providers/ModalProvider";
import { ProductDetail } from "../../components/reusables/ProductDetail";
import { RelatedProducts } from "./components/RelatedProducts";
import { useUser } from "../../redux/reducers/AuthSlice";

const items = [
  { label: "Home", path: ROUTES.HOME },
  { label: "Shop", path: "#" },
];
export default function ProductScreen() {
  const { openModal } = useModalContext();
  const { slug } = useParams<{ slug: string }>();
  const user = useUser();
  const { data: productDetail, isLoading } = useProductDetail(slug);
  if (isLoading) {
    return <Loader />;
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
      <ProductDetail openModal={openModal} product={productDetail} />
      <Reviews
        productId={String(productDetail._id)}
        productSlug={productDetail.slug}
        user={user}
      />
      <RelatedProducts productSlug={productDetail.slug} />
    </div>
  );
}
