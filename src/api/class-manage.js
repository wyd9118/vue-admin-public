import {axios} from '@/utils/request';

export function queryClasses(data){
    return axios({
        url:'project/matchPage',
        method:'post',
        paramMode:'form',
        data
    });
}