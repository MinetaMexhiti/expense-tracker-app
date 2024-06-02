import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseUrl";

// Register user
export const registerUserAction = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseURL}/api/users/register`, user);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Login user
export const loginUserAction = createAsyncThunk(
  "users/login",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseURL}/api/users/login`, user);
      // save user to local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Logout user
export const logoutAction = createAsyncThunk(
  "users/logout",
  async (payload, { rejectWithValue }) => {
    try {
      localStorage.removeItem("userInfo");
      return true;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// User profile
export const userProfileAction = createAsyncThunk(
  "users/profile",
  async (payload, { rejectWithValue, getState }) => {
    // Get user token
    const userToken = getState()?.users?.userAuth?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      const { data } = await axios.get(`${baseURL}/api/users/profile`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update profile
export const updateProfileAction = createAsyncThunk(
  "users/update-profile",
  async (user, { rejectWithValue, getState }) => {
    // Get user token
    const userToken = getState()?.users?.userAuth?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      const { data } = await axios.put(`${baseURL}/api/users/profile`, user, config);
      // Update user in local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slices
const usersSlice = createSlice({
  name: "users",
  initialState: {},
  reducers: {
    // Clean up registered data
    resetRegisteredUser: (state) => {
      state.isRegistered = false;
    },
  },
  extraReducers: (builder) => {
    // Register user
    builder.addCase(registerUserAction.pending, (state) => {
      state.userLoading = true;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.userLoading = false;
      state.isRegistered = true;
      state.registered = action?.payload;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.userLoading = false;
      state.userAppErr = action?.payload?.msg;
      state.userServerErr = action?.error?.message;
    });

    // Login user
    builder.addCase(loginUserAction.pending, (state) => {
      state.userLoading = true;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth = action?.payload;
      state.userLoading = false;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
      state.isLogin = true;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.userLoading = false;
      state.userAppErr = action?.payload?.msg;
      state.userServerErr = action?.error?.message;
    });

    // Logout user
    builder.addCase(logoutAction.fulfilled, (state) => {
      state.userAuth = undefined;
      state.isLogin = undefined;
    });

    // User profile
    builder.addCase(userProfileAction.pending, (state) => {
      state.userLoading = true;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    builder.addCase(userProfileAction.fulfilled, (state, action) => {
      state.profile = action?.payload;
      state.userLoading = false;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    builder.addCase(userProfileAction.rejected, (state, action) => {
      state.userLoading = false;
      state.userAppErr = action?.payload?.msg;
      state.userServerErr = action?.error?.message;
    });

    // Update profile
    builder.addCase(updateProfileAction.pending, (state) => {
      state.userLoading = true;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    builder.addCase(updateProfileAction.fulfilled, (state, action) => {
      state.profile = action?.payload;
      state.isUpdated = true;
      state.userLoading = false;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    builder.addCase(updateProfileAction.rejected, (state, action) => {
      state.userLoading = false;
      state.userAppErr = action?.payload?.msg;
      state.userServerErr = action?.error?.message;
    });
  },
});

export const { resetRegisteredUser } = usersSlice.actions;
export default usersSlice.reducer;
