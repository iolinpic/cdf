import * as types from './mutation-types'
import api from '../api'
// import {setupEcho} from "@/config/interceptors";

const state = {
    currentUser:{},
    // currentPermissions:[],
    allUsers:[],
};
const getters = {
    uName: state => state.currentUser['name'] || 'Not Logged',
    uId:state=> state.currentUser['id']||0,
    // uNotifications: state => state.currentUser['unread_notifications']||[],
    // uPermissions:state=>state.currentUser['permissions']||['no permissions'],
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
            // console.log('User creation failed');
            reject(err)
        })
    }),
    // [types.USER_EDIT]:({commit},payload)=> new Promise((resolve,reject)=>{
    //     let promise = api.user.edit(payload,payload.id);
    //     promise.then((resp)=>{
    //         const user = resp.data;
    //         commit(types.USER_EDIT,user);
    //         commit(types.UI_ALERT_SHOW,{type:'success',message:'Пользователь '+resp.data.name+' изменен!'});
    //         resolve(resp)
    //     }).catch((err)=>{
    //         console.log('User edit failed');
    //         reject(err)
    //     })
    // }),
    [types.USER_CURRENT]:({commit})=> new Promise((resolve,reject)=>{
        let promise = api.user.user();
        promise.then((resp)=>{
            const user = resp.data;
            commit(types.USER_CURRENT,user);
            // setupEcho();
            resolve(resp)
        }).catch((err)=>{
            // console.log("Current user failed to acquire");
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
            // console.log('Error getting all users');
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
            // console.log("Deleting failed");
            reject(err)
        })
    }),
};
const mutations = {
    [types.USER_CREATE]:(state,user) => {
        state.allUsers = [...state.allUsers,user]
    },
    [types.USER_ALL]:(state,users)=>{
        state.allUsers = users
    },
    [types.USER_CURRENT]:(state,user)=>{
        state.currentUser = user
    },
    [types.USER_DELETE]:(state,id)=>{
        state.allUsers.slice(id,1);
        state.allUsers = [...state.allUsers];
    },
    // [types.USER_EDIT]:(state,user)=>{
    //     let id =state.allUsers.findIndex(el=>el.id === user.id);
    //     state.allUsers[id] = user;
    //     state.allUsers = [...state.allUsers];
    // },
};

export default {
    state,
    getters,
    actions,
    mutations,
};