// eslint-disable-next-line import/no-anonymous-default-export
export default (cars = [], action) =>{
    switch(action.type){
        case 'FETCH_CARS':
            return  action.payload;
        case 'CREATE_CAR':
            return [...cars, action.payload];
        case 'FETCH_CAR':
            return  action.payload;
        default:
            return cars;
    }
}