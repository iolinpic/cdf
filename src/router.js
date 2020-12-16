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
            component: () => import(/* webpackChunkName: "condition" */ './views/Conditions/Index.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        {
            path: '/conditions/create',
            name: 'conditions.create',
            component: () => import(/* webpackChunkName: "conditionCreate" */ './views/Conditions/Create.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        {
            path: '/conditions/:id',
            name: 'conditions.edit',
            component: () => import(/* webpackChunkName: "conditionEdit" */ './views/Conditions/Edit.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        {
            path: '/abilities',
            name: 'abilities',
            component: () => import(/* webpackChunkName: "ability" */ './views/Abilities/index.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        {
            path: '/abilities/create',
            name: 'abilities.create',
            component: () => import(/* webpackChunkName: "abilityCreate" */ './views/Abilities/create.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        {
            path: '/abilities/:id',
            name: 'abilities.edit',
            component: () => import(/* webpackChunkName: "abilityEdit" */ './views/Abilities/edit.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        {
            path: '/actors',
            name: 'actors',
            component: () => import(/* webpackChunkName: "actor" */ './views/Actor/index.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        {
            path: '/actors/create',
            name: 'actors.create',
            component: () => import(/* webpackChunkName: "actorCreate" */ './views/Actor/create.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        {
            path: '/actors/:id',
            name: 'actors.edit',
            component: () => import(/* webpackChunkName: "actorEdit" */ './views/Actor/edit.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        {
            path: '/dialogs',
            name: 'dialogs',
            component: () => import(/* webpackChunkName: "dialog" */ './views/Dialog/index.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        {
            path: '/dialogs/create',
            name: 'dialogs.create',
            component: () => import(/* webpackChunkName: "dialogCreate" */ './views/Dialog/create.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        {
            path: '/dialogs/:id',
            name: 'dialogs.edit',
            component: () => import(/* webpackChunkName: "dialogEdit" */ './views/Dialog/edit.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        {
            path: '/zones',
            name: 'zones',
            component: () => import(/* webpackChunkName: "zone" */ './views/Zone/index.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        {
            path: '/zones/create',
            name: 'zones.create',
            component: () => import(/* webpackChunkName: "zoneCreate" */ './views/Zone/create.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        {
            path: '/zones/:id',
            name: 'zones.edit',
            component: () => import(/* webpackChunkName: "zoneEdit" */ './views/Zone/edit.vue'),
            beforeEnter: hooks.ifAuthenticated
        },{
            path: '/quests',
            name: 'quests',
            component: () => import(/* webpackChunkName: "quest" */ './views/Quest/index.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        {
            path: '/quests/create',
            name: 'quests.create',
            component: () => import(/* webpackChunkName: "questCreate" */ './views/Quest/create.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        {
            path: '/quests/:id',
            name: 'quests.edit',
            component: () => import(/* webpackChunkName: "questEdit" */ './views/Quest/edit.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        {
            path: '/crysm',
            name: 'crysm',
            component: () => import(/* webpackChunkName: "crysm" */ './views/Crysm/index.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        {
            path: '/crysm/create',
            name: 'crysm.create',
            component: () => import(/* webpackChunkName: "crysmCreate" */ './views/Crysm/create.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        // {
        //     path: '/crysm/evolve/:id',
        //     name: 'crysm.evolve',
        //     component: () => import(/* webpackChunkName: "crysmCreate" */ './views/Crysm/create.vue'),
        //     beforeEnter: hooks.ifAuthenticated
        // },
        {
            path: '/crysm/:id',
            name: 'crysm.edit',
            component: () => import(/* webpackChunkName: "crysmEdit" */ './views/Crysm/edit.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        {
            path: '/pack',
            name: 'pack',
            component: () => import(/* webpackChunkName: "pack" */ './views/APack/index.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        {
            path: '/pack/create',
            name: 'pack.create',
            component: () => import(/* webpackChunkName: "packCreate" */ './views/APack/create.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        {
            path: '/pack/:id',
            name: 'pack.edit',
            component: () => import(/* webpackChunkName: "packEdit" */ './views/APack/edit.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        {
            path: '/spack',
            name: 'spack',
            component: () => import(/* webpackChunkName: "spack" */ './views/SPack/index.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        {
            path: '/spack/create',
            name: 'spack.create',
            component: () => import(/* webpackChunkName: "spackCreate" */ './views/SPack/create.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        {
            path: '/spack/:id',
            name: 'spack.edit',
            component: () => import(/* webpackChunkName: "spackEdit" */ './views/SPack/edit.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        {
            path: '/item',
            name: 'item',
            component: () => import(/* webpackChunkName: "item" */ './views/Items/index.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        {
            path: '/item/create',
            name: 'item.create',
            component: () => import(/* webpackChunkName: "itemCreate" */ './views/Items/create.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        {
            path: '/item/:id',
            name: 'item.edit',
            component: () => import(/* webpackChunkName: "packEdit" */ './views/Items/edit.vue'),
            beforeEnter: hooks.ifAuthenticated
        },
        {
            path: '/draw',
            name: 'draw',
            component: () => import(/* webpackChunkName: "draw" */ './views/Draw.vue'),
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
