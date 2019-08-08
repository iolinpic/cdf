import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import user from './user'
import ui from './ui'

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        auth,
        user,
        ui,
    },
    state: {

    },
    mutations: {

    },
    actions: {

    }
});
