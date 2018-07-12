<template>
    <div class="app-container calendar-list-container" v-loading="listLoading" element-loading-text="加载中">
        <div class="filter-container">
            <el-date-picker
                    v-model="queryDate"
                    type="daterange"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
            </el-date-picker>
            <el-button  type="primary" v-waves icon="el-icon-search" @click="search">查询</el-button>

        </div>
        <el-row class="panel-group" :gutter="40">
            <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
                <div class='card-panel' >
                    <div class="card-panel-icon-wrapper icon-people">
                        <svg-icon icon-class="cash_money" class-name="card-panel-icon" />
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">可提现总金额</div>
                        <count-to class="card-panel-num" :startVal="0" :endVal="parseInt(cash_money)" :duration="500"></count-to>
                    </div>
                </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
                <div class="card-panel" >
                    <div class="card-panel-icon-wrapper icon-message">
                        <svg-icon icon-class="pos" class-name="card-panel-icon" />
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">激活奖励金额</div>
                        <count-to class="card-panel-num" :startVal="0" :endVal="parseInt(active_money)" :duration="3000"></count-to>
                    </div>
                </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
                <div class="card-panel" >
                    <div class="card-panel-icon-wrapper icon-money">
                        <svg-icon icon-class="trade_money" class-name="card-panel-icon" />
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">分润奖励金额</div>
                        <count-to class="card-panel-num" :startVal="0" :endVal="parseInt(trade_money)" :duration="3200"></count-to>
                    </div>
                </div>
            </el-col>

        </el-row>
        <div style="margin: 10px 0;color: #cccccc">各平台可提现明细：</div>
        <el-table  :data="list"  border fit
                  highlight-current-row
                  style="width: 100%">
            <el-table-column align="center" label="序号" type="index" width="90">
            </el-table-column>
            <el-table-column align="center" label="平台名称" >
                <template slot-scope="scope">
                    <span>{{scope.row.platform_name}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="可提现金额" >
                <template slot-scope="scope">
                    <span>{{scope.row.value}}</span>
                </template>
            </el-table-column>

        </el-table>

    </div>
</template>

<script>
  import {countCashMoney,countReturnCashMoney}from '@/api/return_cash'
  import waves from '@/directive/waves';
  import { parseTime } from '@/utils';
  import CountTo from 'vue-count-to'
  let myDate = new Date();
  let year =  myDate.getFullYear()
  let month =  myDate.getMonth()+1
  let day =  myDate.getDate()
  export default {
    data(){
        return {
          list:[],
          listLoading: false,
          cash_money:0,
          active_money:0,
          trade_money:0,
          listQuery: {
            start_date: '',
            end_date:'',
          },
          queryDate:[year+'-'+month+'-'+day,year+'-'+month+'-'+day]
        }
    },
    directives: {
      waves
    },
    components: {
      CountTo
    },
    mounted(){
        this.countCashMoney();
        this.countReturnCashMoney()
    },
    methods:{
      countCashMoney:function () {
        this.listLoading = true
        countCashMoney().then(response=>{
          console.log(response)
            this.listLoading = false
            this.cash_money = response.data.result.total
            this.list = response.data.result.platform
        })
      },
      countReturnCashMoney:function () {
        countReturnCashMoney(this.listQuery).then(response=>{
          this.listLoading = false
          this.active_money = response.data.result.active_money
          this.trade_money = response.data.result.trade_cash_money
        })
      },
      search() {
        this.listQuery.start_date = this.queryDate[0]
        this.listQuery.end_date = this.queryDate[1]
        this.listLoading = true
        this.countReturnCashMoney()
      },

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .panel-group {
        margin-top: 18px;
        .card-panel-col{
            margin-bottom: 32px;
        }
        .card-panel {
            height: 108px;
            font-size: 12px;
            position: relative;
            overflow: hidden;
            color: #666;
            background: #fff;
            box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
            border-color: rgba(0, 0, 0, .05);

            .icon-people {
                color: #40c9c6;
            }
            .icon-message {
                color: #36a3f7;
            }
            .icon-money {
                color: #f4516c;
            }
            .icon-shoppingCard {
                color: #34bfa3
            }
            .card-panel-icon-wrapper {
                float: left;
                margin: 14px 0 0 14px;
                padding: 16px;
                transition: all 0.38s ease-out;
                border-radius: 6px;
            }
            .card-panel-icon {
                float: left;
                font-size: 48px;
            }
            .card-panel-description {
                float: right;
                font-weight: bold;
                margin: 26px;
                margin-left: 0px;
                .card-panel-text {
                    line-height: 18px;
                    color: rgba(0, 0, 0, 0.45);
                    font-size: 16px;
                    margin-bottom: 12px;
                }
                .card-panel-num {
                    font-size: 20px;
                }
            }
        }
    }
</style>