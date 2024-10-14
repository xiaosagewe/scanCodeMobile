import axios from 'axios';
import { Notify } from 'vant';

let loadingInstance;

// 处理 code 异常
const handleErrorCode = (code, msg) => {
  switch (code) {
    case 401:
      Notify({ type: 'danger', message: msg || '登录失效' });
      break;
    case 403:
      break;
    case 404:
      Notify({ type: 'danger', message: '接口请求地址错误' });
      break;
    case 500:
      Notify({ type: 'danger', message: '接口错误' });
      break;
    default:
      Notify({ type: 'danger', message: msg || `后端接口${code}异常` });
      break;
  }
};

// axios 初始化
const instance = axios.create({
  baseURL: '/api',
  timeout: 60 * 1000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

// axios 请求拦截器
instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// axios 响应拦截器
instance.interceptors.response.use(
  response => {
    if (loadingInstance) loadingInstance.close();
    const { data, config } = response;
    const { code, msg } = data;
    if (response.status === 200) {
      return data;
    } else {
      handleErrorCode(code, msg);
      return Promise.reject(
        '请求异常拦截:' + JSON.stringify({ url: config.url, code, msg }) || 'Error'
      );
    }
  },
  error => {
    if (loadingInstance) loadingInstance.close();
    const { response, message } = error;
    if (error.response && error.response.data) {
      const { status, data } = response;
      handleErrorCode(status, data.msg || message);
      return Promise.reject(error);
    } else {
      let { message } = error;
      if (message === 'Network Error') {
        message = '后端接口连接异常';
      }
      if (message.includes('timeout')) {
        message = '后端接口请求超时';
      }
      if (message.includes('请求失败, 请重试')) {
        const code = message.substr(message.length - 3);
        message = '后端接口' + code + '异常';
      }
      return Promise.reject(error);
    }
  }
);

export default instance;
