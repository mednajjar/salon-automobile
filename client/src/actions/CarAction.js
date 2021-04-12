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

export const getCar = (id) => async (dispatch) =>{
    try {
        const {data} = await api.getCar(id);
        dispatch({
            type: 'FETCH_CAR', 
            payload: data
        })
        
    } catch (error) {
        console.log(error)
    }
}


