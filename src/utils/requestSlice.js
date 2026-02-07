import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: [],
  reducers: {
    addRequests: (state, action) => action.payload,
    clearRequests: () => [],
  },
});

export default requestSlice.reducer;
export const { addRequests, clearRequests } = requestSlice.actions;
