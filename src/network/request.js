import axios from 'axios'
import store from '../store'
import { Message } from 'element-ui'


export function request(config) {
    const instance = axios.create({
        baseURL: 'http://' + process.env.VUE_APP_API_HOST + ':8002/v1',
        timeout: 5000,
    })

    instance.defaults.crossDomain = true
    instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'; 

    instance.interceptors.request.use(config => {
        const token = store.state.token;
        if (token) {
            config.headers.Authorization = token
        }
        return config;
    }, err => {
        console.log("请求拦截=>", err);
        return err;
    })

    instance.interceptors.response.use(res => {
        // console.log("响应拦截=>", res.data);
        if (res.data.status != 200) {
            Message({
                message: '请求异常:' + res.data.message,
                type: 'warning'
            });
        }
        return res ? res.data : res;
    }, err => {
        console.log(err);
        //打印完整的错误信息
        console.log("响应拦截错误完整信息=>",err.response)
        //也可以在这里对不同的错误码做不同的展示处理
        throw err;
    })

    return instance(config);
}