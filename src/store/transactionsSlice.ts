import {
  EntityState,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  deleteTransactions,
  getTransactions,
  postTransactions,
} from "../api/transactions";
import { Transaction, TransactionInput } from "../types/database";
import { userActions } from "./userSlice";

type State = EntityState<Transaction, string> & {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
};

const transactionsAdapter = createEntityAdapter<Transaction>();

const initialState: State = transactionsAdapter.getInitialState({
  status: "idle",
  error: null,
});

// Thunk functions

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    return getTransactions();
  }
);

export const insertTransaction = createAsyncThunk(
  "transactions/insertTransaction",
  async (transactionInput: TransactionInput, thunkAPI) => {
    const response = await postTransactions(transactionInput);
    thunkAPI.dispatch(userActions.fetchWealth());
    return response;
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (transactionId: string, thunkAPI) => {
    const response = await deleteTransactions(transactionId);
    thunkAPI.dispatch(userActions.fetchWealth());
    return response;
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        transactionsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(insertTransaction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(insertTransaction.fulfilled, (state, action) => {
        state.status = "succeeded";
        transactionsAdapter.addOne(state, action.payload);
      })
      .addCase(insertTransaction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteTransaction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.status = "succeeded";
        transactionsAdapter.removeOne(state, action.payload.id);
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const transactionsActions = {
  ...transactionsSlice.actions,
  fetchTransactions,
  insertTransaction,
  deleteTransaction,
};
export default transactionsSlice.reducer;
