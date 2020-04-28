<template>
    <div :id="config.id"></div>
</template>
<script>
import {Chart} from '@antv/g2';
import {extendObject} from '@/utils/common';
export default {
    name:'PieChart',
    props:{
        config:{
            type:Object,
            default:()=>{
                return {
                }
            }
        }
    },
    data(){
        return {
            chart:null
        }
    },
    watch:{
        config:{
            handler(newData){ 
                if(newData&&newData.data.length>0){
                    if(this.chart){
                        this.chart.data(newData.data);
                        this.chart.render();
                    }else{
                        this.initChart();
                    }
                }
            },
            deep:true
        }
    },
    mounted(){
        this.initChart();
    },
    methods:{
        // config默认配置
        resolveData(){
            this.config = extendObject(this.config,{
                id:'pie-chart',
                width:400,
                height:300,
                autoFit:true,
                xAttr:'percent',
                type:'type',
                data:[
                    // {
                    //     'count': 2758.969,
                    //     'percent': 0.7295,
                    //     'type': "已验证"
                    // },
                    // {
                    //     'count': 766.9896,
                    //     'percent': 0.2028,
                    //     'type': "未验证"
                    // }
                ]
            });
        },
        initChart(){
            const _this = this;
            // _this.resolveData();  
            console.log(this.config)
            if(Array.isArray(_this.config.data)&&_this.config.data.length>0){
                _this.chart = new Chart({
                    container:_this.config.id,
                    width:_this.config.width,
                    height:_this.config.height,
                    autoFit:_this.config.autoFit
                });
                _this.chart.data(_this.config.data);
                _this.chart.coordinate('theta',{
                    radius:.8
                });
                _this.chart.tooltip({
                    showTitle:false,
                    showMarkers:false
                });
                _this.chart.scale(_this.config.xAttr,{
                    formatter(val){
                        return _this.config.scaleFn&&typeof _this.config.scaleFn==='function'?_this.config.scaleFn.call(_this,val):val;
                    }
                })
                _this.chart.interval()
                .position(_this.config.xAttr)
                .color(_this.config.type)
                .label(_this.config.xAttr,{
                    content:(data)=>{
                        return _this.config.labelFn&&typeof _this.config.labelFn==='function'?_this.config.labelFn.call(_this,data):data[_this.config.xAttr];
                    }
                })
                .adjust('stack');
                _this.chart.render();
            }
        }
    }
}
</script>