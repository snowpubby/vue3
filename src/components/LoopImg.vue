<script setup>
import { reactive, ref } from 'vue';
const num = ref(0);
const prex = () => {
    if (num.value == 0) {
        num.value = 4
    } else {
        num.value--
    }
}
const next = () => {
    if (num.value < 4) {
        num.value++
    } else {
        num.value = 0
    }
}
const images = reactive([
    { url: new URL('@/assets/images/1.jpg', import.meta.url).href },
    { url: new URL('@/assets/images/2.jpg', import.meta.url).href },
    { url: new URL('@/assets/images/3.jpg', import.meta.url).href },
    { url: new URL('@/assets/images/4.jpg', import.meta.url).href },
    { url: new URL('@/assets/images/5.jpg', import.meta.url).href },
])
</script>
<template>
    <p>循环轮播图片，当前序号num: {{ num }}</p>
    <img :src="images[num].url" alt="" style="width:300px;height: 300px;">
    <!-- <img src="@/images/1.jpg" alt="" style="width:300px;height: 300px;"> -->
    <br>
    <div>
        <button @click="prex">prex</button>
        <button @click="next">next</button>
    </div>
</template>