import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Book } from "../interfaces/Book";

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
);

export const finBookById = createAsyncThunk(
    "book/id",
    async (id:number) =>{

        const data = await bookService.findById(Number(id));

        return data;

    }
)

export const newBook = createAsyncThunk(
    "book/new",
    async (book:any, thunkApi)=>{

        const data = await bookService.newBook(book);

        if(data.error){
            thunkApi.rejectWithValue(data);
            return;
        }

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
            state.loading = false;
        })

        .addCase(finBookById.pending,(state)=>{
            state.loading=true;
        }).addCase(finBookById.fulfilled,(state,action)=>{
            state.book = action.payload;
            state.loading = false;
        })

        .addCase(newBook.pending,(state)=>{
            state.loading=true;
        }).addCase(newBook.fulfilled,(state,action)=>{
            state.book = action.payload;
            state.loading = false;
        }).addCase(newBook.rejected,(state,action:any)=>{
            state.book = {};
            state.loading = false;
            state.error = true;
            state.success = false;
            state.message = action.payload.message
        })


    }

});

export const { resetState } = bookSlice.actions;
export default bookSlice.reducer;