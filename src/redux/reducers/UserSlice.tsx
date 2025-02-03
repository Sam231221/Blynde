// userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async Thunks for CRUD operations (if you want to manage state in Redux as well) - Optional
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return apiRequest("/api/users"); // Replace with your API endpoint
});

export const createUser = createAsyncThunk("users/createUser", async (user) => {
  return apiRequest("/api/users", "POST", user);
});

export const updateUser = createAsyncThunk("users/updateUser", async (user) => {
  return apiRequest(`/api/users/${user.id}`, "PUT", user); // Assuming user object has an ID
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  return apiRequest(`/api/users/${id}`, "DELETE");
});

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Reducers for synchronous state updates (if needed)
    // Example: setUser(state, action) { state.user = action.payload; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Store the error message
      });
    // ... similar cases for createUser, updateUser, deleteUser
  },
});

export default userSlice.reducer;
// export const { setUser } = userSlice.actions; // Export any synchronous actions
