<template>
    <div>
        <el-submenu v-if="item.children" :index="resolveIndex()">
            <template slot="title">{{item.name}}</template>
            <menu-item v-for="sub in item.children" :key="sub.id" :item="sub" :indexStr="resolveIndex()"/>
        </el-submenu>
        <router-link v-else :to="item.path">
            <el-menu-item :index="resolveIndex()">{{item.name}}</el-menu-item>
        </router-link>
    </div>
</template>
<script>
export default {
    name:'menuItem',
    data(){
        return {

        }
    },
    props:{
        item:{
            type:Object,
            required:true
        },
        indexStr:{
            type:String,
            default:''
        }
    },
    methods:{
        resolveIndex(){
            return this.indexStr+(this.indexStr&&'-'||'')+this.item.id;
        }
    },
}
</script>