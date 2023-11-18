import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './searchSlice';
import { productsApi } from './productsApi';

export const store = configureStore({
  reducer: {
    search: searchSlice,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
