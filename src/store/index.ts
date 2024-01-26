import { configureStore } from "@reduxjs/toolkit";

import categoryGroupsReducer from "./categoryGroupsSlice";
import categoriesReducer from "./categoriesSlice";
import transactionsReducer from "./transactionsSlice";
import userSlice from "./userSlice";
import uiReducer from "./uiSlice";

const store = configureStore({
  reducer: {
    categoryGroups: categoryGroupsReducer,
    categories: categoriesReducer,
    transactions: transactionsReducer,
    user: userSlice,
    ui: uiReducer,
  }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;