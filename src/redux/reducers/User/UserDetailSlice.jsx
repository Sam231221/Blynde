import {createSlice} from '@reduxjs/toolkit'

export const UserDetailSlice = createSlice({
    name:"UserDetail",
    initialState:{
          loading:true,
          error: false,
          user:{}
    },
    reducers:{
 
        USER_DETAIL_REQUEST: (state, action)=>{
               return state
        },
        USER_DETAIL_SUCCESS: (state, action) => {
            return {...state,
                loading:false,
                user: action.payload
            }
        },
        USER_DETAIL_FAIL: (state, action) =>{
            return {...state,
                loading: false,
                error: action.payload
            }
        },
        USER_DETAIL_RESET: (state, action) =>{
            return {
                ...state,
                loading:false,
                user:{},
            }
        }
    }
})

export const {USER_DETAIL_REQUEST, USER_DETAIL_RESET, USER_DETAIL_SUCCESS, USER_DETAIL_FAIL} = UserDetailSlice.actions
export default UserDetailSlice.reducer