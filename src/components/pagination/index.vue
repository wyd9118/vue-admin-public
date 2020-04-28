<template>
    <el-pagination 
    :page-size="pageSize"
    :total="total"
    :current-page="pageNo"
    :background="background"
    :layout="layout"
    :page-sizes="sizes"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
    ></el-pagination>
</template>

<script>
export default {
    name:'Pagination',
    props:{
        pageSize:{
            type:Number,
            default:10
        },
        pageNo:{
            type:Number,
            default:1
        },
        background:{
            type:Boolean,
            default:false
        },
        total:{
            type:Number,
            required:true,
            default:0
        },
        layout:{
            type:String,
            default:'prev,pager,next,sizes'
        },
        small:{
            type:Boolean,
            default:false
        },
        sizes:{
            type:Array,
            default:()=>{
                return [10,30,50];
            }
        }
    },
    methods:{
        handleCurrentChange(current){
            this.$emit('current-change',{pageNo:current});
        },
        handleSizeChange(no){
            this.$emit('size-change',{pageSize:no});
        }
    }
}
</script>
<style lang="less" scoped>
// @import '~@/styles/settings.less';
.el-pagination button,.el-pager li{
    height:40px!important;
    line-height:40px!important;
}
</style>