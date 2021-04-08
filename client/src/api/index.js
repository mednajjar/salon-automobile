import Axios from 'axios';

const axios = Axios.create({ 
    baseURL: "http://localhost:4600/api"
})



export const fetchCars = () => axios.get('/cars');
export const createCare = (car) => axios.post('/addcar', car);
// export const deleteUser = (id) => axios.delete(`/delete/${id}`);
// export const editUser = (id, updateUser) => axios.patch(`/update/${id}`, updateUser);