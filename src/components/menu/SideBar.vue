<template>
    <el-scrollbar class="scrollbar-container">
        <el-menu 
            :text-color="variables.menuColor"
            :background-color="variables.menuBg"
            unique-opened
            mode="vertical" 
            class="menu-list">
            <menu-item v-for="item in menus" :key="item.id" :item="item" :indexStr="''"/>
        </el-menu>
    </el-scrollbar>
</template>

<script>
import variables from '@/styles/variables.less';
import {mapGetters} from 'vuex';
import menuItem from './MenuItem';
export default {
    name:'sidebar',
    components:{
        menuItem,
    },
    data(){
        return {
        }
    },
    computed:{
        ...mapGetters([
            'menus'
        ]),
        variables(){
            return variables;
        }
    },
    methods:{ 
        initMenus(){ 
            (!this.menus||this.menus.length===0)&&this.$store.dispatch('permission/requestMenus');
        }
    },
    created(){ 
        this.initMenus();
    },
}
</script>