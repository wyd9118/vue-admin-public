import moment from 'moment';
export function formatTime(str,format){ 
    return moment(str).format(format||'YYYY-MM-DD HH:mm:ss');
} 

export function subtractTime(num,str,format){
    return moment().subtract(num,str).format(format||'YYYY-MM-DD HH:mm:ss');
}