import {
  createSlice,
} from "@reduxjs/toolkit";

type State = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
};

const initialState: State = {
  status: 'idle',
  error: undefined,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    }
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
