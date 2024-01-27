import { EntityState, createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import {
  deleteTransactions,
  getTransactions,
  postTransactions,
  patchTransactions,
} from "../api/transactions";
import { Transaction, TransactionInput, TransactionType } from "../types/database";
import { userActions } from "./userSlice";
import { handlePending, handleRejected } from "./utils";

type State = EntityState<Transaction, string> & {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
  updateMonthlyTransactions: boolean;
};

const transactionsAdapter = createEntityAdapter<Transaction>();

const initialState: State = transactionsAdapter.getInitialState({
  status: "idle",
  error: null,
  updateMonthlyTransactions: false,
});

// Thunk functions

export const fetchTransactions = createAsyncThunk("transactions/fetchTransactions", async () => {
  return getTransactions();
});

export const insertTransaction = createAsyncThunk(
  "transactions/insertTransaction",
  async (transactionInput: TransactionInput, thunkAPI) => {
    const response = await postTransactions(transactionInput);
    thunkAPI.dispatch(fetchTransactions());
    thunkAPI.dispatch(userActions.fetchWealth());
    return response;
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async (input: { id: string; newValues: TransactionInput }, thunkAPI) => {
    // TODO: send only changed values
    const response = await patchTransactions(input.id, input.newValues);
    thunkAPI.dispatch(fetchTransactions());
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
  reducers: {
    clearUpdateMonthlyTransactions: (state) => {
      state.updateMonthlyTransactions = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, handlePending)
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        transactionsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchTransactions.rejected, handleRejected)
      .addCase(insertTransaction.pending, handlePending)
      .addCase(insertTransaction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.updateMonthlyTransactions = true;
      })
      .addCase(insertTransaction.rejected, handleRejected)
      .addCase(updateTransaction.pending, handlePending)
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.updateMonthlyTransactions = true;
      })
      .addCase(updateTransaction.rejected, handleRejected)
      .addCase(deleteTransaction.pending, handlePending)
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.status = "succeeded";
        transactionsAdapter.removeOne(state, action.payload.id);
        state.updateMonthlyTransactions = true;
      })
      .addCase(deleteTransaction.rejected, handleRejected);
  },
});

export const transactionsActions = {
  ...transactionsSlice.actions,
  fetchTransactions,
  insertTransaction,
  deleteTransaction,
  updateTransaction,
};
export default transactionsSlice.reducer;
