import { createSlice } from "@reduxjs/toolkit";
import { authAction } from "../actions/authActions";

const initialState = {
    isLoggedIn: false,
}

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        logOutUser : (state) => {
            return {
                ...state,
                isLoggedIn: false
            };
        },
        logInUser : (state) => {
            return {
                ...state,
                isLoggedIn: true
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(authAction.pending,(state)=>{
            state.isLoggedIn = false;
        });
        builder.addCase(authAction.fulfilled,(state,action) => {
            state.isLoggedIn = true;            
        });
        builder.addCase(authAction.rejected,(state)=>{
            state.isLoggedIn = false;                    
        });
    }
});

export const { logOutUser, logInUser } = authSlice.actions;
export default authSlice.reducer;