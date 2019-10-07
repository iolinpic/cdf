import api from '../config/api'
let endpoints= {
    logoutAll: '/users/me/logoutall',
    users:'/users/',
};
export default {
    create:(payload)=>{
        return api.post(endpoints.users,payload);
    },
    all:()=>{
        return api.get(endpoints.users);
    },
    user:(id)=>{
        return api.get(endpoints.users+id);
    },
    update:(id,payload)=>{
        return api.put(endpoints.users+id,payload);
    },
    remove:(id)=>{
        return api.delete(endpoints.users+id);
    },
    logoutAll:()=>{
        return api.post(endpoints.logoutAll);
    }
}