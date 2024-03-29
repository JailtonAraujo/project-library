import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CheckOut } from '../interfaces/CheckOut';

import checkOutService from '../services/checkOutService';

import { notify } from '../hooks/useToast';

const initialState = {
    checkOut:{},
    listCheckOut:[],
    totalPages:0,
    totalElements:0,
    message:'',
    error:false,
    loading:false
}

// export const checkOut = createAsyncThunk(
//     "checkOut",
//     async (checkOut:CheckOut,thunkApi)=>{

//         const data = await checkOutService.createCheckOut(checkOut);

//         if(data.error){
//             return thunkApi.rejectWithValue(data);
//         }

//         return data;

//     }
// )

export const findAll = createAsyncThunk(
    "checkOut/findAll",
    async (offset:number)=>{

        const data = await checkOutService.findAll(offset);

        return data;

    }
)

export const findByCustomer = createAsyncThunk(
    "checkOut/findByName",
    async (objSearch:any)=>{

        const data = await checkOutService.findByCustomer(objSearch.offset,objSearch.name);

        return data;

    }
)

export const findByDateInterval = createAsyncThunk(
    "checkOut/findByDataInterval",
    async (objSearch:any)=>{

        const data = await checkOutService.findByDateInterval(objSearch.offset,objSearch.initialDate,objSearch.finalDate);

        return data;

    }
)


export const checkOutSlice = createSlice({
    name:'checkout',
    initialState,

    reducers:{
        resetState :(state)=>{
            state.loading=false;
            state.error=false;
            state.message='';
         },
    },

    extraReducers:(builder)=>{

        builder.addCase(findAll.pending,(state)=>{
            state.loading = true;
        }).addCase(findAll.fulfilled,(state,action)=>{
            state.loading = false;
            state.listCheckOut = action.payload.content;
            state.totalPages = action.payload.totalPages;
            state.totalElements = action.payload.totalElements;
        })

        .addCase(findByCustomer.pending,(state)=>{
            state.loading = true;
        }).addCase(findByCustomer.fulfilled,(state,action)=>{
            state.loading = false;
            state.listCheckOut = action.payload.content;
            state.totalPages = action.payload.totalPages;
            state.totalElements = action.payload.totalElements;
        })

        .addCase(findByDateInterval.pending,(state)=>{
            state.loading = true;
        }).addCase(findByDateInterval.fulfilled,(state,action)=>{
            state.loading = false;
            state.listCheckOut = action.payload.content;
            state.totalPages = action.payload.totalPages;
            state.totalElements = action.payload.totalElements;
        })

        // .addCase(checkOut.pending,(state)=>{
        //     state.loading = true;
        // }).addCase(checkOut.fulfilled,(state,action)=>{
        //     state.loading = false;
        //     notify('Livro devolvido com sucesso!','success');
            
        // }).addCase(checkOut.rejected,(state,action:any)=>{
        //     state.loading = false;
        //     state.message = 'Livro devolvido com sucesso!';
        //     state.error = true;
        //     notify('Error: '+action.payload.message,'error');

        // })

    }
})

export const { resetState } = checkOutSlice.actions;
export default checkOutSlice.reducer;