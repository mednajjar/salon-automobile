/* eslint-disable no-console */
import { call, put } from 'redux-saga/effects';
import {requestGetCar} from '../requests/car.request';
import { setCar } from '../../slices/carSlice';


export function* handelGetCar(action) {
  try {
    const { data } = yield call(requestGetCar, action);
    if (data) {
      console.log(data)
      yield put(setCar(data));
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response);
    }
  }
}
