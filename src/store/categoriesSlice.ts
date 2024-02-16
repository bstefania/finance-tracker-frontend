import {
  EntityState,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { getCategories, postCategories } from "../api/categories";
import { Category, CategoryInput } from "../types/database";

type State = EntityState<Category, string> & {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
};

const categoriesAdapter = createEntityAdapter<Category>();

export const selectCategoriesByGroup = (state: State, categoryGroupId: string | null) => {
  if (!categoryGroupId) return [];
  const allCategories = categoriesAdapter.getSelectors().selectAll(state);
  return allCategories.filter(category => category.categoryGroup.id === categoryGroupId);
};

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

export const insertCategory = createAsyncThunk(
  "categories/insertCategory",
  async (categoryInput: CategoryInput, thunkAPI) => {
    const response = await postCategories(categoryInput);
    thunkAPI.dispatch(fetchCategories());
    return response;
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

export const categoriesActions = {
  fetchCategories,
  insertCategory,
  selectCategoriesByGroup,
  ...categoriesSlice.actions
}

export default categoriesSlice.reducer;
