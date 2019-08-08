import api from '../config/api'
let endpoints= {
    login: '/auth/login',
    logout: '/auth/logout'
};
export default {
    login: (payload)=>{
        return api.post(endpoints.login,payload)
    },
    logout:()=>{
        return api.post(endpoints.logout)
    }
}