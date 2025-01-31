import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { Message } from "../../components/Message";
import Paginate from "../../components/Paginate";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../../redux/actions/productActions";
import { PRODUCT_CREATE_RESET } from "../../redux/reducers/Product/ProductCreateSlice";
import PageContainer from "../../components/PageContainer";

function ProductListScreen() {
  const dispatch = useDispatch();
  const redirect = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(PRODUCT_CREATE_RESET());

    if (!userInfo.isAdmin) {
      redirect("/login");
    }

    if (successCreate) {
      redirect(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [dispatch, userInfo, successDelete, successCreate, createdProduct]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <PageContainer>
      <div className="container">
        <div className="m-2 align-items-center">
          <div>
            <h1>Products</h1>
          </div>

          <div className="text-right">
            <button className="my-3" onClick={createProductHandler}>
              <i className="fas fa-plus"></i> Create Product
            </button>
          </div>
        </div>

        {loadingDelete && <Loader />}
        {errorDelete && <Message variant="danger">{errorDelete}</Message>}

        {loadingCreate && <Loader />}
        {errorCreate && <Message variant="danger">{errorCreate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div>
            <table className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>

                    <td>
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <button className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </button>
                      </Link>

                      <button
                        className="btn-sm"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Paginate pages={pages} page={page} isAdmin={true} />
          </div>
        )}
      </div>
    </PageContainer>
  );
}

export default ProductListScreen;
