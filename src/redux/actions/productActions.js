import axios from "../../lib/api";

import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../reducers/Product/ProductListSlice";
import {
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
} from "../reducers/Product/ProductDetailSlice";
import {
  PRODUCT_TOP_RATED_FAIL,
  PRODUCT_TOP_RATED_REQUEST,
  PRODUCT_TOP_RATED_SUCCESS,
} from "../reducers/Product/ProductTopRatedSlice";
import {
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
} from "../reducers/Product/ProductDeleteSlice";
import {
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_SUCCESS,
} from "../reducers/Product/ProductUpdateSlice";
import {
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
} from "../reducers/Product/ProductReviewCreateReducer";
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
} from "../reducers/Product/ProductCreateSlice";

export const listProducts =
  (keyword = "") =>
  async (dispatch) => {
    try {
      //first dispatch product_list_request action
      dispatch(PRODUCT_LIST_REQUEST());
      if (keyword) {
        const { data } = await axios.get(`/api/products/${keyword}`);

        dispatch(PRODUCT_LIST_SUCCESS(data));
      } else {
        const { data } = await axios.get(`/api/products/`);

        dispatch(PRODUCT_LIST_SUCCESS(data));
      }
    } catch (error) {
      dispatch(
        PRODUCT_LIST_FAIL(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };

export const listProductDetails = (id) => async (dispatch) => {
  try {
    //first dispatch product_list_request action
    dispatch(PRODUCT_DETAIL_REQUEST());

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch(PRODUCT_DETAIL_SUCCESS(data));
  } catch (error) {
    dispatch(
      PRODUCT_DETAIL_FAIL(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch(PRODUCT_TOP_RATED_REQUEST());

    const { data } = await axios.get(`/api/products/top/`);

    dispatch(PRODUCT_TOP_RATED_SUCCESS(data));
  } catch (error) {
    dispatch(
      PRODUCT_TOP_RATED_FAIL(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      )
    );
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch(PRODUCT_DELETE_REQUEST());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/products/delete/${id}/`, config);

    dispatch(PRODUCT_DELETE_SUCCESS(data));
  } catch (error) {
    dispatch(
      PRODUCT_DELETE_FAIL(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      )
    );
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch(PRODUCT_CREATE_REQUEST());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products/create/`, {}, config);
    dispatch(PRODUCT_CREATE_SUCCESS(data));
  } catch (error) {
    dispatch(
      PRODUCT_CREATE_FAIL(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      )
    );
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch(PRODUCT_UPDATE_REQUEST());

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
      `/api/products/update/${product._id}/`,
      product,
      config
    );
    dispatch(PRODUCT_UPDATE_SUCCESS(data));
  } catch (error) {
    dispatch(
      PRODUCT_UPDATE_FAIL(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      )
    );
  }
};

export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch(PRODUCT_CREATE_REVIEW_REQUEST());

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/products/${productId}/reviews/`,
        review,
        config
      );
      dispatch(PRODUCT_CREATE_REVIEW_SUCCESS(data));
    } catch (error) {
      dispatch(
        PRODUCT_CREATE_REVIEW_FAIL(
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        )
      );
    }
  };
