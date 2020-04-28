import {axios} from '@/utils/request';

export function queryLoginChart(data){
    return axios({
        url:'analysis/queryLearningBehaviorReport',
        method:'post',
        paramMode:'form',
        data
    })
}
export function queryLearningTotal(data){
    return axios({
        url:'analysis/systemLearnTotals',
        method:'post',
        paramMode:'form',
        data
    })
}
export function queryLearningStatus(data){
    return axios({
        url:'analysis/statusDistributions',
        method:'post',
        paramMode:'form',
        data
    })
}