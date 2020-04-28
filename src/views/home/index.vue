<template>
    <div class="container">
        <div class="home-top">
            <div class="part left">
                <h4 class="home-title">汇总</h4>
                <div class="list">
                    <dl class="item">
                        <dt>{{totalData.memberCount}}</dt>
                        <dd>总体用户</dd>
                    </dl>    
                    <dl class="item">
                        <dt>{{totalData.projectCount}}</dt>
                        <dd>班级数量</dd>
                    </dl>    
                    <dl class="item">
                        <dt>{{totalData.courseCount}}</dt>
                        <dd>课程数量</dd>
                    </dl>    
                    <dl class="item">
                        <dt>{{totalData.examCount}}</dt>
                        <dd>考试数量</dd>
                    </dl>
                </div>    
            </div>
            <div class="part right">
                <h4 class="home-title">用户状态</h4>
                <pie-chart :config="pieChartConfig"/>
            <!-- <div id="pie-chart"></div> -->

            </div>
        </div>
        <div class="home-chart">
            <h4 class="home-title">登录情况</h4>
            <line-chart :config="lineChartConfig" />
        </div>
    </div>
</template>

<script>
// import {Chart} from '@antv/g2';
// const G2 = require('@antv/g2');
import PieChart from '@/components/charts/pie-chart';
import LineChart from '@/components/charts/line-chart.vue';
import {queryLearningTotal,queryLearningStatus,queryLoginChart} from '@/api/login-chart';
import {formatTime,subtractTime} from '@/utils/resolve-time';
export default {
    name:'Home',
    components:{
        PieChart,
        LineChart
    },
    data(){
        return {
            lineChartConfig:{
                id:'chart-box',
                height:300,
                autoFit:true,
                xAttr:'range_date',
                yAttr:'value',
                yTitle:'数量',
                type:'type',
                data:[]
            },
            start:'',
            end:'',
            totalData:{},
            statusData:{},
            pieChartConfig:{
                id:'pie-chart',
                height:240,
                autoFit:true,
                xAttr:'percent',
                type:'type',
                scaleFn:(d)=>{
                    return (d*100||0)+'%';
                },
                labelFn:(d)=>{
                    return d&&(d.percent*100+'%')||'0%';
                },
                data:[]
            }
        }
    },
    methods:{
        initLearningData(){
            const _this = this;
            queryLearningTotal({}).then(res=>{
                if(res&&res.errorCode===0&&res.data){
                    _this.totalData = res.data;
                }
            });
            queryLearningStatus({}).then(res=>{  
                if(res&&res.errorCode===0&&res.data){
                    let data = [
                        {
                            type:'已验证',
                            count:res.data.validatingRate*res.data.memberCount,
                            percent:res.data.validatingRate
                        },
                        {
                            type:'未验证',
                            count:res.data.unValidatingRate*res.data.memberCount,
                            percent:res.data.unValidatingRate
                        }
                    ]; console.log(123,data)
                    _this.pieChartConfig.data = data; 
                }
            });
        },
        initChart(){
            const _this = this;
            (!_this.start||!_this.end)&&_this.getTime(7);
            let param = {
                pageNo:1,
                pageSize:7,
                startTime:_this.start,
                endTime:_this.end
            };
            queryLoginChart(param).then(res=>{
                if(res&&res.errorCode===0&&res.data){
                    let typeObj = {'brow_count':'登录人数'};
                    const records = res.data.records;
                    let data = [];
                    if(Array.isArray(records)){
                        records.forEach(obj=>{
                            Array.prototype.push.apply(
                                data,
                                Object.keys(typeObj).map(key=>{
                                    return {
                                        'range_date':obj.range_date,
                                        'type':typeObj[key],
                                        'value':obj[key]
                                    };
                                })
                            );
                        });
                        _this.lineChartConfig.data = data; 
                    }
                }else{
                    _this.$alert(res.msg||'数据查询失败');
                }
            }).catch();
        },
        getTime(days){
            days = Number(days)||7;
            this.start = subtractTime(days,'days','YYYY-MM-DD');
            this.end = formatTime(new Date(),'YYYY-MM-DD');
        }
    },
    created(){
        this.initLearningData();
        this.initChart();
    }
}
</script>
<style lang="less" scoped>
.home-top{
    overflow:hidden;
    .part{
        float:left;
        width:50%;
        height:300px;
        .item{
            float:left;
            width:50%;
            height:50%;
            font-size:14px;
            text-align:center;
            dt{
                font-weight:bold;
            }
            &::nth-child(even){
                border-right:1px solid #000;
            }
        }
    }
    .list{
        overflow:hidden;
    }
}
.home-title{
    font-size:14px;
    line-height:24px;
    text-align:left;
}
</style>