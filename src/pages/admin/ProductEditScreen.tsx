import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { Message } from "../../components/Message";
import FormContainer from "../../components/FormContainer";
import {
  listProductDetails,
  updateProduct,
} from "../../redux/actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../../redux/reducers/Product/ProductUpdateSlice";
import PageContainer from "../../components/PageContainer";

function ProductEditScreen() {
  const { id } = useParams();
  const redirect = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productUpdate;

  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    const { data } = await axios.get("/api/products/categories/");

    setCategories(data);
  };

  useEffect(() => {
    loadCategories();
    if (successUpdate) {
      dispatch(PRODUCT_UPDATE_RESET());

      //instead of redirect you could show custom messages
      redirect("/admin/productlist");
    } else {
      if (!product.name || product._id !== Number(id)) {
        dispatch(listProductDetails(id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, product, id, redirect, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    formData.append("product_id", id);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "/api/products/upload/",
        formData,
        config
      );
      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    <PageContainer>
      <div className="container">
        <Link className="btn btn-sm btn-primary" to="/admin/productlist">
          Go Back
        </Link>

        <FormContainer>
          <div className="form-signin shadow w-100 m-auto">
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <div onSubmit={submitHandler}>
                <div>
                  <label>Name</label>
                  <input
                    type="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </div>

                <div>
                  <label>Price</label>
                  <input
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  ></input>
                </div>

                <div>
                  <label>Image</label>
                  <input
                    type="text"
                    placeholder="Enter image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  ></input>
                  <input
                    id="image-file"
                    label="Choose File"
                    type="file"
                    name=""
                    onChange={uploadFileHandler}
                  />

                  {uploading && <Loader />}
                </div>

                <div>
                  <label>Brand</label>
                  <input
                    type="text"
                    placeholder="Enter brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  ></input>
                </div>

                <div>
                  <label>Stock</label>
                  <input
                    type="number"
                    placeholder="Enter stock"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  ></input>
                </div>

                <div>
                  <label>Category</label>
                  <div.Select
                    type="text"
                    placeholder="Enter category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((category, id) => (
                      <option key={id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </div.Select>
                </div>

                <div>
                  <label>Description</label>
                  <input
                    rows={4}
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></input>
                </div>

                <button type="submit">Update</button>
              </div>
            )}
          </div>
        </FormContainer>
      </div>
    </PageContainer>
  );
}

export default ProductEditScreen;
