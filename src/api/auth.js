import api from '../config/api'
let endpoints= {
    login: '/auth/login',
    logout: '/auth/logout',
    currentUser: '/auth/user',
};
export default {
    current: ()=>{
        return api.get(endpoints.currentUser);
    },
    login: (payload)=>{
        return api.post(endpoints.login,payload)
    },
    logout:()=>{
        return api.post(endpoints.logout)
    }
}