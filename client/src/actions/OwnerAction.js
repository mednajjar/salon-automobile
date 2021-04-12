import * as api from '../api';

export const registerOwner = (owner, history) => async (dispatch) =>{
    try {
        const {data} = await api.registerOwner(owner);
        
        dispatch({
            type: 'REGISTER_OWNER', 
            payload: data
        })
        console.log(data)
        history.push('/');
        
    } catch (error) {
        console.log(error)
    }
}