import axios from 'axios'

export function request(config){
    const instance = axios.create({
        // 'http://123.207.32.32:8000'
        // baseURL:process.env.VUE_APP_WEB_URL,
        baseURL:"http://152.136.185.210:8000/api/n3",
        timeout:5000
    })

    // 请求拦截
    instance.interceptors.request.use(config =>{
        /*
        使用
            1、比如config中的一些信息不符合服务器要求
            2、发送网络请求时，显示请求图标
            3、某些网络请求，必须携带token
        */
        return config
    },err=>{
        console.log(err + '请求拦截报错')
    })
    // 响应结果拦截，把没有必要axios自带的结果拦截，只返回data。
    instance.interceptors.response.use(res =>{
        return res.data
    },err =>{
        console.log(err + '响应拦截报错')
    })


    // 发送网络请求
    return instance(config)

}