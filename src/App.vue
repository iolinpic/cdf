<template>
  <v-app>
    <v-navigation-drawer
            v-model="drawer"
            fixed
            v-if="auth"
            app
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-badge overlap color="red">
<!--                <span slot="badge" v-if="notifyCount>0">{{notifyCount}}</span>-->
                <v-icon color="blue-grey">account_circle</v-icon>
              </v-badge>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{username}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list dense>
        <v-list-tile :to="{name:menuItem.path}" :exact="menuItem.exact" v-for="(menuItem,index) in menu"
                     :key="'menu_'+index">
          <v-list-tile-action>
            <v-icon>{{menuItem.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{menuItem.title}}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click.stop="logout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Выйти</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
<!--      <v-list three-line v-if="notifyCount!==0">-->
<!--        <v-divider></v-divider>-->
<!--        <v-subheader>Уведомления</v-subheader>-->
<!--        <notification :notification="notify" v-for="notify in notifications"-->
<!--                      :key="'notification_'+notify.id"></notification>-->
<!--      </v-list>-->
    </v-navigation-drawer>
    <v-toolbar flat app color="white" ref="mainToolbar" :tabs="toolbarShow" v-if="auth">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{pageTitle}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-if="showBtns">
        <v-btn v-for="(btn,index) in btns" :key="'button_'+index" @click="btn.click" :icon="btn.text===''">
          <v-icon dark v-if="btn.icon!==''">{{btn.icon}}</v-icon>{{btn.text}}
        </v-btn>
      </template>
      <template v-slot:extension v-if="toolbarShow">
        <v-tabs
                v-model="toolbarTab"
                show-arrows
                grow
        >
          <v-tabs-slider ></v-tabs-slider>
          <v-tab
                  v-for="item in toolbarItems"
                  :key="item.name"
          >
            {{ item.name }}
          </v-tab>
        </v-tabs>
      </template>

    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-snackbar
            v-model=showAlert
            :timeout="6000"
            :color="alert.type"
            top
            right
    >{{alert.message}}
      <v-btn
              dark
              flat
              @click="showAlert = false"
      >
        Закрыть
      </v-btn>
    </v-snackbar>
  </v-app>
</template>
<script>
  import * as types from "./store/mutation-types.js"
  import menu from "./config/menu"
  // import notification from '@/components/notifications';

  export default {
    name: 'App',
    data() {
      return {
      }
    },
    // components: {
    //   notification
    // },
    computed: {
      toolbarItems(){
        return this.$store.getters.toolbarItems;
      },
      toolbarTab:{
        get(){
          return this.$store.getters.toolbarIndex;
        },
        set(v){
          this.$store.commit(types.UI_TOOLBAR_TAB,v);
        }
      },
      toolbarShow(){
        return this.$store.getters.toolbarShow;
      },
      showBtns(){
        return this.$store.getters.toolbarBtnsShow;
      },
      btns(){
        return this.$store.getters.toolbarBtns;
      },
      pageTitle(){
        return this.$store.getters.uiTitle;
      },
      menu() {
        return menu.filter((item) => this.$can(item.permission, 'api'));
      },
      alert() {
        return this.$store.getters.uiAlert;
      },
      showAlert: {
        get() {
          return this.$store.getters.uiAlertShow;
        },
        set(v) {
          if (!v) {
            this.$store.commit(types.UI_ALERT_HIDE)
          }
        },
      },
      drawer:{
        get(){
          return this.$store.getters.uiSidebarL;
        },
        set(v){
          this.$store.commit(types.UI_LEFT_SIDEBAR,v);
        }
      },
      auth() {
        return this.$store.getters.isAuthenticated;
      },
      username() {
        return this.$store.getters.uName;
      },
      // notifications() {
      //   return this.$store.getters.uNotifications;
      // },
      // notifyCount() {
      //   return this.notifications.length;
      // },
    },
    metaInfo: {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: 'YUSdoc',
      // all titles will be injected into this template
      titleTemplate: '%s | YUSdoc',
      changed (newInfo) {
        this.$store.commit(types.UI_TITLE,newInfo.titleChunk);
      }
    },
    methods: {
      logout() {
        this.$store.dispatch(types.AUTH_LOGOUT).then(() => {
          this.$router.push('/login')
        })
      },
    },
  }
</script>

<!--<style lang="scss">-->
<!--  /*@import '~vuetify/dist/vuetify.min.css';*/-->
<!--</style>-->
