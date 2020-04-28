<template>
    <div :id="config.id" class="chart-container"></div>
</template>

<script>
import {Chart} from '@antv/g2';
export default {
    name:'LineChart',
    data(){
        return {
            lineChart:null
        }
    },
    props:{
        config:{
            type:Object,
            required:true,
            default:()=>{
                return {
                    id:'container',
                    width:800,
                    height:400,
                    xAttr:'x',
                    yAttr:'y',
                    type:'type',
                    yTitle:'',
                    isShared:false,
                    crosshairs:false,
                    autoFit:true,
                    data:[]
                };
            }
        }
    },
    watch:{
        config:{
            handler(newData){ 
                this.lineChart.data(newData.data);
                this.lineChart.render();
            },
            deep:true
        }
    },
    methods:{
        initConfig(){
            this.config.autoFit===undefined&&(this.config.autoFit=true);
        },
        initChart(){
            this.initConfig(); 
            let chart = this.lineChart = new Chart({
                container:this.config.id,
                width:this.config.width,
                height:this.config.height,
                autoFit:this.config.autoFit,
            });
            chart.data(this.config.data);
            chart.tooltip({
                showCrosshairs:this.config.crosshairs,
                shared:this.config.isShared
            });
            chart.line().position((this.config.xAttr||'x')+'*'+(this.config.yAttr||'y')).color(this.config.type||'');
            chart.point().position((this.config.xAttr||'x')+'*'+(this.config.yAttr||'y')).color(this.config.type||'').size(4).shape('circle').style({
                stroke:'#fff',
                lineWidth:1
            });
            
            chart.scale(this.config.yAttr||'y',{
                nice:true,
                range:[0,.9]
            });
            chart.axis(this.config.yAttr||'y',{
                title:{
                    style:{
                        text:this.config.yTitle||''
                    }
                }
            });
            chart.render(); 
        }
    },  
    mounted(){
        this.initChart();
    }
}
</script>

<style lang="css" scoped>
.chart-container{
    padding:10px;
}
</style>