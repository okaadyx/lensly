import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    wishlist:[]
}

const wishlistReducer = createSlice({
    name:"wishlist",
    initialState,
    reducers:{

    }
})

export const {  } = wishlistReducer.actions;
export default wishlistReducer.reducer;