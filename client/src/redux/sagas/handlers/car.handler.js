/* eslint-disable no-console */
import { call, put } from 'redux-saga/effects';

import { requestGetCar, requestOneCar, requestDeleteCar, requestEditCar } from '../requests/car.request';
import { setCar, setOneCar } from '../../slices/carSlice';


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
    const { data } = yield call(requestOneCar, action);
    if (data) {
      yield put(setOneCar(data));
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response);
    }

  }
}

export function* handelDeleteCar(action) {
  try {
    const { data } = yield call(requestDeleteCar, action);
    if (data) {
      yield put(setCar(data));
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response);
    }

  }
}

export function* handelEditCar(action) {

  try {
    const { data } = yield call(requestEditCar, action);
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

