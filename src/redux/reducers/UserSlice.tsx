import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiRequest } from "../../lib/api";
import { User } from "../../types";

// Async Thunks for CRUD operations (if you want to manage state in Redux as well) - Optional
export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async () => {
    const response = await apiRequest("/api/users", "GET");
    return response.data;
  }
);

export const createUser = createAsyncThunk<User, User>(
  "users/createUser",
  async (user) => {
    const response = await apiRequest("/api/users", "POST", user);
    return response.data;
  }
);

export const updateUser = createAsyncThunk<User, User>(
  "users/updateUser",
  async (user) => {
    const response = await apiRequest(`/api/users/${user._id}`, "PUT", user); // Assuming user object has an ID
    return response.data;
  }
);

export const deleteUser = createAsyncThunk<string, string>(
  "users/deleteUser",
  async (_id) => {
    await apiRequest(`/api/users/${_id}`, "DELETE");
    return _id;
  }
);

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
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
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching users";
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      });
  },
});

export default userSlice.reducer;
// export const { setUser } = userSlice.actions; // Export any synchronous actions
