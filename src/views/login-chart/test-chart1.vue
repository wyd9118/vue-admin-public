<template>
  <div id="container"></div>
</template>

<script>
import { Chart } from "@antv/g2";
export default {
  name: "TestChart",   
  mounted(){
      this.initChart()
  },
  methods: {
    initChart() {
        const dd = [
            { "range_date": "2020-04-14", "type": "user_count", "value": 38 },
            { "range_date": "2020-04-14", "type": "duration_avgs", "value": 2195.12 },
            { "range_date": "2020-04-14", "type": "learn_avgs", "value": 10.88 },
            { "range_date": "2020-04-14", "type": "brow_count", "value": 98 },
            { "range_date": "2020-04-15", "type": "user_count", "value": 36 },
            { "range_date": "2020-04-15", "type": "duration_avgs", "value": 99.6 },
            { "range_date": "2020-04-15", "type": "learn_avgs", "value": 7.2 },
            { "range_date": "2020-04-15", "type": "brow_count", "value": 36 },
            { "range_date": "2020-04-16", "type": "user_count", "value": 28 },
            { "range_date": "2020-04-16", "type": "duration_avgs", "value": 1205.56 },
            { "range_date": "2020-04-16", "type": "learn_avgs", "value": 7.78 },
            { "range_date": "2020-04-16", "type": "brow_count", "value": 70 },
            { "range_date": "2020-04-17", "type": "user_count", "value": 20 },
            { "range_date": "2020-04-17", "type": "duration_avgs", "value": 1555.66 },
            { "range_date": "2020-04-17", "type": "learn_avgs", "value": 4 },
            { "range_date": "2020-04-17", "type": "brow_count", "value": 24 },
            { "range_date": "2020-04-18", "type": "user_count", "value": 0 },
            { "range_date": "2020-04-18", "type": "duration_avgs", "value": 0 },
            { "range_date": "2020-04-18", "type": "learn_avgs", "value": 0 },
            { "range_date": "2020-04-18", "type": "brow_count", "value": 0 },
            { "range_date": "2020-04-19", "type": "user_count", "value": 0 },
            { "range_date": "2020-04-19", "type": "duration_avgs", "value": 0 },
            { "range_date": "2020-04-19", "type": "learn_avgs", "value": 0 },
            { "range_date": "2020-04-19", "type": "brow_count", "value": 0 },
            { "range_date": "2020-04-20", "type": "user_count", "value": 20 },
            { "range_date": "2020-04-20", "type": "duration_avgs", "value": 212 },
            { "range_date": "2020-04-20", "type": "learn_avgs", "value": 10 },
            { "range_date": "2020-04-20", "type": "brow_count", "value": 10 }
        ];
        let chart = new Chart({
            container:'container',
            height:400,
            autoFit:true,
        });
        chart.data(dd);
        chart.tooltip({
            showCrosshairs:true,
            shared:true,
            textAlign:'left'
        });
        chart.scale('value',{
            nice:true,
            range:[0,.9]
        })
        chart.axis('value',{
            title:{
                style:{
                    text:'数量'
                }
            },
        });
        chart.line().position('range_date*value').color('type');
        chart.point().position('range_date*value').color('type').size(4);
        chart.render();
    }
  }
};
</script>