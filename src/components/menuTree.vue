<template>
    <div>
        <template v-for="item in props.menuItems" :key="item.path">
            <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 0">
                <template #title>
                    <span>{{ item.label }}</span>
                </template>
                <menuTree :menuItems="item.children" />
            </el-sub-menu>
            <el-menu-item :index="item.path" v-if="!item.children || item.children.length == 0">
                <span>{{ item.label }}</span>
            </el-menu-item>
        </template>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    menuItems: Array
})
</script>
