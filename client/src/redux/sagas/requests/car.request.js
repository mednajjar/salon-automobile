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
