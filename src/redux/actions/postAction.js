import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAxios } from "../../axios/fetchHelpers";

export const postGet = createAsyncThunk(
    'postGet',
    async ({endUrl}) => {        
        const response = await getAxios(endUrl);
        return response;
    }
);