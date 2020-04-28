<template>
    <div class="table-container">
        <el-table
            :data="tableData">
            <el-table-column
                prop="name"
                label="班级名称"
                width="150">
            </el-table-column>
            <el-table-column prop="status" label="状态" width="80">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="toggleStatus(scope.row.id)">{{scope.row.status==='show'?'开启':'关闭'}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="start_time" label="有效时间" width="200">
                <template slot-scope="scope">{{scope.row.start_time|formatDate('YYYY-MM-DD')}}~{{scope.row.end_time|formatDate('YYYY-MM-DD')}}</template>
            </el-table-column>
            <el-table-column prop="projectNumber" label="学员数量" width="100"></el-table-column>
            <el-table-column prop="projectProgress" label="完成进度" width="100">
                <template slot-scope="scope">{{scope.row.projectProgress|getPercent(2)}}</template>
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间" width="150">
                <template slot-scope="scope">{{scope.row.create_time|formatDate}}</template>
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button @click="viewItem(scope.row)" type="text" size="small">查看</el-button>
                    <el-button @click="editItem(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="copyItem(scope.row)" type="text" size="small">复制</el-button>
                    <el-button @click="delItem(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :total="total"/>
    </div>
</template>
<script>
import Pagination from '@/components/pagination';
import {queryClasses} from '@/api/class-manage';
export default {
    name:'class-manage',
    data(){
        return {
            total:0,
            tableData:[]
        }
    },
    components:{
        Pagination
    },
    methods:{
        initClasses:function(){
            const vm = this;
            const param = {
                pageNo:1,
                pageSize:15,
                needTotalSize:'true',
                publicNumberId:1,
                kind:'project'
            };
            queryClasses(param).then(res=>{
                if(res&&res.errorCode===0&&res.data){ 
                    const {totalSize,records} = res.data; console.log(totalSize)
                    // records.map(d=>{
                    //     d.createTime = d.create_time;
                    //     return d;
                    // })
                    // vm.$nextTick(()=>{
                    //     vm.paginationSet.total = totalSize;
                    // })
                    vm.total = totalSize;
                    vm.tableData = records; console.log(records)
                }else{
                    vm.$alert(res.msg||'数据获取失败');
                }
            }).catch(error=>{ console.log(error)
                vm.$alert('数据获取失败');
            });
        },
    },
    created(){  
        this.initClasses();
    }
}
</script>