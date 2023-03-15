import { configureStore } from '@reduxjs/toolkit';

//reduces
import bookSlice from './slices/bookSlice';
import customerSlice from './slices/customerSlice';

export const store = configureStore({
    reducer:{
        book:bookSlice,
        customer:customerSlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});