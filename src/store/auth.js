import * as types from './mutation-types'
import api from '../api'

const state = {
    token: localStorage.getItem('user-token') || '',
    currentUser: {name: 'Not Logged', _id: 0},
};
const getters = {
    authUser: state => state.currentUser,
    isAuthenticated: state => !!state.token,
    token: state => state.token,
};
const actions = {
    [types.AUTH_USER]: ({commit}) => new Promise((resolve, reject) => {
        let promise = api.auth.current();
        promise.then((resp) => {
            const user = resp.data;
            commit(types.AUTH_USER, user);
            resolve(resp)
        }).catch((err) => {
            reject(err)
        })
    }),
    [types.AUTH_REQUEST]: ({commit}, user) => new Promise((resolve, reject) => {
        let promise = api.auth.login(user);
        promise.then((resp) => {
            const token = resp.data.token;
            const user = resp.data.user;
            localStorage.setItem('user-token', token);
            commit(types.AUTH_SUCCESS, {token});
            commit(types.AUTH_USER, user);
            resolve(resp);
        })
            .catch((err) => {
                localStorage.removeItem('user-token');
                reject(err);
            });
    }),

    [types.AUTH_LOGOUT]: ({commit,}) => new Promise((resolve) => {
        commit(types.AUTH_LOGOUT);
        localStorage.removeItem('user-token');
        api.auth.logout();
        resolve();
    }),
};
const mutations = {
    [types.AUTH_SUCCESS]: (state, token) => {
        state.token = token.token;
    },
    [types.AUTH_LOGOUT]: (state) => {
        state.token = '';
        state.currentUser = {name: 'Not Logged', _id: 0};
    },
    [types.AUTH_USER]: (state, user) => {
        state.currentUser = user
    },
};
export default {
    state,
    getters,
    actions,
    mutations,
};
