import {requestMenus} from '@/api/permission';
import {sessionUid} from '@/utils/auth';
import {resolveObject} from '@/utils/common';
import routeList from '@/router/route-list';

const state = {
    menus:[]
};
const mutations = {
    'SET_MENUS':(state,menus)=>{
        state.menus = menus;
    }
};
const actions = {
    requestMenus:({commit})=>{
        return new Promise((resolve,reject)=>{
            // let info = rootState.user.userInfo;
            // let uid = info?info.personId:'';  console.log(info,uid)
            let uid = sessionUid();
            uid&&requestMenus({personId:uid}).then((res)=>{ 
                if(res&&res.errorCode===0&&res.data){
                    // let resolveMenu = (m)=>{ 
                    //     if(getType(m)==='array'){
                    //         m = m.map(v=>{
                    //             return resolveMenu(v);
                    //         }); 
                    //     }else if(getType(m)==='object'){
                    //         let children = m.children;
                    //         if(getType(children)==='array'&&children.length>0){
                    //             m.children = children.map(child=>{
                    //                 return resolveMenu(child);
                    //             });
                    //         }else{
                    //             m.path = '/index';
                    //         }
                    //     } 
                    //     return m;
                    // }
                    
                    let menus = resolveObject(res.data,function(){ 
                        let obj = this;
                        obj.path = (routeList.find(v=>{
                            return obj.name === v.name;
                        })||{}).path||''; 
                        return obj;
                    },'children'); 
                    commit('SET_MENUS',menus);
                }
                resolve();
            }).catch(error=>{
                reject(error);
            });
        });
    }
};

export default {
    namespaced:true,
    state,
    mutations,
    actions
}