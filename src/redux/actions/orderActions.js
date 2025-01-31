import axios from "../../lib/api";
import { useSelector } from "react-redux";
import { CART_CLEAR_ITEMS } from "../reducers/Cart/CartSlice";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
} from "../reducers/Order/OrderCreateSlice";
import {
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
} from "../reducers/Order/OrderDetailsSlice";
import {
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_FAIL,
} from "../reducers/Order/OrderPaySlice";
import {
  ORDER_DELIVERY_REQUEST,
  ORDER_DELIVERY_SUCCESS,
  ORDER_DELIVERY_FAIL,
  ORDER_DELIVERY_RESET,
} from "../reducers/Order/OrderDeliverySlice";
import {
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
} from "../reducers/Order/MyOrderListSlice";
import {
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
} from "../reducers/Order/OrderListsSlice";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    ORDER_CREATE_REQUEST();
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    /*
        In backend
        views.addOrderItems
        */
    const { data } = await axios.post(`/api/orders/add/`, order, config);
    dispatch(ORDER_CREATE_SUCCESS(data));

    //once the order is placed we wanna clear cart items within state and Localstorage.
    dispatch(CART_CLEAR_ITEMS(data));
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch(
      ORDER_CREATE_FAIL(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      )
    );
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(ORDER_DETAILS_REQUEST());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}/`, config);
    dispatch(ORDER_DETAILS_SUCCESS(data));
  } catch (error) {
    dispatch(
      ORDER_DETAILS_FAIL(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      )
    );
  }
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch(ORDER_PAY_REQUEST());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",

        //we need to be authenticated to pay
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    //here payment result is an order id.
    //views.updateOrderToPaid
    const { data } = await axios.put(
      `/api/orders/${id}/pay/`,
      paymentResult,
      config
    );
    //here we ahave passed data for future works.
    //may be data can be used for flash messages.
    //Main point is setting success= true in OrderPaySlice.tsx
    dispatch(ORDER_PAY_SUCCESS(data));

    //shows updated data in real time
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order } = orderDetails;
    order.isPaid = true;
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch(ORDER_DELIVERY_REQUEST());
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver/`,
      {},
      config
    );
    dispatch(ORDER_DELIVERY_SUCCESS(data));
  } catch (error) {
    ORDER_DELIVERY_FAIL(
      error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message
    );
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch(ORDER_LIST_MY_REQUEST());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //In backend views.getOrders()
    const { data } = await axios.get(`/api/orders/myorders/`, config);
    dispatch(ORDER_LIST_MY_SUCCESS(data));
  } catch (error) {
    dispatch(
      ORDER_LIST_MY_FAIL(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      )
    );
  }
};

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch(ORDER_LIST_REQUEST());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/`, config);

    dispatch(ORDER_LIST_SUCCESS(data));
  } catch (error) {
    dispatch(
      ORDER_LIST_FAIL(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      )
    );
  }
};
