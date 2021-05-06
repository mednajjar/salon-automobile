import { createSlice } from '@reduxjs/toolkit';

const carSlice = createSlice({
  name: 'carSlice',
  initialState: {
    car: [],
    oneCar:''
  },
  reducers: {
    getCar: () => { },
    setCar: (state = this.initialState, action) => ({ 
        ...state,
        car:[...action.payload],
    }),
    getOneCar: () => { },
    setOneCar: (state = this.initialState, action) => ({ 
      ...state,
      oneCar:action.payload,
  }),
    deleteCar: () => { },
    editCar: () => { },

  },
});

export const { getCar, setCar, getOneCar,setOneCar, deleteCar, editCar } = carSlice.actions;
export default carSlice.reducer;
