<script setup>
import { inject } from 'vue';

const web = inject('web');
const sex = inject('sex');
const updateUser = inject('updateUser');
</script>
<template>
    <hr>
    <h4>I'm header item</h4>
    name: {{ web.name }}<br>
    age: {{ web.age }}
    sex: {{ sex }}
    <button @click="updateUser">更新用户信息</button>
</template>