import * as types from './mutation-types'

const state = {
    ui:{
        leftSidebar:true,
        alert:{
            show:false,
            type:'success',
            message:'This is a success alert.',
        },
        title:'',
        toolbar:{
            btns:[],
        },
    }
};
const getters = {
    uiSidebarL:state=> state.ui.leftSidebar,
    uiAlert:state=> state.ui.alert,
    uiAlertShow:state => state.ui.alert.show,
    uiTitle:state=>state.ui.title,
    toolbarBtns:state=>state.ui.toolbar.btns,
    toolbarBtnsShow:state=>state.ui.toolbar.btns.length>0,
};
const actions = {
};
const mutations = {
    [types.UI_ALERT_SHOW]:(state,payload)=>{
        state.ui.alert.show = true;
        state.ui.alert.type = payload.type;
        state.ui.alert.message = payload.message;
    },
    [types.UI_ALERT_HIDE]:(state)=>{
        state.ui.alert.show = false;
        state.ui.alert.type = "success";
        state.ui.alert.message = "";
    },
    [types.UI_LEFT_SIDEBAR]:(state,payload)=>{
        state.ui.leftSidebar = payload;
    },
    [types.UI_TITLE]:(state,payload)=>{
        state.ui.title = payload;
    },
    [types.UI_TOOLBAR_BTNS]:(state,payload)=>{
        state.ui.toolbar.btns = payload;
    },
    [types.UI_TOOLBAR_BTNS_CLEAR]:(state)=>{
        state.ui.toolbar.btns = [];
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
};