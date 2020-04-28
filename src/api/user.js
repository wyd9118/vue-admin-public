import { axios } from "@/utils/request";

export function login(data){
    return axios({
        url:'login/validate',
        method:'post',
        paramMode:'form',
        data
    });
}