// redux/slices/statistics/accountStatsSlices.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";

// Fetch Account Stats
export const fetchAccountStatsAction = createAsyncThunk(
  "stats/details",
  async (stats, { rejectWithValue, getState, dispatch }) => {
    // Get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    // HTTP call
    try {
      const { data } = await axios.get(`${baseUrl}/api/stats`, config);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const statisticsSlice = createSlice({
  name: "statistics",
  initialState: {},
  extraReducers: builder => {
    builder.addCase(fetchAccountStatsAction.pending, (state, action) => {
      state.statsLoading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchAccountStatsAction.fulfilled, (state, action) => {
      state.statsLoading = false;
      state.stats = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchAccountStatsAction.rejected, (state, action) => {
      state.statsLoading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default statisticsSlice.reducer;
