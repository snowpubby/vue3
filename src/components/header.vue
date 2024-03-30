<script setup>
import { reactive } from 'vue';

const web = reactive({ name: 'web', age: 18 })
</script>
<template>
    <hr>
    <h4>I'm header</h4>
    name: {{ web.name }}<br>
    age: {{ web.age }}

    <br>
</template>