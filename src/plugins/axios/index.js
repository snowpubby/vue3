
import axios from 'axios';
import {useUserStore} from '@/stores/user.js'; // 假设你有一个Vuex store用于存储token等信息
import { ElMessage } from 'element-plus'; // 或者你使用的其他UI库的消息提示组件



// 创建axios实例并配置基础URL和其他默认设置
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000, // 请求超时时间
});
service.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
service.defaults.headers['clientid'] = import.meta.env.VITE_APP_CLIENT_ID;

// 请求拦截器 - 添加Token等公共请求头
service.interceptors.request.use(
  (config) => {
    const store = useUserStore();
    const token = store.user && store.user.token; // 从Vuex store获取token
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + `${token}`; // 添加Authorization header
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 响应拦截器 - 处理错误码及通用异常
service.interceptors.response.use(
  (response) => {
    const { data } = response;
    if (data.code !== 200) { // 根据实际API返回判断是否成功
      ElMessage.error(data.message || '服务器出错了');
      return Promise.reject(new Error(data.message || 'Error'));
    }
    return data.data || data;
  },
  (error) => {
    const { response } = error;
    if (response && response.status) {
        ElMessage.error(`请求失败：${response.statusText}`);
    } else {
        ElMessage.error('网络异常，请检查您的网络连接');
    }
    return Promise.reject(error);
  },
);

export default service;
