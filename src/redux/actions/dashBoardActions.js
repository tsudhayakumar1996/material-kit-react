import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAxios } from "../../axios/fetchHelpers";

export const statsGet = createAsyncThunk(
    'statsGet',
    async ({endUrl}) => {        
        const response = await getAxios(endUrl);
        return response;
    }
);