<template>
    <el-form :model="loginForm" label-width="auto" style="max-width:600px">
        <el-form-item label="手机号">
            <el-input v-model="loginForm.phone"/>
        </el-form-item>
        <el-form-item label="密码">
            <el-input type="password" v-model="loginForm.password"/>
        </el-form-item>
        <el-form-item label="验证码">
            <el-input v-model="loginForm.code"/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onLogin">登录</el-button>
            <el-button type>取消</el-button>
        </el-form-item>
    </el-form>
</template>
<script setup>
import { reactive } from 'vue';
import request from '@/plugins/axios'
import {useUserStore} from '@/stores/user.js'

const loginForm = reactive({
    phone: '13570215272',
    password: 'K/WyMQ4rAKlM3VV+iXZbdiGtouqwV6zuX1CHViJr+GWScUB8W66FedS8b8ksi4gifgE5unBYajTNdaQuoEH/W7dJ8Jhq+wQB9pv09/Mq9cH8JSiFgh3PQkmtdJq6kSNK+BS7YjxDjO48SwOkjwLu3O2uph6EA8SjG7RWuwc4SQk=',
    code: '1'
})

const onLogin = async () => {
    let zones = await request.post('/op/getZonesByPhone', loginForm)
    let cur = zones.zone[0]
    let all = zones.firstZones
    let {token} = await request.post('/op/login', null, {
        params: {
            username: loginForm.phone + '-zoneId-' + cur.id + '-pwd-' + loginForm.password,
            password: loginForm.password
        }
    })
    const userStore = useUserStore()
    userStore.setToken(token)
    userStore.setZones(all)
}   

</script>