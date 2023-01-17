import { createSlice } from "@reduxjs/toolkit";
import { postGet } from "../actions/postAction";

const initialState = {
    posts: [],
    isNavigated: false,
    activePage: 0
};

const postSlice = createSlice({
    name: "postSlice",
    initialState,
    reducers: {
        clearPostsState : (state) => {
            return {
                ...state,
                posts: null,
                isNavigated: false
            }
        },
        addPosts: (state, action) => {
            return {
                ...state,
                posts: action['payload']
            }
        },
        setActivePage: (state, action) => {
            return{
                ...state,
                activePage: action['payload']
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(postGet.pending,(state)=>{
            state.posts = [...state.posts];
        });
        builder.addCase(postGet.fulfilled,(state,action) => {
            state.posts = [...state.posts, ...action['payload']?.data?.data];            
        });
        builder.addCase(postGet.rejected,(state)=>{
            state.posts = [];                    
        });
    }
});

export const { clearDashBoardState, addPosts, setActivePage } = postSlice.actions;
export default postSlice.reducer;