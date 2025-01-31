import axios from "../../lib/api";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_CLEAR_ITEMS,
  CART_ERROR,
  CART_UPDATE_ITEM,
} from "../reducers/Cart/CartSlice";

export const addToCart =
  (id, quantity, color, size) => async (dispatch, getState) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);

      dispatch(
        CART_ADD_ITEM({
          productId: data._id,
          name: data.name,
          color: color,
          size: size,
          thumbnail: data.thumbnail,
          price: data.on_sale ? data.sale_price : data.price,
          countInStock: data.countInStock,
          quantity: Number(quantity),
        })
      );

      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
      );
    } catch (error) {
      dispatch(
        CART_ERROR(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
export const updateCart = (id, quantity) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch(
      CART_UPDATE_ITEM({
        productId: data._id,
        quantity: Number(quantity),
      })
    );
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    dispatch(
      CART_ERROR(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch(CART_SAVE_SHIPPING_ADDRESS(data));
  //after upating state ,we also wanna set it to localstorage.
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch(CART_SAVE_PAYMENT_METHOD(data));
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
