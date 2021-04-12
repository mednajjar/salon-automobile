// eslint-disable-next-line import/no-anonymous-default-export
export default (owners = [], action) =>{
    switch(action.type){
            case 'REGISTER_OWNER':
            return [...owners, action.payload];
        default:
            return owners;
    }
}