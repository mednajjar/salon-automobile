import { createSlice } from '@reduxjs/toolkit';

const carSlice = createSlice({
  name: 'carSlice',
  initialState: {
    car: [],
  },
  reducers: {
    getCar: () => { },
    setCar: (state = this.initialState, action) => ({
      ...state,
      car: action.payload
    }),
    getOneCar: () => {},
    
  },
});

export const { getCar, setCar, getOneCar } = carSlice.actions;
export default carSlice.reducer;
