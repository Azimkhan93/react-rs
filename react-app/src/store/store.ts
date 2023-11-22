import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import searchSlice from './searchSlice';
import { productsApi } from './productsApi';
import itemsPerPageSlice from './itemsPerPageSlice';

const rootReducer = combineReducers({
  search: searchSlice,
  [productsApi.reducerPath]: productsApi.reducer,
  items: itemsPerPageSlice,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productsApi.middleware),
  });
};
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
