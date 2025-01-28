import axios from "../../lib/api";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from "../reducers/User/UserLoginSlice";
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../reducers/User/UserRegisterSlice";
import {
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_FAIL,
  USER_PROFILE_UPDATE_SUCCESS,
} from "../reducers/User/UserUpdateProfileSlice";
import {
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_RESET,
} from "../reducers/User/UserDetailSlice";
import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
} from "../reducers/User/UserDeleteSlice";
import {
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../reducers/User/UserUpdateSlice";
import {
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
} from "../reducers/User/UserListSlice";
import {
  USER_LIKE_ADD,
  USER_LIKE_ERROR,
  USER_LIKE_REMOVE,
} from "../reducers/User/UserLikeSlice";

export const addToWishList = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch(
      USER_LIKE_ADD({
        _id: data._id,
        rating: data.rating,
        name: data.name,
        thumbnail: data.thumbnail,
        on_sale: data.on_sale,
        sale_price: data.sale_price,
        price: data.price,
        countInStock: data.countInStock,
      })
    );
    localStorage.setItem(
      "userLikes",
      JSON.stringify(getState().wishlist.userLikes)
    );
  } catch (error) {
    dispatch(
      USER_LIKE_ERROR(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const removeFromWishList = (id) => async (dispatch, getState) => {
  dispatch({
    type: USER_LIKE_REMOVE,
    payload: id,
  });
  localStorage.setItem(
    "userLikes",
    JSON.stringify(getState().wishlist.userLikes)
  );
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(USER_LOGIN_REQUEST());
    const configuration = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login/",
      { username: email, password: password },
      configuration
    );
    dispatch(USER_LOGIN_SUCCESS(data));

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(
      USER_LOGIN_FAIL(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch(USER_REGISTER_REQUEST());
    const configuration = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/register/",
      { name: name, email: email, password: password },
      configuration
    );

    dispatch(USER_REGISTER_SUCCESS(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(
      USER_REGISTER_FAIL(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      )
    );
  }
};

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch(USER_DETAIL_REQUEST());

    //userLogin is a state in store.js. we acces its userInfo attribute by destructing
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/profile/`, config);

    dispatch(USER_DETAIL_SUCCESS(data));
  } catch (error) {
    dispatch(
      USER_DETAIL_FAIL(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      )
    );
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch(USER_PROFILE_UPDATE_REQUEST());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //update using put() method
    const { data } = await axios.put(`/api/users/profile/`, user, config);

    dispatch(USER_PROFILE_UPDATE_SUCCESS(data));
    //we wanna logged in user with these updated data.
    dispatch(USER_LOGIN_SUCCESS(data));

    //update the localStorage userInfo too.
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(
      USER_PROFILE_UPDATE_FAIL(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch(USER_LIST_REQUEST());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/`, config);

    dispatch(USER_LIST_SUCCESS(data));
  } catch (error) {
    dispatch(
      USER_LIST_FAIL(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      )
    );
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch(USER_DELETE_REQUEST());

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`/api/users/delete/${id}/`, config);

    dispatch(USER_DELETE_SUCCESS(data));
  } catch (error) {
    dispatch(
      USER_DELETE_FAIL(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      )
    );
  }
};

export const addUserlike = (id) => async (dispatch, getState) => {
  try {
    dispatch(USER_LIKE_ADD_REQUEST());
    //User must be logged in for likes.
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`/api/users/likes/add/${id}/`, config);

    dispatch(USER_LIKE_ADD_SUCCESS(data));
  } catch (error) {
    dispatch(
      USER_LIST_FAIL(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      )
    );
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch(USER_UPDATE_REQUEST());

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
      `/api/users/update/${user._id}/`,
      user,
      config
    );

    dispatch(USER_UPDATE_SUCCESS());

    dispatch(USER_DETAIL_SUCCESS(data));
  } catch (error) {
    dispatch(
      USER_UPDATE_FAIL(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      )
    );
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch(USER_DETAIL_RESET());
  dispatch(USER_LOGOUT());
};

// productList: productListReducer,
// productDetails: productDetailsReducer,
// productDelete: productDeleteReducer,
// productCreate: productCreateReducer,
// productUpdate: productUpdateReducer,
// productReviewCreate: productReviewCreateReducer,
// productTopRated: productTopRatedReducer,

// cart: cartReducer,
// userLogin: userLoginReducer,
// userRegister: userRegisterReducer,
// userDetails: userDetailsReducer,
// userUpdateProfile: userUpdateProfileReducer,
// userList: userListReducer,
// userDelete: userDeleteReducer,
// userUpdate: userUpdateReducer,

// orderCreate: orderCreateReducer,
// orderDetails: orderDetailsReducer,
// orderPay: orderPayReducer,
// orderListMy: orderListMyReducer,
// orderList: orderListReducer,
// orderDeliver: orderDeliverReducer,
