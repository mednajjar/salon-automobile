// eslint-disable-next-line import/no-anonymous-default-export
export default (clients = [], action) =>{
    switch(action.type){
            case 'REGISTER_Client':
            return [...clients, action.payload];
        default:
            return clients;
    }
}