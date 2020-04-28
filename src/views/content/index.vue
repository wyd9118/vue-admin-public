<template>
    <div class="content-container">
        <el-table :data="tableData" strip :height="tableHeight">
            <el-table-column prop="no" label="序号" width="50"></el-table-column>
            <el-table-column prop="categoryNames" label="分类" width="100"></el-table-column>
            <el-table-column prop="keyword" label="关键字" width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="title" label="标题" width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="browNum" label="浏览次数" width="80"></el-table-column>
            <el-table-column prop="type" label="类型" width="100"></el-table-column>
            <el-table-column prop="create_time" label="添加时间" width="150">
                <template slot-scope="scope">{{scope.row.create_time|formatDate}}</template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="80"></el-table-column>
        </el-table>
        <Pagination :total="total" @current-change="queryContent" @size-change="queryContent"/>
    </div>
</template>

<script>
import Pagination from '@/components/pagination';
import {queryContent} from '@/api/content';
export default {
    name:'Content',
    data(){
        return {
            total:0,
            tableData:[]
        }
    },
    computed:{
        tableHeight(){
            return document.querySelector('.side-bar-container').offsetHeight-40
        }
    },
    components:{
        Pagination
    },
    methods:{
        queryContent({pageNo,pageSize}={}){ 
            const _this = this;
            const param = {
                pageNo:pageNo||1,
                pageSize:pageSize||10,
                needTotalSize:'true',
                publicNumberId:1,
                withCredentials:true
            };
            queryContent(param).then(res=>{ console.log(res)
                if(res&&res.errorCode===0&&res.data){
                    const {totalSize,records} = res.data;
                    _this.tableData = records;
                    _this.total = totalSize;
                }else{
                    _this.$alert(res.msg||'数据获取失败');
                }
            }).catch((error)=>{
                _this.$alert(error||'数据获取失败');
            })
        }
    },
    created(){
        this.queryContent();
    }
}
</script>