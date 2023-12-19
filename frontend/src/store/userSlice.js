import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../apis/userApi";

const init = {
  user: {},
  isLoading: false,
  success: false,
  isError: false,
  message: "",
};

const initialState = {
  isAuthenticated: false,
  login: init,
  signup: init,
  loadUser: { ...init, isLoading: true },
  logout: {
    isLoading: false,
    success: false,
    isError: false,
    message: "",
  },
};

export const userSignup = createAsyncThunk(
  "user/signup",
  async (user, thunkAPI) => {
    try {
      return await userService.signup(user);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userLogin = createAsyncThunk(
  "user/login",
  async (user, thunkAPI) => {
    try {
      return await userService.login(user);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userLogout = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      return await userService.logout();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, thunkAPI) => {
    try {
      return await userService.loadUser();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetState: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userSignup.pending, (state) => {
        state.signup.isLoading = true;
        state.signup.success = false;
        state.signup.isError = false;
        state.signup.message = "";
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.signup.isLoading = false;
        state.signup.success = true;
        state.signup.isError = false;
        state.signup.message = "";
        state.isAuthenticated = false;
        state.loadUser.user = action.payload.result;
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.signup.isLoading = false;
        state.signup.success = false;
        state.signup.isError = true;
        state.signup.message = action.payload;
      })
      .addCase(userLogin.pending, (state) => {
        state.login.isLoading = true;
        state.login.success = false;
        state.login.isError = false;
        state.login.message = "";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.login.isLoading = false;
        state.isAuthenticated = true;
        state.login.success = true;
        state.login.isError = false;
        state.login.user = action.payload.result;
        state.loadUser.user = action.payload.result;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.login.isLoading = false;
        state.login.success = false;
        state.login.isError = true;
        state.login.message = action.payload;
        state.isAuthenticated = false;
        state.login.user = {};
      })
      .addCase(loadUser.pending, (state, action) => {
        state.loadUser.isLoading = true;
        state.loadUser.success = false;
        state.loadUser.isError = false;
        state.loadUser.message = "";
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loadUser.isLoading = false;
        state.isAuthenticated = true;
        state.loadUser.success = true;
        state.loadUser.isError = false;
        state.loadUser.user = action.payload.result;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loadUser.isLoading = false;
        state.loadUser.success = false;
        state.loadUser.isError = true;
        state.loadUser.message = action.payload;
        state.isAuthenticated = false;
        state.loadUser.user = {};
      })
      .addCase(userLogout.pending, (state) => {
        state.logout.isLoading = true;
        state.logout.success = false;
        state.logout.isError = false;
        state.logout.message = "";
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.logout.isLoading = false;
        state.logout.success = false;
        state.logout.isError = true;
        state.logout.message = action.payload;
      });
  },
});

export const { resetState } = userSlice.actions;
export default userSlice.reducer;
