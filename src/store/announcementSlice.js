import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../components/api/api";

const initialState = {
  announcements: [],
  announcement: {},
  currentAnnouncement: {},
  loading: true,
  err: {},
};
export const changeAnnouncement = createAsyncThunk(
  "/announcement/changeAnnouncement",
  async (data, thunkApi) => {
    try {
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(data);
    }
  }
);
export const getAnnouncements = createAsyncThunk(
  "/announcement/getAnnouncements",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/announcement");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const reportSlice = createSlice({
  name: "announcement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changeAnnouncement.fulfilled, (state, action) => {
      state.currentAnnouncement = action.payload;
    });

    builder.addCase(getAnnouncements.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAnnouncements.fulfilled, (state, action) => {
      state.announcements = action.payload;
      state.loading = false;
      state.err = "";
    });

    builder.addCase(getAnnouncements.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on getting Data.";
    });
  },
});

export default reportSlice.reducer;
