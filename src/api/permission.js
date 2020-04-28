import {axios} from '@/utils/request';
export function requestMenus(data){
    return axios({
        // url:'module/getModule',
        url:'module/all',
        method:'post',
        paramMode:'form',
        data
    })
}