<template>
  <div class="dashboard-editor-container">
    <!--<github-corner></github-corner>-->

    <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData"></line-chart>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <BarChartQuarterTrade></BarChartQuarterTrade>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <BarChartMonthTrade></BarChartMonthTrade>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <BarChartQuarterActive></BarChartQuarterActive>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <BarChartMonthActive></BarChartMonthActive>
        </div>
      </el-col>
    </el-row>


  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import BarChartMonthTrade from './components/BarChartMonthTrade'
import BarChartQuarterTrade from './components/BarChartQuarterTrade'
import BarChartQuarterActive from './components/BarChartQuarterActive'
import BarChartMonthActive from './components/BarChartMonthActive'
import { countByMonth } from '@/api/trade';
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'dashboard-admin',
  components: {
    PanelGroup,
    LineChart,
    BarChartMonthTrade,
    BarChartQuarterTrade,
    BarChartQuarterActive,
    BarChartMonthActive

  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  created(){
    console.log('hello')
    this.countByMonth()
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    countByMonth(){
      countByMonth().then(response=>{
        console.log(response)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
