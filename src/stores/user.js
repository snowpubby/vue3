import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const  useUserStore = defineStore("user", () => {
    const user = reactive({
        token: '',
        info: '',
        zones: []
    });

    const setToken = (token) => {
        user.token = token;
    };
    const setInfo = (info) => {
        user.info = info;
    }
    const setZones = (zones) => {
        user.zones = zones;
    }
    return { user, setToken, setInfo, setZones }

}, {
    persist: {
        storage: localStorage,
        key: 'user'
    }
});