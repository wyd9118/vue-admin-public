
/**
 * @param {*} o 
 */
export function getType(o){
    return (Object.prototype.toString.call(o).match(/\[object (.*?)\]/)||[])[1].toLowerCase();
}

/**
 * @param {object|array} m 
 * @param {function} fn 
 * @param {string} search
*/
export function resolveObject (m,fn,search){
    if(fn&&getType(fn)==='function'&&search){ 
        if(getType(m)==='array'){
            m = m.map(v=>{
                return resolveObject(v,fn,search);
            }); 
        }else if(getType(m)==='object'){
            let arr = m[search];
            if(getType(arr)==='array'&&arr.length>0){
                m.arr = arr.map(v=>{
                    return resolveObject(v,fn,search);
                });
            }else{
                m = fn.call(m,m); 
            }
        } 
    }
    return m;
}

/**
 * 将数字转换百分比
 * @param {number} num 必须
 * @param {number} precision 可选，小数精确位数
 * @param {number} multiple 可选，默认将数字乘以100后再转换
 */
export function getPercent(num=0,precision=0,multiple=100){
    return (Number(num)||0)*multiple.toFixed(precision)+'%';
}

/**
 * @param {*} obj 
 * @param {*} key 
 */
export function hasProperty(obj,key){
    obj = typeof obj==='object'?obj:{};
    return Object.prototype.hasOwnProperty.call(obj,key);
}

/**
 * @param {Object} returnObj 返回对象
 * @param {Object} target 合并对象
 */
export function extendObject(returnObj,target){  
    getType(returnObj)!=='object'&&(returnObj=Object.create({}));
    if(getType(target)==='object'){
        for(let key in target){ 
            if(hasProperty(target,key)){  
                if(getType(returnObj[key])==='object'&&getType(target[key])==='object'){
                    returnObj[key] = extendObject(returnObj[key],target[key]); 
                }else{
                    returnObj[key] = target[key]; 
                }
            }
        }
    } 
    return returnObj;
}