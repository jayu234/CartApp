import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "../apis/productApi";

const init = {
    isLoading: false,
    success: false,
    isError: false,
    message: "",
}

const initialState = {
  newProduct: {...init, data: {}},
  allProducts: {...init, data: []},
  productDetails: {...init, data: {}}
};

export const createProduct = createAsyncThunk(
  "product/create",
  async (data, thunkAPI) => {
    try {
      return await productService.createProduct(data);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "product/all",
  async (_, thunkAPI) => {
    try {
      return await productService.getAllProducts();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getProductsDetails = createAsyncThunk(
  "product/details",
  async (id, thunkAPI) => {
    try {
      return await productService.getProductDetails(id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetNewProductState: (state) => {
      state.newProduct = {...init, data: {}};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.newProduct.isLoading = true;
        state.newProduct.success = false;
        state.newProduct.isError = false;
        state.newProduct.message = "";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.newProduct.isLoading = false;
        state.newProduct.success = true;
        state.newProduct.isError = false;
        state.newProduct.message = "";
        state.newProduct.data = action.payload.result;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.newProduct.isLoading = false;
        state.newProduct.success = false;
        state.newProduct.isError = true;
        state.newProduct.message = action.payload;
      })

      .addCase(getAllProducts.pending, (state) => {
        state.allProducts.isLoading = true;
        state.allProducts.success = false;
        state.allProducts.isError = false;
        state.allProducts.message = "";
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.allProducts.isLoading = false;
        state.allProducts.success = true;
        state.allProducts.isError = false;
        state.allProducts.message = "";
        state.allProducts.data = action.payload.result;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.allProducts.isLoading = false;
        state.allProducts.success = false;
        state.allProducts.isError = true;
        state.allProducts.message = action.payload;
      })

      .addCase(getProductsDetails.pending, (state) => {
        state.productDetails.isLoading = true;
        state.productDetails.success = false;
        state.productDetails.isError = false;
        state.productDetails.message = "";
      })
      .addCase(getProductsDetails.fulfilled, (state, action) => {
        state.productDetails.isLoading = false;
        state.productDetails.success = true;
        state.productDetails.isError = false;
        state.productDetails.message = "";
        state.productDetails.data = action.payload.result;
      })
      .addCase(getProductsDetails.rejected, (state, action) => {
        state.productDetails.isLoading = false;
        state.productDetails.success = false;
        state.productDetails.isError = true;
        state.productDetails.message = action.payload;
      })
      
  },
});

export const { resetNewProductState } = productSlice.actions;
export default productSlice.reducer;
