import * as api from '../api';

export const fetchCars = () => async (dispatch) =>{
    try {
        const {data} = await api.fetchCars();
        dispatch({
            type: 'FETCH_CARS', 
            payload: data
        })
        
    } catch (error) {
        console.log(error)
    }
}
export const addCar = (car, history) => async (dispatch) =>{
    try {
        const {data} = await api.createCare(car);
        
        dispatch({
            type: 'CREATE_CAR', 
            payload: data
        })
        console.log(data)
        history.push('/');
        
    } catch (error) {
        console.log(error)
    }
}
// export const deleteUser = (id) => async (dispatch) =>{
//     try {
//         await api.deleteUser(id);
//         dispatch({
//             type: 'DELETE', 
//             payload: id
//         })
        
//     } catch (error) {
//         console.log(error)
//     }
// }
// export const editUser = (id, user) => async (dispatch) =>{
//     try {
//         const {data} = await api.editUser(id, user);
//         dispatch({
//             type: 'EDIT', 
//             payload: data
//         })
        
//     } catch (error) {
//         console.log(error)
//     }
// }