import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { getWealth, initWealth } from "../api/user";
import { Wealth } from "../types/database";

type State = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
  wealth: Wealth;
};

const initialState: State = {
  status: 'idle',
  error: null,
  wealth: initWealth
};

// Thunk functions

export const fetchWealth = createAsyncThunk(
  "user/fetchWealth",
  async () => {
    return getWealth();
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWealth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWealth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.wealth = action.payload;
      })
      .addCase(fetchWealth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const userActions = {
  ...userSlice.actions,
  fetchWealth,
}
export default userSlice.reducer;
