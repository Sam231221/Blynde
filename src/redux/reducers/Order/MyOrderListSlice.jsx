import { createSlice } from "@reduxjs/toolkit";


export const MyOrderListSlice= createSlice({
    name: "MyOrders",
    initialState: {
          loading: false,
          error:false, 
          orders:[],
    },
    reducers: {
          ORDER_LIST_MY_REQUEST: (state, action) => {
                 return {...state,loading:true}
          },

          ORDER_LIST_MY_SUCCESS: (state, action) => {
            return {...state,
                loading: false,
                orders: action.payload
            }
          },

          ORDER_LIST_MY_FAIL: (state, action) => {
            return {...state,
                loading: false,
                error: action.payload
            }
          },
    
            ORDER_LIST_MY_RESET:(state, action)=>{
              return{
                ...state,
                orders: []
              }
            },

    }

});
  
export const { ORDER_LIST_MY_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_LIST_MY_RESET} = MyOrderListSlice.actions;
export default MyOrderListSlice.reducer;