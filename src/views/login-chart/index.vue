<template>
    <div class="container">
        <div class="chart-section">
            <h4 class="section-title">趋势图</h4>
            <div class="time-section">
                <el-button type="primary" plain size="small" @click.native="resetChart(7)">7天</el-button>
                <el-button type="primary" plain size="small" @click.native="resetChart(14)">14天</el-button>
                <el-button type="primary" plain size="small" @click.native="resetChart(30)">30天</el-button>
                <span class="label">时间：</span>
                <el-date-picker size="small" v-model="dateValue" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                <el-button type="primary" size="small" class="btn-search" @click.native="resetChart">搜索</el-button>
            </div>
            <line-chart :config="chartData"/>
        </div>
        <div class="detail-section">
            <h4 class="section-title">详细数据</h4>
            <el-table :data="loginData.data">
                <el-table-column prop="range_date" label="登录时间">
                    <template slot-scope="scope">{{scope.row.range_date|formatTime('YYYY-MM-DD')}}</template>
                </el-table-column>
                <el-table-column prop="user_count" label="人数"></el-table-column>
                <el-table-column prop="brow_count" label="学习人次"></el-table-column>
                <el-table-column prop="learn_avgs" label="学习人次"></el-table-column>
                <el-table-column prop="duration_avgs" label="人均时长（分钟）"></el-table-column>
            </el-table>
            <pagination :total="loginData.total" @current-change="initLoginChart" @size-change="initLoginChart"/>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import {formatTime} from '@/utils/resolve-time';
import LineChart from '@/components/charts/line-chart';
import {queryLoginChart} from '@/api/login-chart';
import Pagination from '@/components/pagination';
export default {
    name:'login-chart',
    data(){
        return {
            chartData:{
                id:'login-chart',
                width:800,
                height:400,
                xAttr:'range_date',
                yAttr:'value',
                type:'type',
                yTitle:'数量',
                data:[]
            },
            dateValue:'',
            start:'',
            end:'',
            loginData:{
                total:0,
                data:[]
            },

        }
    },
    components:{
        LineChart,
        Pagination
    },
    methods:{
        initLoginChart({pageNo,pageSize}={}){
            const _this = this;
            if(!this.start||!this.end){
                let obj = this.getTimeByDays(7); 
                this.start = obj.start;
                this.end = obj.end;
            }

            const param = {
                publicNumberId:1,
                pageNo:pageNo||1,
                pageSize:pageSize||7,
                startTime:this.start,
                endTime:this.end,
            }
            queryLoginChart(param).then(res=>{ console.log(res)
                if(res&&res.errorCode===0&&res.data){
                    var dataArr = [],
                        typeMap = {
                            'user_count':'登录人数',
                            'duration_avgs':'人均时长(分钟)',
                            'learn_avgs':'人均次数',
                            'brow_count':'学习人次'
                        };
                    res.data.records.forEach(v=>{ 
                        Array.prototype.push.apply(
                            dataArr,
                            (Object.keys(typeMap).map(key=>{ 
                                return {
                                    'range_date':v.range_date,
                                    'type':typeMap[key],
                                    'value':v[key]
                                }
                            }))
                        );
                    });
                    _this.chartData.data = dataArr; 
                    _this.loginData.data = res.data.records;
                    _this.loginData.total = res.data.totalSize;
                }
            }).catch();
        },
        getTimeByDays(days){
            return {
                start:moment().subtract(days,'days').format('YYYY-MM-DD'),
                end:formatTime()
            };
        },
        resetChart(days){
            days = Number(days);
            let start,end;
            if(days){
                ({start,end} = this.getTimeByDays(days));
            }else if(!this.dateValue){
                this.$alert('请设置时间'); 
                return false;
            }else{
                start = formatTime(this.dateValue[0],'YYYY-MM-DD');
                end = formatTime(this.dateValue[1],'YYYY-MM-DD'); 
            } 
            this.start = start;
            this.end = end;
            this.initLoginChart();
        },
        queryLoginData(){

        }
    },
    created(){
        this.initLoginChart();
    }
}
</script>
<style lang="less" scoped>
.chart-section{
    padding-top:20px;
    .label{
        margin:0 10px 0 20px;
    }
    .btn-search{
        margin-left:10px;
    }
}
.section-title{
    height:30px;
    line-height:30px;
    font-size:18px;
    font-weight:normal;
    text-align:left;
}
.detail-section{
    margin-top:30px;
}
</style>
