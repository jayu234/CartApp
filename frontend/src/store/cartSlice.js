import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartService from "../apis/cartApi";

const init = {
    isLoading: false,
    success: false,
    isError: false,
    message: "",
}

const initialState = {
  newItem: init,
  removeItem: init,
  items: {...init, data: []},
};

export const getCartItems = createAsyncThunk(
  "cart/items",
  async (_, thunkAPI) => {
    try {
      return await cartService.getCartItems();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const addItem = createAsyncThunk(
  "cart/add",
  async (data, thunkAPI) => {
    try {
      return await cartService.addItem(data);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeItem = createAsyncThunk(
  "cart/remove",
  async (id, thunkAPI) => {
    try {
      return await cartService.removeItem(id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetAddItemState: (state)=>{
      state.newItem = init
    },
    resetState: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.items.isLoading = true;
        state.items.success = false;
        state.items.isError = false;
        state.items.message = "";
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.items.isLoading = false;
        state.items.success = true;
        state.items.isError = false;
        state.items.message = "";
        state.items.data = action.payload.result.items;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.items.isLoading = false;
        state.items.success = false;
        state.items.isError = true;
        state.items.message = action.payload;
      })
          
      .addCase(addItem.pending, (state) => {
        state.newItem.isLoading = true;
        state.newItem.success = false;
        state.newItem.isError = false;
        state.newItem.message = "";
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.newItem.isLoading = false;
        state.newItem.success = true;
        state.newItem.isError = false;
        state.newItem.message = "";
        state.items.data = action.payload.result.items;
      })
      .addCase(addItem.rejected, (state, action) => {
        state.items.isLoading = false;
        state.items.success = false;
        state.items.isError = true;
        state.items.message = action.payload;
      })

      .addCase(removeItem.pending, (state) => {
        state.items.isLoading = true;
        state.items.success = false;
        state.items.isError = false;
        state.items.message = "";
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        state.items.isLoading = false;
        state.items.success = true;
        state.items.isError = false;
        state.items.message = "";
        state.items.data = action.payload.result.items;
      })
      .addCase(removeItem.rejected, (state, action) => {
        state.items.isLoading = false;
        state.items.success = false;
        state.items.isError = true;
        state.items.message = action.payload;
      })      
  },
});

export const { resetState, resetAddItemState } = cartSlice.actions;
export default cartSlice.reducer;
