import { takeLatest } from 'redux-saga/effects';
import { getLogin, ifLoged, getLogout, getRegister } from '../slices/authSlice';
import { getCar, getOneCar, deleteCar, editCar } from '../slices/carSlice';
import { handelGetCar, handelOneCar, handelDeleteCar, handelEditCar } from './handlers/car.handler';
import { handelGetLogin, handelIfLoged, handelGetLogout, handelGetRegister } from './handlers/auth.handler';


export function* watcherSaga() {
  yield takeLatest(ifLoged.type, handelIfLoged);
  yield takeLatest(getLogin.type, handelGetLogin);
  yield takeLatest(getLogout.type, handelGetLogout);
  yield takeLatest(getRegister.type, handelGetRegister);
  yield takeLatest(getCar.type, handelGetCar);
  yield takeLatest(getOneCar.type, handelOneCar);
  yield takeLatest(deleteCar.type, handelDeleteCar);
  yield takeLatest(editCar.type, handelEditCar);

}
