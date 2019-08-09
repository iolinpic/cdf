import * as types from './mutation-types'
import api from '../api'
// import aux from '../config/api'
const state = {
    token: localStorage.getItem('user-token') || '',
    // refreshToken: localStorage.getItem('refresh-token') || '',
    status: '',
};
const getters = {
    isAuthenticated: state => !!state.token,
    token: state => state.token,
    // authStatus: state => state.status,
};
const actions = {
    [types.AUTH_REQUEST]: ({commit}, user) => new Promise((resolve, reject) => {
        commit(types.AUTH_REQUEST);
        let promise = api.auth.login(user);
        promise.then((resp) => {
            const token = resp.data.token;
            const user = resp.data.user;
            // const refreshToken = resp.data.refresh_token;
            localStorage.setItem('user-token', token);
            // localStorage.setItem('refresh-token', refreshToken);
            // aux.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            commit(types.AUTH_SUCCESS, {token});
            commit(types.USER_CURRENT,user);
            resolve(resp);
        })
            .catch((err) => {
                commit(types.AUTH_ERROR);
                localStorage.removeItem('user-token');
                // localStorage.removeItem('refresh-token');
                reject(err);
            });
    }),

    [types.AUTH_LOGOUT]: ({commit,}) => new Promise((resolve) => {
        commit(types.AUTH_LOGOUT);
        localStorage.removeItem('user-token');
        // localStorage.removeItem('refresh-token');
        api.auth.logout();
        // delete aux.defaults.headers.common['Authorization'];
        resolve();
    }),
};
const mutations = {
    [types.AUTH_REQUEST]: (state) => {
        state.status = 'loading';
    },
    [types.AUTH_SUCCESS]: (state, token) => {
        state.status = 'success';
        state.token = token.token;
        // state.refreshToken = token.refreshToken;
    },
    [types.AUTH_ERROR]: (state) => {
        state.status = 'error';
    },
    [types.AUTH_LOGOUT]: (state) => {
        state.status = 'logged out';
        state.token = '';
        // state.refreshToken = '';
    },
};
export default {
    state,
    getters,
    actions,
    mutations,
};
