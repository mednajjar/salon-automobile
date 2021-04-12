import Axios from 'axios';


const axios = Axios.create({ 
    baseURL: "http://localhost:4600/api/"
})



export const fetchCars = () => axios.get('/cars');
export const createCare = (car) => axios.post('/addcar', car);
export const getCar = (id) => axios.get(`/${id}`);
export const registerClient = (client) => axios.post('/registerclient', client)
export const registerOwner = (owner) => axios.post('/registerowner', owner)
export const loginPage = (data) => axios.post('/login/login', data)
export const getPlaces = () => axios.get('/places')



//   axios.interceptors.request.use((req) => {
//   if (localStorage.getItem('token')) {
//     req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token')).token}`;
//   }
//   return req;
// });
