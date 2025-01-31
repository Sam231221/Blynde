import { createSlice } from "@reduxjs/toolkit";


export const OrderDeliverySlice= createSlice({
    name: "OrderDelivery",
    initialState: {
          loading: false,
          error:false, 
          orders:[],
    },
    reducers: {
          ORDER_DELIVERY_REQUEST: (state, action) => {
                 return {...state,
                       loading:true
                }
          },

          ORDER_DELIVERY_SUCCESS: (state, action) => {
            return {...state,
                loading: false,
                orders: action.payload
            }
          },

          ORDER_DELIVERY_FAIL: (state, action) => {
            return {...state,
                loading: false,
                error: action.payload
            }
          },
    
            ORDER_DELIVERY_RESET:(state, action)=>{
                return{
                ...state,
                orders: []
                }
            },

    }

});
  
export const { ORDER_DELIVERY_FAIL, ORDER_DELIVERY_REQUEST, ORDER_DELIVERY_SUCCESS, ORDER_DELIVERY_RESET} = OrderDeliverySlice.actions;
export default OrderDeliverySlice.reducer;