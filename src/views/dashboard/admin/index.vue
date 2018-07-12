<template>
  <div class="dashboard-editor-container">
    <!--<github-corner></github-corner>-->

    <panel-group></panel-group>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <LineChartTrade :chart-data="lineChartData"></LineChartTrade>
    </el-row>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <LineChartActive :chart-data="lineChartData"></LineChartActive>
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
import LineChartTrade from './components/LineChartTrade'
import LineChartActive from './components/LineChartActive'
import BarChartMonthTrade from './components/BarChartMonthTrade'
import BarChartQuarterTrade from './components/BarChartQuarterTrade'
import BarChartQuarterActive from './components/BarChartQuarterActive'
import BarChartMonthActive from './components/BarChartMonthActive'
import { countByMonth } from '@/api/trade';

export default {
  name: 'dashboard-admin',
  components: {
    PanelGroup,
    LineChartTrade,
    LineChartActive,
    BarChartMonthTrade,
    BarChartQuarterTrade,
    BarChartQuarterActive,
    BarChartMonthActive

  },
  data() {
    return {
      lineChartData: {}
    }
  },
  created(){
    this.countByMonth()
  },
  methods: {
    countByMonth(){
      countByMonth().then(response=>{
        this.lineChartData = response.data.result
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
