import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../lib/api";

interface User {
  id: number;
  name: string;
  email: string;
  token: string | null;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// **Async Thunks for API Calls**
export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post("/api/auth/login", credentials);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    userData: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post("/api/auth/register", userData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/update",
  async (
    userData: { name?: string; email?: string; password?: string },
    { rejectWithValue, getState }
  ) => {
    try {
      const { auth } = getState() as { auth: AuthState };
      const { data } = await axios.put("/api/auth/update", userData, {
        headers: { Authorization: `Bearer ${auth.user?.token}` },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await axios.post("/api/auth/logout");
  return null;
});

// **Slice Definition**
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
