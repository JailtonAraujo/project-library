import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Checkin } from "../interfaces/CheckIn";

import { notify } from "../hooks/useToast";

import checkInService from "../services/checkInService";

const initialState = {
    checkin: {},
    checkInList: [],
    loading: false,
    error: false,
    success: true,
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


export const checkInSlice = createSlice({
    name: 'customer',
    initialState,

    reducers: {
        resetState: (state) => {
            state.loading = false;
            state.error = false;
            state.success = true;
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
            state.success = false;
            state.message = `Erro - ${action.payload}`;
            notify(`Erro - ${action.payload.message}`,'error');
        })

    }
})

export const { resetState } = checkInSlice.actions;
export default checkInSlice.reducer;