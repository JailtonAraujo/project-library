import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//hooks
import { notify } from '../hooks/useToast';

import bookService from "../services/bookService";

const initialState = {
    book:{},
    books:[] as any,
    totalElements:0,
    totalPages:0,
    loading:false,
    error:false,
    success:true,
    message:''
}

export const findAllBooks = createAsyncThunk(
    "book/find",
    async (offset:number)=>{

        const data = await bookService.findAllBooks(offset);


        return data;

    }
);

export const finBookById = createAsyncThunk(
    "book/id",
    async (id:number) =>{

        const data = await bookService.findById(Number(id));
        
        return data;

    }
);

export const findByName = createAsyncThunk(
    "book/findByName",
    async (objectSearch:any)=>{

        const data = await bookService.findByName(objectSearch.name, objectSearch.offset);

        return data;

    }
);

export const findByGender = createAsyncThunk(
    "book/findByGender",
    async (objectSearch:any)=>{

        const data = await bookService.findByGender(objectSearch.name, objectSearch.offset);

        return data;

    }
);

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

export const updateBook = createAsyncThunk(
    "book/update",
    async (book:any, thunkApi)=>{

        const data = await bookService.updateBook(book);

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
           state.message='';
        },

    },

    extraReducers:(buider)=>{
        buider
        .addCase(findAllBooks.pending,(state)=>{
            state.loading=true;
        }).addCase(findAllBooks.fulfilled,(state,action)=>{
            state.books = action.payload.content;
            state.totalElements = action.payload.totalElements;
            state.totalPages = action.payload.totalPages;
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
            notify(`error: ${action.payload.message}`,'error');
            state.message = action.payload.message
        })

        .addCase(updateBook.pending,(state)=>{
            state.loading=true;
        }).addCase(updateBook.fulfilled,(state,action:any)=>{
            state.books.push(action.payload); 
            state.loading = false;
            notify('Livro atualizado com sucesso!','success');
        }).addCase(updateBook.rejected,(state,action:any)=>{
            state.book = {};
            state.loading = false;
            state.error = true;
            notify(`error: ${action.payload.message}`,'error');
            state.message = action.payload.message
        })

        .addCase(findByName.pending,(state)=>{
            state.loading=true;
        }).addCase(findByName.fulfilled,(state,action)=>{
            state.books = action.payload.content;
            state.totalElements = action.payload.totalElements;
            state.totalPages = action.payload.totalPages;
            state.loading = false;
        })

        .addCase(findByGender.pending,(state)=>{
            state.loading=true;
        }).addCase(findByGender.fulfilled,(state,action)=>{
            state.books = action.payload.content;
            state.totalElements = action.payload.totalElements;
            state.totalPages = action.payload.totalPages;
            state.loading = false;
        })

    }

});

export const { resetState } = bookSlice.actions;
export default bookSlice.reducer;