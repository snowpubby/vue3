import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';
import {useUserStore} from '@/stores/user.js'
import {getRouters} from '@/api/index.js'

const routeList = [
    {
        path: '/',
        component: () => import('@/views/Layout.vue'),
    },{
        path: '/login',
        component: () => import('@/views/login.vue')
    }
]
const router = createRouter({
    //
    history: createWebHashHistory(),
    routes:routeList
})
router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();
    if (to.path === '/login') {
        console.log('跳转到login')
        next();
    } else if (typeof(userStore.user.token)=='undefined' || userStore.user.token == "") {
        console.log('token不存在，跳转到login')
        next({path: '/login', query:{redirect: to.fullPath}});
    } else {
        console.log('跳转到:', to.fullPath)
        //加载路由菜单
        console.log('isInitRoute', userStore.user.isInitRoute)
        if (!userStore.user.isInitRoute) {
            console.log('加载路由菜单')
            await initRoute()
            userStore.setIsInitRoute(true)
            next({...to, replace: true})
        } else {
            next()
        }
    }
})
const initRoute = async () => {
    const routes = await getRouters()
    //添加到router
    //添加侧边菜单栏
    console.log('添加菜单栏')
    const route0 = routes[0]

    router.addRoute({
        path: route0.path,
        name: route0.name,
        component: () => import(`@/views/${route0.component}.vue`)
    });
    console.log('添加成功')
};
export default router;