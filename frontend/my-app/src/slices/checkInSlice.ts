import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Checkin } from "../interfaces/CheckIn";

import { notify } from "../hooks/useToast";

import checkInService from "../services/checkInService";
import checkOutService from "../services/checkOutService";
import { CheckOut } from "../interfaces/CheckOut";

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


export const checkOut = createAsyncThunk(
    "checkOut",
    async (checkOut:CheckOut,thunkApi)=>{

        const data = await checkOutService.createCheckOut(checkOut);

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


export const findByCustomerName = createAsyncThunk(
    "checkIn/findbyCustomerName",
    async (objectSearch:any) =>{
        const data = await checkInService.findByCustomerName(Number(objectSearch.offset),objectSearch.name);

        if(data.error){
            return data.rejectWithValue(data);
        }
       
        return data;
    }
)


export const findByDateInterval = createAsyncThunk(
    "checkIn/findbyDateInerval",
    async (objectSearch:any) =>{
        const data = await checkInService.findByDateInterval(
            Number(objectSearch.offset),
            objectSearch.initialDate,
            objectSearch.finalDate
            );

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
            state.loading = false;
            state.error = true;
            state.message = `Erro - ${action.payload}`;
            notify(`Erro - ${action.payload.message}`,'error');
        })

        .addCase(checkOut.pending,(state)=>{
            state.loading=true;
        }).addCase(checkOut.fulfilled,(state,action:any)=>{
            state.loading = false;
            state.checkInList = state.checkInList.filter((check:Checkin) => check.id !== action.payload.checkInId);
            state.totalElements = state.totalElements -1;
            state.totalPages = Math.ceil(state.totalElements/10);
            notify(`CheckOut feito com sucesso!`,'success');
        }).addCase(checkOut.rejected,(state,action:any)=>{
            state.loading = false;
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

        .addCase(findByCustomerName.pending,(state)=>{
            state.loading=true;
        }).addCase(findByCustomerName.fulfilled,(state,action:any)=>{
            state.loading = false;
            state.checkInList = action.payload.content;
            state.totalElements = action.payload.totalElements;
            state.totalPages = action.payload.totalPages;
        }).addCase(findByCustomerName.rejected,(state)=>{
            state.checkInList = [];
            state.loading = false;
            state.totalElements = 0;
            state.totalPages = 0;
        })

        .addCase(findByDateInterval.pending,(state)=>{
            state.loading=true;
        }).addCase(findByDateInterval.fulfilled,(state,action:any)=>{
            state.loading = false;
            state.checkInList = action.payload.content;
            state.totalElements = action.payload.totalElements;
            state.totalPages = action.payload.totalPages;
        }).addCase(findByDateInterval.rejected,(state)=>{
            state.checkInList = [];
            state.loading = false;
            state.totalElements = 0;
            state.totalPages = 0;
        })

    }
})

export const { resetState } = checkInSlice.actions;
export default checkInSlice.reducer;