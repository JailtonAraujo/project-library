import { configureStore } from '@reduxjs/toolkit';

//reduces
import bookSlice from './slices/bookSlice';
import customerSlice from './slices/customerSlice';
import checkInSlice from './slices/checkInSlice';
import checkOutSlice from './slices/checkOutSlice';

export const store = configureStore({
    reducer:{
        book:bookSlice,
        customer:customerSlice,
        checkin:checkInSlice,
        checkout:checkOutSlice,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});