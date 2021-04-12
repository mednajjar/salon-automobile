import {combineReducers} from 'redux';

import cars from './carsReducer';
import clients from './clientReducer';
import owners from './ownerReducer';
import auth from './authReducer';
import place from './placeReducer';
export default combineReducers({
    cars: cars,
    clients: clients,
    owners: owners,
    auth: auth,
    place: place,
    
})