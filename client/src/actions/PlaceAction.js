import * as api from '../api';

export const getPlaces = () => async (dispatch) =>{
    try {
        const data = await api.getPlaces();
        console.log(data.data)
        dispatch({
            type: 'FETCH', 
            payload: data.data
        })
        
    } catch (error) {
        console.log(error)
    }
}