<template>
    <div class="login-container">
        <el-form :model="loginForm" label-width="auto">
            <el-form-item label="账号">
                <el-input v-model="loginForm.username" />
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="loginForm.password" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import { reactive, computed, ref } from 'vue';
import { useUserStore } from '@/stores/user.js'
import { login } from '@/api/index.js'
import router from '@/router';
import { useRoute } from 'vue-router'
const redirect = useRoute().query.redirect
console.log('redirect:', redirect)

const loginForm = reactive({
    username: 'admin',
    password: 'admin123',
    "clientId": import.meta.env.VITE_APP_CLIENT_ID,
    "grantType": "password",
})

const onLogin = async () => {
    let resp = await login(loginForm)
    console.log('login resp:', resp)
    const userStore = useUserStore()
    userStore.setInfo(resp)
    userStore.setIsInitRoute(false)
    if (typeof (redirect) !== 'undefined') {
        router.replace({ path: redirect })
    } else {
        router.replace({ path: '/' })
    }
    // userStore.setToken(token)
    // userStore.setZones(all)
}

</script>
