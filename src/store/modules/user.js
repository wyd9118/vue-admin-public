import {login} from '@/api/user';
import {toggleCertificate,sessionUid} from '@/utils/auth';
const state = {
    userInfo:{}
};

const mutations = {
    SET_USERINFO:(state,info)=>state.userInfo = info||{},
};
const actions = {
    login:({commit},info)=>{
        const {username,password} = info;
        return new Promise((resolve,reject)=>{
            login({username:username.trim(),password}).then((res)=>{
                const {data} = res;
                if(res.errorCode===0&&data&&data.certificate){
                    commit('SET_USERINFO',data); 
                    // setCertificate(data.certificate);
                    toggleCertificate(data.certificate);
                    sessionUid(data.personId);
                    resolve();
                }else{
                    resolve(res.msg||'登录失败');
                }
            }).catch(error=>{
                reject(error);
            })
        })
    }
};

export default {
    namespaced:true,
    state,
    mutations,
    actions
};
