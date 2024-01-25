import {
  EntityState,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { getCategories } from "../api/categories";
import { Category } from "../types/database";

type State = EntityState<Category, string> & {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
};

const categoriesAdapter = createEntityAdapter<Category>();

const initialState: State = categoriesAdapter.getInitialState({
  status: 'idle',
  error: null,
});

// Thunk functions

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    return getCategories();
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        categoriesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const categoriesActions = categoriesSlice.actions;
export default categoriesSlice.reducer;
