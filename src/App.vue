<template>
    <v-app>
        <v-navigation-drawer
                v-model="drawer"
                fixed
                v-if="auth"
                app
        >
            <v-toolbar class="transparent" color="blue-grey">
                <v-list>
                    <v-list-item>
                        <v-list-item-avatar>
                            <v-icon color="white">account_circle</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title class="white--text">{{username}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-toolbar>
            <v-list dense>
                <v-list-item :to="{name:menuItem.path}" :exact="menuItem.exact" v-for="(menuItem,index) in menu"
                             :key="'menu_'+index">
                    <v-list-item-icon>
                        <v-icon>{{menuItem.icon}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{menuItem.title}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click.stop="logout" link>
                    <v-list-item-action>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Выйти</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar ref="mainToolbar" :tabs="toolbarShow" v-if="auth"
                   app
                   clipped-right
                   color="blue-grey"
                   dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="white--text">{{pageTitle}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <template v-if="showBtns">
                <v-btn v-for="(btn,index) in btns" :key="'button_'+index" @click="btn.click" :icon="btn.text===''">
                    <v-icon dark v-if="btn.icon!==''">{{btn.icon}}</v-icon>
                    {{btn.text}}
                </v-btn>
            </template>
            <template v-slot:extension v-if="toolbarShow">
                <v-tabs
                        v-model="toolbarTab"
                        show-arrows
                        grow
                >
                    <v-tabs-slider></v-tabs-slider>
                    <v-tab
                            v-for="item in toolbarItems"
                            :key="item.name"
                    >
                        {{ item.name }}
                    </v-tab>
                </v-tabs>
            </template>
        </v-app-bar>
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
    export default {
        name: 'App',
        metaInfo() {
            return {
                title: 'Crysmo-dialogs',
                titleTemplate: '%s | Crysmo-dialogs',
                changed: (newInfo) => {
                    this.$store.commit(types.UI_TITLE, newInfo.titleChunk);
                }
            }
        },
        computed: {
            toolbarItems() {
                return this.$store.getters.toolbarItems;
            },
            toolbarTab: {
                get() {
                    return this.$store.getters.toolbarIndex;
                },
                set(v) {
                    this.$store.commit(types.UI_TOOLBAR_TAB, v);
                }
            },
            toolbarShow() {
                return this.$store.getters.toolbarShow;
            },
            showBtns() {
                return this.$store.getters.toolbarBtnsShow;
            },
            btns() {
                return this.$store.getters.toolbarBtns;
            },
            pageTitle() {
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
            drawer: {
                get() {
                    return this.$store.getters.uiSidebarL;
                },
                set(v) {
                    this.$store.commit(types.UI_LEFT_SIDEBAR, v);
                }
            },
            auth() {
                return this.$store.getters.isAuthenticated;
            },
            username() {
                return this.$store.getters.uName;
            },
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
