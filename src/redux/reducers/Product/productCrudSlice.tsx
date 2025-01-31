import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunks for CRUD operations
export const createProduct = createAsyncThunk(
  "productsCrud/createProduct",
  async (newProduct: Product) => {
    const response = await axios.post("/api/products/create/", newProduct);
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "productsCrud/updateProduct",
  async (updatedProduct: Product) => {
    const response = await axios.put(
      `/api/products/update/${updatedProduct.id}/`,
      updatedProduct
    );
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "productsCrud/deleteProduct",
  async (productId: number) => {
    await axios.delete(`/api/products/delete/${productId}/`);
    return productId; // We return only the productId to be removed from state
  }
);

// Slice for CRUD operations
const productsCrudSlice = createSlice({
  name: "productsCrud",
  initialState: {
    creating: false,
    updating: false,
    deleting: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Create product
    builder
      .addCase(createProduct.pending, (state) => {
        state.creating = true;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.creating = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.creating = false;
        state.error = action.error.message || "Error creating product";
      })

      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.updating = true;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.updating = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.updating = false;
        state.error = action.error.message || "Error updating product";
      })

      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.deleting = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.deleting = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.error.message || "Error deleting product";
      });
  },
});

export default productsCrudSlice.reducer;
