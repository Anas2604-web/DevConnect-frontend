import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name:"connections",
    initialState: [],
    reducers: {
        addConnections:(state, action) => action.payload,
        removeConnections:() => null,
        addOneConnection: (state, action) => { 
        state.unshift(action.payload);
}

    }
})

export default connectionSlice.reducer

export const { addConnections, removeConnections, addOneConnection } = connectionSlice.actions