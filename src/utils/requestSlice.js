import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: [],
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequestById: (state, action) =>
    state.filter(req => req._id !== action.payload)

  },
});

export default requestSlice.reducer;
export const { addRequests, removeRequestById } = requestSlice.actions;
