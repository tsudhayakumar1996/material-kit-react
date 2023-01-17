import { createSlice } from "@reduxjs/toolkit";
import { statsGet } from "../actions/dashBoardActions";

const initialState = {
    stats: null
};

const dashBoardSlice = createSlice({
    name: "dashBoardSlice",
    initialState,
    reducers: {
        clearDashBoardState : (state) => {
            return {
                ...state,
                stats: null
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(statsGet.pending,(state)=>{
            state.stats = null;
        });
        builder.addCase(statsGet.fulfilled,(state,action) => {
            state.stats = action["payload"];            
        });
        builder.addCase(statsGet.rejected,(state)=>{
            state.stats = null;                    
        });
    }
});

export const { clearDashBoardState } = dashBoardSlice.actions;
export default dashBoardSlice.reducer;