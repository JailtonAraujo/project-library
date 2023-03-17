import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { notify } from '../hooks/useToast';
import { Customer } from '../interfaces/Customer';

import customerServices from '../services/customerService';

const initialState ={
    customers:[] as any,
    customer:{},
    loading:false,
    error:false,
    success:true,
    message:''
}

export const newCustomer = createAsyncThunk(
    "customer/new",
    async (customer:Customer, thnkApi) =>{

        const data = await customerServices.newCustomer(customer);

        if(data.error){
            return thnkApi.rejectWithValue(data);
        }

        return data;

    }
)

export const getAll = createAsyncThunk(
    "customer/getAll",
    async () =>{

        const data = await customerServices.getAll();

        return data;

    }
)

export const finfById = createAsyncThunk(
    "customer/id",
    async (id:number) =>{

        const data = await customerServices.findById(id);

        return data;

    }
)

export const finfByName = createAsyncThunk(
    "customer/name",
    async (name:string) =>{

        const data = await customerServices.finByName(name);

        return data;

    }
)

export const deleteCustomer = createAsyncThunk(
    "customer/delete",
    async (id:number) =>{

        const data = await customerServices.deleteCustomer(Number(id));

        return data;

    }
)

export const updateCustomer = createAsyncThunk(
    "customer/update",
    async (customer:Customer, thnkApi) =>{

        const data = await customerServices.updateCustomer(customer);

        if(data.error){
            return thnkApi.rejectWithValue(data);
        }

        return data;

    }
)

export const customerSlice = createSlice({
    name:'customer',
    initialState,

    reducers:{
        resetState :(state)=>{
            state.loading=false;
            state.error=false;
            state.success=true;
            state.message='';
         },
    },

    extraReducers:(builder)=>{

        builder.addCase(getAll.pending,(state)=>{
            state.loading = true;
        })
        .addCase(getAll.fulfilled,(state, action)=>{
            state.loading = false;
            state.customers = action.payload;
        })

        .addCase(newCustomer.pending,(state)=>{
            state.loading = true;
        })
        .addCase(newCustomer.fulfilled,(state, action:any)=>{
            state.loading = false;
            state.customers.push(action.payload);
            notify('Cliente cadastrado com sucesso!','success');
            state.success=true;
        }).addCase(newCustomer.rejected,(state,action:any)=>{
            state.loading = false;
            state.error = true;
            state.success = false;
            notify(`error: ${action.payload.message}`,'error');
        })

        .addCase(deleteCustomer.pending,(state)=>{
            state.loading = true;
        })
        .addCase(deleteCustomer.fulfilled,(state, action)=>{
            state.loading = false;
            state.customers = state.customers.filter((obj:any)=> String(obj.id) !== String(action.payload.id));
            notify('Cliente deletado com sucesso!','success');
        })

        .addCase(finfById.pending,(state)=>{
            state.loading = true;
            state.customer = {};
        })
        .addCase(finfById.fulfilled,(state, action)=>{
            state.loading = false;
            state.customer = action.payload;
        })

        .addCase(updateCustomer.pending,(state)=>{
            state.loading = true;
        })
        .addCase(updateCustomer.fulfilled,(state, action:any)=>{
            state.loading = false;
            state.customers = state.customers.filter((customer:any)=> customer.id !== action.payload.customer.id)
            state.customers.push(action.payload.customer);
            notify('Cliente atualizado com sucesso!','success');
        }).addCase(updateCustomer.rejected,(state,action:any)=>{
            state.loading = false;
            state.error = true;
            notify(`error: ${action.payload.message}`,'error');
        })

        .addCase(finfByName.pending,(state)=>{
            state.loading = true;
            state.customer = {};
        })
        .addCase(finfByName.fulfilled,(state, action)=>{
            state.loading = false;
            state.customers = action.payload;
        })

    }

});

export const { resetState } = customerSlice.actions;
export default customerSlice.reducer;