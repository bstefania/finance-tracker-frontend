import {
  EntityState,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { getCategoryGroups, postCategoryGroups } from "../api/categories";
import { CategoryGroup, CategoryGroupInput } from "../types/database";

type State = EntityState<CategoryGroup, string> & {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
};

const categoryGroupsAdapter = createEntityAdapter<CategoryGroup>();

const initialState: State = categoryGroupsAdapter.getInitialState({
  status: 'idle',
  error: null,
});

// Thunk functions

export const fetchCategoryGroups = createAsyncThunk(
  "categoryGroups/fetchCategoryGroups",
  async () => {
    return getCategoryGroups();
  }
);

export const insertCategoryGroup = createAsyncThunk(
  "categoryGroups/insertCategoryGroup",
  async (categoryGroupInput: CategoryGroupInput, thunkAPI) => {
    const response = await postCategoryGroups(categoryGroupInput);
    thunkAPI.dispatch(fetchCategoryGroups());
    return response;
  }
);

const categoryGroupsSlice = createSlice({
  name: "categoryGroups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryGroups.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoryGroups.fulfilled, (state, action) => {
        state.status = "succeeded";
        categoryGroupsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchCategoryGroups.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const categoryGroupsActions = {
  fetchCategoryGroups,
  insertCategoryGroup,
  ...categoryGroupsSlice.actions
}
export default categoryGroupsSlice.reducer;
