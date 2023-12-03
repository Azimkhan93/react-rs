import { createSlice } from '@reduxjs/toolkit';
import { IFormInput } from '../validation/UserValidation';

type State = {
  formData: IFormInput[];
};

const initialState: State = {
  formData: [],
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      const {
        name,
        age,
        email,
        password,
        confirmPassword,
        gender,
        tc,
        image,
        country,
      } = action.payload;

      state.formData.push({
        name,
        age,
        email,
        password,
        confirmPassword,
        gender,
        tc,
        image,
        country,
      });
    },
  },
});

export const { setFormData, setImage } = formSlice.actions;
export default formSlice.reducer;
