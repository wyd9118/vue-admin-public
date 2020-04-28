<template>
    <div>
        <div class="side-bar-container">
            <side-bar/>
        </div>
        <div class="main-container" v-loading.fullscreen.lock="fullscreenloading">
            <router-view :key="key"/>
        </div>
    </div>
</template>

<script>
import sideBar from '@/components/menu/SideBar';
export default {
    name:'BasicLayout',
    data(){
        return {
            fullscreenloading:true
        }
    },
    components:{
        sideBar
    },
    computed:{
        key(){
            return this.$route.path;
        }
    },
    mounted(){ 
        setTimeout(()=>{
            this.fullscreenloading = false;
        },2000)
    }
}
</script>