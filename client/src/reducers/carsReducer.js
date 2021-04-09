// eslint-disable-next-line import/no-anonymous-default-export
export default (cars = [], action) =>{
    switch(action.type){
        case 'FETCH_CARS':
            return  action.payload;
        case 'CREATE_CAR':
            return [...cars, action.payload];
        // case 'DELETE':
            
        //     return users.filter((user)=> user._id !== action.payload)
        // case 'EDIT':
            
        //     return users.map((user)=> user._id === action.payload._id ? action.payload : user)
        default:
            return cars;
    }
}