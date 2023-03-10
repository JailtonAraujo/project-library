import { configureStore } from '@reduxjs/toolkit';

//reduces
import bookSlice from './slices/bookSlice';

export const store = configureStore({
    reducer:{
        book:bookSlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});