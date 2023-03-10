import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import bookService from "../services/bookService";

const initialState = {
    book:{},
    books:[],
    loading:false,
    error:false,
    success:true,
    message:''
}

export const findAllBooks = createAsyncThunk(
    "book/find",
    async ()=>{

        const data = await bookService.findAllBooks();

        return data;

    }
)


export const bookSlice = createSlice({
    name:'book',
    initialState,

    reducers:{

        resetState :(state)=>{
           state.loading=false;
           state.error=false;
           state.success=true;
           state.message='';
        },

    },

    extraReducers:(buider)=>{
        buider
        .addCase(findAllBooks.pending,(state)=>{
            state.loading=true;
        }).addCase(findAllBooks.fulfilled,(state,action)=>{
            state.books = action.payload;
        })
    }

});

export const { resetState } = bookSlice.actions;
export default bookSlice.reducer;