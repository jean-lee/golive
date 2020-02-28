import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';


/* ######################################################## 基础配置 ######################################################## */
const URLENCODED_CONTENT_TYPE = {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'};
const JSON_CONTENT_TYPE = {'Content-Type': 'application/json;charset=UTF-8'};

const axios = Axios.create({
  headers: URLENCODED_CONTENT_TYPE,
});

// axios请求参数 接口
interface MyAxiosRequestConfig extends AxiosRequestConfig {
  json?: boolean;
}

// let startTime = 0;
axios.interceptors.request.use((config: MyAxiosRequestConfig) => {
  return config;
}, (error: any) => {
  return Promise.reject(error);
},
);


axios.interceptors.response.use((response: AxiosResponse<LIVESPACE.AjaxResponseType>) => {
  return response;
}, (error: any) => {
  return Promise.reject(error);
});
