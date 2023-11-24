import { createSlice } from '@reduxjs/toolkit';

export const itemsPerPageSlice = createSlice({
  name: 'items',
  initialState: {
    itemsPerPage: 10,
  },
  reducers: {
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
  },
});

export const { setItemsPerPage } = itemsPerPageSlice.actions;
export default itemsPerPageSlice.reducer;
