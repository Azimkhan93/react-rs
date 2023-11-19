import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './searchSlice';
import { productsApi } from './productsApi';
import itemsPerPageSlice from './itemsPerPageSlice';

export const store = configureStore({
  reducer: {
    search: searchSlice,
    [productsApi.reducerPath]: productsApi.reducer,
    items: itemsPerPageSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
