<!-- src/layouts/MainLayout.vue -->
<template>
    <el-container class="common-layout">
        <!-- 头部区域 -->
        <el-header>
            <span>this is header</span>
            <!-- <div>
                <img :src="userAvatar" alt="User Avatar" class="avatar" @click="goToProfile">
                <span class="username">{{ userName }}</span>
                <i class="el-icon-caret-bottom" @click="toggleDropdown"></i>
                <el-dropdown v-model="dropdownVisible" trigger="click">
                    <span class="el-dropdown-link">
                        更多操作
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click="goToProfile">个人中心</el-dropdown-item>
                        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div> -->
        </el-header>

        <!-- 左侧菜单栏 -->
        <el-container>
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <div class="goggle-button" @click="toggleCollapse">|||</div>
                <el-menu active-text-color="#409Eff" background-color="#545c64" text-color="#fff" unique-opened
                    :collapse="isCollapse" :collapse-transition="false" :router="true">
                    <menu-tree :menuItems="menuItems" ></menu-tree>
                </el-menu>
            </el-aside>
            <!-- 右侧内容主体区域 -->
            <el-main>
                <!-- 路由占位符 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import menuTree from '@/components/menuTree.vue';
import { ref } from 'vue';
import { ElHeader, ElMenu, ElMenuItem, ElSlider, ElMain, ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';

interface MenuItem {
    index: string;
    label: string;
    icon: string;
    children: MenuItem[];
    path: string;
}

const menuItems: MenuItem[] = [{
    index: '125',
    label: '用户管理',
    icon: 'iconfont icon-users',
    children: [{
        index: '125-1',
        label: '用户列表',
        icon: 'iconfont icon-users',
        path: '/user/list',
        children: []
    }],
    path: ''
}, {
    index: '125',
    label: '需求管理',
    icon: 'iconfont icon-requirements',
    children: [],
    path: ''
}]; // 填充菜单数据
const activeMenuIndex = ref('');
const dropdownVisible = ref(false);
const userAvatar = ref('https://sqt-1259302042.cos.ap-guangzhou.myqcloud.com/09fcafa6faa84602ada0eb371bf9da86.jpg'); // 用户头像地址
const userName = ref('黄继锋同学'); // 用户名
const isCollapse = ref(false);
const iconsObj = ref({
        125: 'iconfont icon-users',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      })// 字体图标对象

// 获取菜单数据、用户信息的方法应当从实际的后台接口或者全局状态管理中获取

// 处理菜单选择事件
function handleMenuSelect(index: string) {
    activeMenuIndex.value = index;
    // 这里可以配合 vue-router 更新路由
}

// 跳转到个人中心页面
function goToProfile() {
    // 路由跳转到个人中心
}

function toggleCollapse() {
    isCollapse.value = !isCollapse.value;
}

// 注销登录
function logout() {
    // 调用注销登录方法
}

// 控制下拉菜单显示隐藏
function toggleDropdown() {
    dropdownVisible.value = !dropdownVisible.value;
}
</script>

