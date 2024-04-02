import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const  useUserStore = defineStore("user", () => {
    const user = reactive({
        token: '',
        info: '',
        menus: [],
        isInitRoute: false
    });

    const setInfo = (info) => {
        user.info = info;
        user.token = info.access_token
    }
    const setMenus = (menus) => {
        user.menus = menus
    }
    const setIsInitRoute = (isInitRoute) => {
        user.isInitRoute = isInitRoute
    }
    return { user, setInfo, setMenus, setIsInitRoute }
}
);
// }, {
//     persist: {
//         storage: localStorage,
//         key: 'user'
//     }
// });