import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Checkin } from "../interfaces/CheckIn";

import { notify } from "../hooks/useToast";

import checkInService from "../services/checkInService";

const initialState = {
    checkin: {},
    checkInList:[],
    totalElements:0,
    totalPages:0,
    loading: false,
    error: false,
    message: ''
}


export const checkIn = createAsyncThunk(
    "checkin/create",
    async (checkInData:Checkin, thunkApi) => {

        const data = await checkInService.createCheckIn(checkInData);

        if(data.error){
            return thunkApi.rejectWithValue(data);
        }

        return data;

    }
)

export const findAll = createAsyncThunk(
    "checkIn/findAll",
    async (offset:number) =>{
        const data = await checkInService.findAll(offset);

        if(data.error){
            return data.rejectWithValue(data);
        }
       
        return data;
    }
)


export const checkInSlice = createSlice({
    name: 'customer',
    initialState,

    reducers: {
        resetState: (state) => {
            state.loading = false;
            state.error = false;
            state.message = '';
        },
    },

    extraReducers: (builder) => {

        builder.addCase(checkIn.pending,(state)=>{
            state.loading=true;
        }).addCase(checkIn.fulfilled,(state,action:any)=>{
            state.loading = false;
            state.checkin=action.payload;
            notify(`CheckIn feito com sucesso!`,'success');
        }).addCase(checkIn.rejected,(state,action:any)=>{
            state.error = true;
            state.message = `Erro - ${action.payload}`;
            notify(`Erro - ${action.payload.message}`,'error');
        })

        .addCase(findAll.pending,(state)=>{
            state.loading=true;
        }).addCase(findAll.fulfilled,(state,action:any)=>{
            state.loading = false;
            state.checkInList = action.payload.content;
            state.totalElements = action.payload.totalElements;
            state.totalPages = action.payload.totalPages;
        }).addCase(findAll.rejected,(state)=>{
            state.checkInList = [];
            state.loading = false;
            state.totalElements = 0;
            state.totalPages = 0;
        })

    }
})

export const { resetState } = checkInSlice.actions;
export default checkInSlice.reducer;