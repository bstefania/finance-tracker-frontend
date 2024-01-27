export const handlePending = (state: any) => {
  state.status = "loading";
};

export const handleRejected = (state: any, action: any) => {
  state.status = "failed";
  state.error = action.error.message;
};