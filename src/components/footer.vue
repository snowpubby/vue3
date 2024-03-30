<script setup>
 const web = defineProps({
    name: String,
    age: Number
});
 console.log(web)
</script>
<template>
    <hr>
    <h4>I'm footer</h4>
    name: {{ web.name }}<br>
    age: {{ web.age }}
</template>