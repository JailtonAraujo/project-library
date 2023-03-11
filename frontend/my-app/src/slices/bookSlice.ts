import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//hooks
import { notify } from '../hooks/useToast';

import bookService from "../services/bookService";

const initialState = {
    book:{},
    books:[] as any,
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
            return thunkApi.rejectWithValue(data);
        }

        return data;

    }
)

export const deleteBook = createAsyncThunk(
    "book/delete",
    async(id:number,thunkApi)=>{

        const data = await bookService.deleteBook(id);

        if(data.error){
            return thunkApi.rejectWithValue(data);
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
        }).addCase(newBook.fulfilled,(state,action:any)=>{
            state.books.push(action.payload); 
            state.loading = false;
            notify('Livro cadastrado com sucesso!','success');
        }).addCase(newBook.rejected,(state,action:any)=>{
            state.book = {};
            state.loading = false;
            state.error = true;
            state.success = false;
            notify(`error: ${action.payload.message}`,'error');
            state.message = action.payload.message
        })

        .addCase(deleteBook.pending,(state)=>{
            state.loading=true;
        }).addCase(deleteBook.fulfilled,(state,action)=>{
            state.loading = false;
            state.books = state.books.filter((element:any)=> element.id !== action.payload.id);
            notify('Livro deletado com sucesso!','success');
        }).addCase(deleteBook.rejected,(state,action:any)=>{
            state.loading = false;
            state.error = true;
            state.success = false;
            notify(`error: ${action.payload.message}`,'error');
            state.message = action.payload.message
        })


    }

});

export const { resetState } = bookSlice.actions;
export default bookSlice.reducer;