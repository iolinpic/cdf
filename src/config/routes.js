import store from '@/store'
import {AUTH_USER} from "@/store/mutation-types";

const ifNotAuthentificated = (to,from,next) =>{
    if(!store.getters.isAuthenticated){
        next();
        return
    }
    next('/')
};
const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        if(store.getters.authUser._id === 0){
            store.dispatch(AUTH_USER);
        }
        next();
        return
    }
    next('/login')
};
export default  {
    ifNotAuthentificated,
    ifAuthenticated,
}
