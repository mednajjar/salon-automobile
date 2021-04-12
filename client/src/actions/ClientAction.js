import * as api from '../api';
export const registerClient = (client, history) => async (dispatch) =>{
    try {
        const {data} = await api.registerClient(client);
        
        dispatch({
            type: 'REGISTER_CLIENT', 
            payload: data
        })
        console.log(data)
        history.push('/');
        
    } catch (error) {
        console.log(error)
    }
}