import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';
const routeList = [
    {
        path: '/',
        alias:["/home","/index"],
        component: () => import('@/views/index.vue'),
    },{
        path: '/login',
        component: () => import('@/views/login.vue')
    },{
        path: '/content',
        component: () => import('@/views/content.vue'),
    },{
        path: "/user/:id/name/:name",
        component: () => import('@/views/user.vue'),
    },{
        path: "/userHistory/:id/name/:name?",
        name: "history",
        component: () => import('@/views/user.vue'),
    },{
        path: '/vip',
        component: () => import('@/views/vip.vue'),
        children: [//子路由
        {
            path: '',//默认页
            component: () => import('@/views/vip/default.vue')
        },{
            path: 'list',//列表页
            component: () => import('@/views/vip/list.vue')
        },{
            path: 'detail',//详情页
            component: () => import('@/views/vip/detail.vue')
        }
    ]
    }
]
const router = createRouter({
    //
    history: createWebHashHistory(),
    routes:routeList
})
export default router;