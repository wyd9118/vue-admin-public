const company = process.env.VUE_APP_COMPANY;
const certificateKey = 'certificate_'+company;
const uidKey = 'uid_'+company;

const sessionUtil = (key,val)=>{
    return val?sessionStorage.setItem(key,val)&&1:sessionStorage.getItem(key);
}
export function setCertificate(cer){
    sessionStorage.setItem(certificateKey,cer);
}
export function getCertificate(){
    return sessionStorage.getItem(certificateKey);
}
export function toggleCertificate(cer){
    return cer?sessionStorage.setItem(certificateKey,cer)&&true:sessionStorage.getItem(certificateKey);
}
export function delCertificate(){
    sessionStorage.removeItem(certificateKey);
}

export function sessionUid(id){
    return sessionUtil(uidKey,id);
}