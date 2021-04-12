import * as api from '../api';
import * as actionTypes from '../actions/actionTypes';

export const loginPage = (data, history) => async (dispatch) =>{
    try {
        const response = await api.loginPage(data)
        if(response){
            console.log(response.data)
                dispatch({
                    type: actionTypes.AUTH, 
                    payload: response.data
                })
        history.push('/dashboard');
        }
        
    } catch (error) {
        console.log(error)
    }
}