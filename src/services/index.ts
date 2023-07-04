import axios from 'axios';

const baseURL = 'http://localhost:8001';

export const api = axios.create({
  baseURL,
  timeout: 8000,
  headers: { 'Access-Control-Allow-Origin': '*' },
});

// 添加请求拦截器
api.interceptors.request.use(
  (config: any) => {
    const token = window.localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error: any) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 406) {
      window.location.href = '/admin/login';
      window.localStorage.removeItem('userInfo');
      window.localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export const post = async (url: string, data: Record<string | number, any>) => {
  return api.post(`${baseURL}${url}`, data);
};

export const get = async (
  url = '',
  data: Record<string | number, any> = {}
) => {
  let realUrl = baseURL + url;
  Object.keys(data).forEach((item, index) => {
    if (item === 'id') {
      realUrl += `/${data[item]}`;
    }
    if (index === 0) {
      realUrl += `?${item}=${data[item]}`;
    } else {
      realUrl += `&${item}=${data[item]}`;
    }
  });
  return api.get(realUrl);
};
