<script setup>
import { provide, reactive, ref } from 'vue';

const web = reactive({
  name: 'web',
  age: 18
})
</script>

<template>
    <router-view/>
</template>

