import api from '../config/api'
let endpoints= {
    user: '/users/me',
    logoutAll: '/users/me/logoutall',
    create: '/users',
    all: '/users',
    remove: '/users/',
};
export default {
    user: ()=>{
        return api.get(endpoints.user);
    },
    create:(payload)=>{
        return api.post(endpoints.create,payload);
    },
    all:()=>{
        return api.get(endpoints.all);
    },
    remove:(id)=>{
        return api.delete(endpoints.remove+id);
    },
    logoutAll:()=>{
        return api.post(endpoints.logoutAll);
    }
}