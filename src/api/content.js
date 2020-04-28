import {axios} from '@/utils/request';

export function queryContent(data){
    return axios({
        url:'content/findPage',
        method:'post',
        paramMode:'form',
        data
    });
}