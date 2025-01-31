import { createSlice } from "@reduxjs/toolkit";


export const OrderDetailsSlice= createSlice({
    name: "OrderDetails",
    initialState: {
          loading: true,
          error:false, 
          orderItems:[],
          shippingAddress: {},
          order:{}
    },
    reducers: {
          ORDER_DETAILS_REQUEST: (state, action) => {
                 return {...state,
                 loading:true,
                }
          },

          ORDER_DETAILS_SUCCESS: (state, action) => {
            return {...state,
                loading: false,
                order: action.payload
            }
          },

          ORDER_DETAILS_FAIL: (state, action) => {
            return {...state,
                loading: false,
                error: action.payload
            }
          }

    

    }

});
  
export const { ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS} = OrderDetailsSlice.actions;
export default OrderDetailsSlice.reducer;