/* eslint-disable no-console */
import { call, put } from 'redux-saga/effects';
import { requestGetCar, requestOneCar } from '../requests/car.request';
import { setCar } from '../../slices/carSlice';


export function* handelGetCar(action) {
  try {
    const { data } = yield call(requestGetCar, action);
    if (data) {
      yield put(setCar(data));
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response);
    }

  }
}
export function* handelOneCar(action) {
  try {
    // console.log("test", action)
    const { data } = yield call(requestOneCar, action);
    if (data) {
      // console.log('handle', action)
      yield put(setCar(data));
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response);
    }

  }
}

