import * as types from './mutation-types'
import api from '../api'

const state = {
    allUsers:[],
};
const getters = {
    users: state => state.allUsers,
};
const actions = {
    [types.USER_CREATE]:({commit}, payload) => new Promise((resolve,reject)=>{
        let promise = api.user.create(payload);
        promise.then((resp)=>{
            const user = resp.data.user;
            commit(types.USER_CREATE,user);
            commit(types.UI_ALERT_SHOW,{type:'success',message:'Пользователь '+user.name+' создан!'});
            resolve(resp)
        }).catch((err)=>{
            reject(err)
        })
    }),
    [types.USER_UPDATE]:({commit},payload)=> new Promise((resolve,reject)=>{
        let promise = api.user.update(payload.id,payload.data);
        promise.then((resp)=>{
            const user = resp.data;
            commit(types.USER_UPDATE,user);
            commit(types.UI_ALERT_SHOW,{type:'success',message:'Пользователь '+resp.data.name+' изменен!'});
            resolve(resp)
        }).catch((err)=>{
            reject(err)
        })
    }),

    [types.USER_ALL]:({commit})=> new Promise((resolve,reject)=>{
        let promise = api.user.all();
        promise.then((resp)=>{
            const users = resp.data;
            commit(types.USER_ALL,users);
            resolve(resp)
        }).catch((err)=>{
            reject(err)
        })
    }),
    [types.USER_DELETE]:({commit},id)=> new Promise((resolve,reject)=>{
        let promise = api.user.remove(state.allUsers[id]._id);
        promise.then((resp)=>{
            commit(types.USER_DELETE,id);
            commit(types.UI_ALERT_SHOW,{type:'success',message:'Пользователь удален!'});
            resolve(resp)
        }).catch((err)=>{
            reject(err)
        })
    }),
};
const mutations = {
    [types.USER_CREATE]:(state,user) => {
        state.allUsers = [...state.allUsers,user]
    },
    [types.USER_UPDATE]:(state,user) => {
        let index  = state.allUsers.findIndex((el)=>el._id === user._id);
        state.allUsers.splice(index,1);
        state.allUsers = [...state.allUsers,user];
    },
    [types.USER_ALL]:(state,users)=>{
        state.allUsers = users
    },
    [types.USER_DELETE]:(state,id)=>{
        state.allUsers.splice(id,1);
        state.allUsers = [...state.allUsers];
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};