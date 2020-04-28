import Vue from 'vue';
import Router from 'vue-router';
import {getCertificate} from '@/utils/auth';
import {BasicLayout} from '@/layout';
Vue.use(Router);
const routes = [
    {
        path:'/',
        name:'index',
        component:BasicLayout,
        redirect:'/home',
        children:[
            {
                path:'/home',
                name:'home',
                component:()=>import('@/views/home')
            }
        ]
    },
    {
        path:'/login',
        name:'login',
        component:()=>import('@/views/user/Login')
    },
    {
        path:'/class-manage',
        component:BasicLayout,
        redirect:'/class-manage/index',
        children:[
            {
                path:'index',
                name:'class-manage',
                component:()=>import('@/views/class-manage/ClassManage'),
            }
        ]
        
    },
    {
        path:'/content',
        component:BasicLayout,
        redirect:'/content/index',
        children:[
            {
                path:'index',
                name:'content',
                component:()=>import('@/views/content'),
            }
        ]
    },
    {
        path:'/login-chart',
        redirect:'/login-chart/index',
        component:BasicLayout,
        children:[
            {
                path:'index',
                name:'login-chart',
                component:()=>import('@/views/login-chart')
                // component:()=>import('@/views/login-chart/test-chart1')
            }
        ]
    }
];

const router =  new Router({
    base:process.env.NODE_ENV==='production'?'/yd-build/':'/',
    mode:'history',
    routes
});
router.beforeEach((to,from,next)=>{
    if(getCertificate()||to.path==='/login'){
        next();
    }else{
        next({
            path:'/login',
            query:Object.assign({redirect:to.path},to.query)
        });
    }
});
export default router;