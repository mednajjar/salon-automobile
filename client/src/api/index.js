import Axios from 'axios';


const axios = Axios.create({ 
    baseURL: "http://localhost:4600/api/"
})

axios.defaults.withCredentials = true;


export const fetchCars = () => axios.get('/cars');
export const createCare = (car) => axios.post('/addcar', car);
export const getCar = (id) => axios.get(`/${id}`);
export const registerClient = (client) => axios.post('/registerclient', client)
export const registerOwner = (owner) => axios.post('/registerowner', owner)
export const loginPage = (data) => axios.post('/login/login',data,{withCredentials: true}).then(res=>console.log(res.data))
export const logoutPage = () => axios.get('/logout/logout')
export const getPlaces = () => axios.get('/places')




