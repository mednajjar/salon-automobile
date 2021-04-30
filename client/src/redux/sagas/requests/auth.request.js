import axios from 'axios';

axios.defaults.withCredentials = true;

const URL = 'http://localhost:4600/api';

export function requestIfLoged() {
  return axios.request({
    method: 'get',
    url: `${URL}`,
  });
}
export function requestLogin(action) {
  return axios.request({
    method: 'post',
    url: `${URL}/login`,
    data: {
      ...action.payload,
    },
  });
}
export function requestRegister(action) {
  return axios.request({
    method: 'post',
    url: `${URL}/register`,
    data: {
      ...action.payload,
    },
  });
}
export function requestLogout() {
  return axios.request({
    method: 'post',
    url: `${URL}/logout`,
  });
}



