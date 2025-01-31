import {createSlice} from '@reduxjs/toolkit'

 
export const UserListSlice = createSlice({
    name:"UserList",
    initialState:{
        loading: false,
        error: false,
        users: [],
    },
    reducers:{
        USER_LIST_REQUEST:(state, action) =>{
            return {...state,
             loading:true}
        },
        USER_LIST_SUCCESS:(state, action) =>{
            return {...state,
                loading:false,
                users:action.payload
            }
        },
        USER_LIST_FAIL:(state, action) =>{
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        },
        USER_LIST_RESET:(state, action) =>{
            return {
                ...state,
                users:[]
            }
        }

    }
})

export const {USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL} =UserListSlice.actions
export default UserListSlice.reducer 