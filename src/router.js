import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import hooks from "./config/routes"

Vue.use(Router);
const router =new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            beforeEnter: hooks.ifAuthenticated,
            redirect: '/users',
        },
        {
            path: '/users',
            name: 'users',
            component: () => import(/* webpackChunkName: "users" */ './views/Users/Users.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        {
            path: '/users/create',
            name: 'users.create',
            component: () => import(/* webpackChunkName: "users" */ './views/Users/Create.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        {
            path: '/users/:id',
            name: 'users.edit',
            component: () => import(/* webpackChunkName: "users" */ './views/Users/Edit.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        {
            path: '/conditions',
            name: 'conditions',
            component: () => import(/* webpackChunkName: "users" */ './views/Conditions/Index.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        {
            path: '/conditions/create',
            name: 'conditions.create',
            component: () => import(/* webpackChunkName: "users" */ './views/Conditions/Create.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        {
            path: '/conditions/:id',
            name: 'conditions.edit',
            component: () => import(/* webpackChunkName: "users" */ './views/Conditions/Edit.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        {
            path: '/login',
            name: 'login',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "login" */ './components/Login.vue'),
            beforeEnter: hooks.ifNotAuthentificated,
        },

        {
            path:'/404',
            name:'notFound',
            component: () => import(/* webpackChunkName: "404" */ './components/NotFound.vue'),
        },
        {
            path:'*',
            redirect: '/404',
        },
    ]
});
// router.beforeEach(hooks.titleBeforeEach);
export default router;
