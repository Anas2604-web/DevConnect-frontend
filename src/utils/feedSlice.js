import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:"feed",
    initialState: [],
    reducers: {
        addFeed:(state, action) => action.payload,
        removeFeedUser: (state, action) =>
          state.filter(user => user._id !== action.payload)
    }
})

export default feedSlice.reducer

export const {addFeed, removeFeedUser} = feedSlice.actions