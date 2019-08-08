import api from '../config/api'
let endpoints= {
    user: '/users/me',
    logoutAll: '/users/me/logoutall',
    create: '/users',


};
export default {
    user: ()=>{
        return api.get(endpoints.user);
    },
    create:(payload)=>{
        return api.post(endpoints.create,payload);
    },
    logoutAll:()=>{
        return api.post(endpoints.logoutAll);
    }
}