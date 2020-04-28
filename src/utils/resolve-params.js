import {getType} from './common'; 
export function joinQuery(pars){
    return getType(pars)==='object'?Object.keys(pars).reduce((arr,cur)=>{
        arr.push(cur+'='+pars[cur]);
        return arr;
    },[]).join('&'):pars;
}