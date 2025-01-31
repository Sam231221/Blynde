import { createSlice } from "@reduxjs/toolkit";

export const OrderPaySlice= createSlice({
    name: "PayForOrders",
    initialState: {
          loading: true,
          error:false, 
          success:false,
    },
    reducers: {
          ORDER_PAY_REQUEST: (state, action) => {
                 return state
          },
          ORDER_PAY_SUCCESS: (state, action) => {
            return {...state,
                loading: false,
                success:true
            }
          },
          ORDER_PAY_FAIL: (state, action) => {
            return {...state,
                loading: false,
                error: action.payload
            }
          },
          ORDER_PAY_RESET:(state, action)=>{
              return { }
          },

    }

});
  
export const { ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_RESET} = OrderPaySlice.actions;
export default OrderPaySlice.reducer;