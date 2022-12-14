import axios from 'axios';

const baseURL = 'http://localhost/blog';

export const api = axios.create({
  baseURL,
  timeout: 8000,
});

export const post = async (url: string, data: Record<string | number, any>) => {
  return axios.post(`${baseURL}${url}`, data, {
    headers: { withCredentials: true },
  });
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
  return axios.get(realUrl, {
    headers: { withCredentials: true },
  });
};
