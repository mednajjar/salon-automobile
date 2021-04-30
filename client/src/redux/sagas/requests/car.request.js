import axios from 'axios';

const URL = 'http://localhost:4600/api';

export function requestGetCar() {
  return axios.request({
    method: 'get',
    url: `${URL}/cars/fetch`,
  });
}