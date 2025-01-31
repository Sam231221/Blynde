import { createSlice } from "@reduxjs/toolkit";


export const OrderListsSlice= createSlice({
    name: "OrderLists",
    initialState: {
          loading: true,
          error:false, 
          orders:[],
    },
    reducers: {
          ORDER_LIST_REQUEST: (state, action) => {
                 return state
          },

          ORDER_LIST_SUCCESS: (state, action) => {
            return {...state,
                loading: false,
                orders: action.payload
            }
          },

          ORDER_LIST_FAIL: (state, action) => {
            return {...state,
                loading: false,
                error: action.payload
            }
          },
    


    }

});
  
export const { ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_MY_RESET} = OrderListsSlice.actions;
export default OrderListsSlice.reducer;