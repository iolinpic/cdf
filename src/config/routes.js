import store from '@/store'
import {USER_CURRENT} from "@/store/mutation-types";

const ifNotAuthentificated = (to,from,next) =>{
    if(!store.getters.isAuthenticated){
        next();
        return
    }
    next('/')
};
const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        if(store.getters.uId === 0){
            store.dispatch(USER_CURRENT);
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
