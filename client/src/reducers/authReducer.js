// eslint-disable-next-line import/no-anonymous-default-export
import * as actionTypes from '../actions/actionTypes';
const authReducer = (state = { authData: null}, action) => {
    switch (action.type) {
      case actionTypes.AUTH:
        return { ...state, authData: action.data };
      case actionTypes.LOGOUT:
        localStorage.clear();
        return { ...state, authData: null};
      default:
        return state;
    }
  };
  
  export default authReducer;