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
        router.push({ path: redirect })
    } else {
        router.push({ path: '/' })
    }
    // userStore.setToken(token)
    // userStore.setZones(all)
}

</script>
<!-- 在 LoginPage.vue 中的 <style scoped> 标签内添加以下样式 -->
<style scoped>
/* 容器类样式，居中显示 */
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f2f5;
    /* 背景颜色可以根据主题调整 */
}

/* 表单样式 */
.el-form {
    width: 300px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 24px;
    background-color: #ffffff;
}

/* 输入框样式 */
.el-form-item {
    margin-bottom: 20px;
}

.el-input {
    width: 100%;
}

/* 登录按钮样式 */
.el-form-item:last-child {
    text-align: right;
}

.el-button {
    width: 100%;
    height: 42px;
    border-radius: 4px;
    font-size: 16px;
    color: #fff;
    background-color: #409eff;
    border: none;
    cursor: pointer;
}

.el-button:hover {
    background-color: #2a85e8;
}

/* 错误提示信息样式 */
.el-form-item__error {
    color: #ff4949;
}
</style>