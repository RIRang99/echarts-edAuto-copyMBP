import axios from 'axios';

// 创建 Axios 实例
const api = axios.create({
  // baseURL: 'http://192.168.1.155:8083/api/apc/user/data_manager', 
  baseURL: 'http://127.0.0.1:8083/api/apc/user/data_manager',
  timeout: 5000, // 设置请求超时时间
});

// 请求拦截器
api.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
);

// 封装 GET 方法
export const get = (url, params) => {
  return api.get(url, { params });
};

// 封装 POST 方法
export const post = (url, data) => {
  return api.post(url, data);
};

export default api;
