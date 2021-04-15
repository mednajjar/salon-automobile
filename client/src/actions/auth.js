import * as api from '../api';
import * as actionTypes from '../actions/actionTypes';

export const loginPage = (data, history) => async (dispatch) =>{
    try {
        const response = await api.loginPage(data)
            console.log(response)
                dispatch({
                    type: actionTypes.AUTH, 
                    payload: response
                })
        history.push('/dashboard');
        
    } catch (error) {
        console.log(error)
    }
}

export const logoutPage = (history) => async (dispatch) =>{
    try {
        await api.logoutPage()   
        dispatch({
            type: actionTypes.LOGOUT, 
        })
        history.push('/');
        
    } catch (error) {
        console.log(error)
    }
}