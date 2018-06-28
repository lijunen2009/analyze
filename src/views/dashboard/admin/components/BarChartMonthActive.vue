<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { listActiveTop5 } from '@/api/trade';
import { fromatMoney } from '@/filters/index';
const animationDuration = 6000

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,

    }
  },
  mounted() {
    this.listActiveTop5()
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart(xdata,seriesData) {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        title : {
          text: '本月交易笔数top5',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 50,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: xdata,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '交易笔数',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: seriesData,
          animationDuration
        }]
      })
    },
    listActiveTop5(){
      listActiveTop5().then(response=>{
        let xdata =[]
        let seriesData = []
       response.data.result.month.map(item=>{
         xdata.push(item.merchantName)
         seriesData.push(item.total)
       })
        this.initChart(xdata,seriesData)
      })
    }
  }
}
</script>
