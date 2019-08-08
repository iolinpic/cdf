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
            tab:0,
            tabItems:[],
            btns:[],
        },
    }
};
const getters = {
    uiSidebarL:state=> state.ui.leftSidebar,
    uiAlert:state=> state.ui.alert,
    uiAlertShow:state => state.ui.alert.show,
    uiTitle:state=>state.ui.title,
    toolbarShow:state=>state.ui.toolbar.tabItems.length>0,
    toolbarIndex:state=>state.ui.toolbar.tab,
    toolbarItems:state=>state.ui.toolbar.tabItems,
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
    [types.UI_TOOLBAR_TAB]:(state,payload)=>{
        if(state.ui.toolbar.tabItems.length>payload){
            state.ui.toolbar.tab = payload;
        }
    },
    [types.UI_TOOLBAR_ITEMS]:(state,payload)=>{
        state.ui.toolbar.tabItems = payload
    },
    [types.UI_TOOLBAR_CLEAR]:(state)=>{
        state.ui.toolbar.tab = 0;
        state.ui.toolbar.tabItems = [];
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