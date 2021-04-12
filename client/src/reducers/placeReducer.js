// eslint-disable-next-line import/no-anonymous-default-export
export default (place = [], action) =>{
    switch(action.type){
        case 'FETCH':
            return action.payload;
        default:
            return place;
    }
}