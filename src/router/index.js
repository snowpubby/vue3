import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';
import {useUserStore} from '@/stores/user.js'
import {getRouters} from '@/api/index.js'
// 匹配views里面所有的.vue文件
const modules = import.meta.glob('@/views/**/*.vue');

const routeList = [
    {
        path: '/',
        component: () => import('@/views/Layout.vue'),
        children: [
            {
                path: '',
                component: () => import(`@/views/home.vue`)
            }
        ]
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
let dynamicRoutes = [];
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
        if (!userStore.user.isInitRoute || dynamicRoutes.length == 0) {
            userStore.setIsInitRoute(false)
            console.log('加载路由菜单')
            await initDyamicRoute()
            userStore.setIsInitRoute(true)
            next({...to, replace: true})
        } else {
            next()
        }
    }
})
const route2router = (r, prefix) => {
    //循环遍历转换路由
    if (r.path.startsWith('http')) {
        return null;
    }
    return {
        path: prefix + r.path,
        name: r.name,
        component: loadView(r.component),
        meta: r.meta,
        children: r.children && r.children.length > 0 ? r.children.map((r1) => route2router(r1,  prefix + r.path + '/')) : []
    };
}
const route2menu = (r,prefix) => {
    return {
        index: r.name,
        label: r.meta?.title ?? r.name,
        icon: r.meta?.icon ?? '',
        path: prefix + r.path,
        children: r.children && r.children.length > 0 ? r.children.map((r1) => route2menu(r1, prefix + r.path + '/')) : []
    }
}
const initDyamicRoute = async () => {
    const routes = await getRouters()
    //添加到router
    routes.forEach((r) => {
        let r1 = route2router(r, "")
        if (r1 !== null) {
            router.addRoute(r1);
        }
    })
    dynamicRoutes = router.getRoutes()
    console.log('所有路由：',router.getRoutes())
    console.log('添加路由成功')
    //添加菜单栏
    let menus = [{
        index: '/',
        label: '首页',
        icon: '',
        path: '/',
        children: []
    }]
    
    routes.forEach((r) => {
        menus.push(route2menu(r,""))
    })
    useUserStore().setMenus(menus)
};
const loadView = (view) => {
  let res;
  for (const path in modules) {
    const dir = path.split("views/")[1].split(".vue")[0];
    if (dir === view) {
      res = () => modules[path]();
    }
  }
  return res;
};
export default router;