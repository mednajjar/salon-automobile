import axios from 'axios';
axios.defaults.withCredentials = true;
const URL = 'http://localhost:4600/api';

export function requestGetCar() {
  return axios.request({
    method: 'get',
    url: `${URL}/cars/fetch`,
  });
}

export function requestOneCar(action) {
  return axios.request({
    method: 'get',
    url: `${URL}/car/${action.payload}`,
  });
}

export function requestDeleteCar(action) {
  return axios.request({
    method: 'delete',
    url: `${URL}/deleteCar/${action.payload}`,
  });
}

export function requestEditCar(action) {
 const {id,formData}= action.payload
 return  axios.put( `${URL}/updateCar/${id}`, formData)
  // return axios.request({
  //   method: 'put',
  //   url: `${URL}/updateCar/${action.payload.id}`,
  //   data: {
  //     ...action.payload.formData
  //   },
  //   headers: {'Content-Type': 'multipart/form-data' }
  // });
}
