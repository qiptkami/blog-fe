import axios from "axios";

const baseURL = "http://127.0.0.1:80/blog";

export const api = axios.create({
  baseURL,
  timeout: 8000,
});

export const post = async (url: string, data: Record<string | number, any>) => {
  axios
    .post(`${baseURL}${url}`, data, {
      headers: { withCredentials: true }, //withCredentials 跨域问题
    })
    .then((response) => {
      if (response.data.status) {
        return false;
      }
      return response.data || true;
    });
};

export const get = async (
  url = "",
  data: Record<string | number, any> = {}
) => {
  let realUrl = baseURL + url;
  Object.keys(data).forEach((item, index) => {
    if (index === 0) {
      realUrl += `?${item}=${data[item]}`;
    } else {
      realUrl += `&${item}=${data[item]}`;
    }
  });
  axios
    .get(realUrl, {
      headers: { withCredentials: true },
    })
    .then((response) => {
      return response.data.data || true;
    });
};
