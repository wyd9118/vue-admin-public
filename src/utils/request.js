import axios from 'axios';
import {joinQuery} from '@/utils/resolve-params';
import {toggleCertificate} from '@/utils/auth';

const IS_DEV = process.env.NODE_ENV==='development';
const service = axios.create({
    baseURL:IS_DEV?'/api':process.env.VUE_APP_BASE_API,
    timeout:180000
});
console.log(process.env)
service.interceptors.request.use(config=>{ console.log(config)
    let companyCode = process.env.VUE_APP_COMPANY;
    let certificate = toggleCertificate();
    let data = config.data;
    data = typeof data==='object'?data:JSON.parse(data); 
    data.companyCode = companyCode;
    if(certificate){
        data.certificate = certificate;
    }
    if(config.paramMode==='form'){
        config.data = joinQuery(data);
        config.headers['content-type'] = 'application/x-www-form-urlencoded';
    }
    return config;
});

service.interceptors.response.use(res=>{
    const { data } = res;
    if(data){
        data.msg = data.errorMassage;
        delete data.errorMassage;
    }
    return data;
},error=>{
    return error&&error.reponse&&error.response.data||'请求失败';
});

export {
    service as axios
};