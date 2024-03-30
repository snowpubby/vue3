<template>
    <hr>
    <h3>this is pinia counter</h3>
    <div>count: {{ cs.count }}</div>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <hr>
</template>
<script setup>
import {useCounterStore} from '@/stores/counter.js'
const cs = useCounterStore()
const increment = () => {
    cs.increment()
}
const decrement = () => {
    cs.decrement()
}
</script>