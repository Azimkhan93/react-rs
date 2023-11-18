import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './searchSlice';
// import { vehiclesApi } from './vehicleApi';

export const store = configureStore({
  reducer: {
    search: searchSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
