<template>
    <div>
        <h3>this is system/user/index.vue</h3>
    </div>
    <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column label="用户编号" align="center" key="userId" prop="userId" />
        <el-table-column label="用户名称" align="center" key="userName" prop="userName" 
            :show-overflow-tooltip="true" />
        <el-table-column label="用户昵称" align="center" key="nickName" prop="nickName" 
            :show-overflow-tooltip="true" />
        <el-table-column label="部门" align="center" key="deptName" prop="dept.deptName" 
            :show-overflow-tooltip="true" />
        <el-table-column label="手机号码" align="center" key="phonenumber" prop="phonenumber" 
            width="120" />
        <el-table-column label="状态" align="center" key="status" >
            <template #default="scope">
                <el-switch v-model="scope.row.status" active-value="0" inactive-value="1"
                    @change="handleStatusChange(scope.row)"></el-switch>
            </template>
        </el-table-column>

        <el-table-column label="创建时间" align="center" prop="createTime" width="160">
            <template #default="scope">
                <span>{{ scope.row.createTime }}</span>
            </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" width="180" class-name="small-padding fixed-width">
            <template #default="scope">
                <el-tooltip content="修改" placement="top" v-if="scope.row.userId !== 1">
                    <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"
                        ></el-button>
                </el-tooltip>
                <el-tooltip content="删除" placement="top" v-if="scope.row.userId !== 1">
                    <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"
                        ></el-button>
                </el-tooltip>

                <el-tooltip content="重置密码" placement="top" v-if="scope.row.userId !== 1">
                    <el-button link type="primary" icon="Key" @click="handleResetPwd(scope.row)"
                        ></el-button>
                </el-tooltip>

                <el-tooltip content="分配角色" placement="top" v-if="scope.row.userId !== 1">
                    <el-button link type="primary" icon="CircleCheck" @click="handleAuthRole(scope.row)"
                        ></el-button>
                </el-tooltip>
            </template>
        </el-table-column>
    </el-table>
</template>
<script setup>
import { ref,reactive } from 'vue';
const handleAuthRole = (row) => {};
const handleResetPwd = (row) => {};
const handleDelete = (row) => {};
const handleUpdate = (row) => {};
const handleStatusChange = (row) => {};
const userList = reactive([{
    userId:1,
    userName:"hjf",
    nickName:"hjf",
    dept:{
        deptName:"hjf"
    },
    phonenumber:"12345678901",
    status:"0"
}]);
</script>