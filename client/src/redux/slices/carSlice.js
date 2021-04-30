import { createSlice } from '@reduxjs/toolkit';

const carSlice = createSlice({
  name: 'carSlice',
  initialState: {
    car: [],
    carError: ''
  },
  reducers: {
    getCar: () => {},
    setCar: (state = this.initialState, action) => ({
      ...state,
      car: action.payload,
      carError: ''
    }),
    
  },
});

export const { carError, getCar, setCar } = carSlice.actions;
export default carSlice.reducer;
