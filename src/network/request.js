import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'


export function request(config) {
    const instance = axios.create({
        baseURL: 'http://' + process.env.VUE_APP_API_HOST + ':8002/v1',
        timeout: 30000,
    })

    instance.defaults.crossDomain = true
    instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'; 

    instance.interceptors.request.use(config => {
        const token = sessionStorage.getItem('token');
        console.log('request token is ', token)
        if (token) {
            config.headers.AuthToken = token
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
            if (res.data.status == 401) {
                sessionStorage.clear()
                router.push({path: '/'})
            }
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