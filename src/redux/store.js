import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import dashBoardSlice from "./slices/dashBoardSlice";
import postSlice from "./slices/postSlice";

const rootReducer = combineReducers({
    authState: authSlice,
    dashBoardState: dashBoardSlice,
    postState: postSlice,
});

export default configureStore({
    reducer : rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});