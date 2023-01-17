import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginPostAxios } from "../../axios/fetchHelpers";

export const authAction = createAsyncThunk(
    'authAction',
    async ({endUrl, postData}) => {        
        const response = await loginPostAxios(endUrl, postData);
        return response;
    }
);