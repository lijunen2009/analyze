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
    <el-table :key='tableKey' :data="list"  border fit
              highlight-current-row
              style="width: 100%">
        <el-table-column align="center" label="序号" type="index" width="90">
        </el-table-column>
     
      
      <el-table-column align="center" label="客户名称" >
        <template slot-scope="scope">
            <span>{{scope.row.orderscustomername}}</span>
        </template>
      </el-table-column>
        <el-table-column align="center" label="客户电话" >
            <template slot-scope="scope">
                <span>{{scope.row.orderscustomertelephone}}</span>
            </template>
        </el-table-column>
      
        <el-table-column align="center" label="操作" >
            <template slot-scope="scope">
                <el-button-group>
                    <el-button icon="el-icon-view" type="info" size="mini" v-waves @click="detail(scope.row.orderscustomertelephone)">查看</el-button>
                </el-button-group>
            </template>
        </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.page"  :page-size="listQuery.limit"
                     layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
      <machine :visible="visible" :phone="phone" title="终端详情"  @closeDialog="handlerDialogClose"></machine>
  </div>
</template>

<script>
  import { tradeAmount } from '@/api/guest';
  import waves from '@/directive/waves';
  import { fromatMoney } from '@/filters/index';
  import Machine from './machine'
  let myDate = new Date();
  let year =  myDate.getFullYear()
  let month =  myDate.getMonth()+1
  let day =  myDate.getDate()

  export default {
    directives: {
      waves
    },
    components: {
      Machine
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10,
          start_date: '',
          end_date:''
        },
        phone:'',
        visible:false,
        queryDate:[year+'-'+month+'-1',year+'-'+month+'-'+day]
      }
    },
    filters: {

    },
    computed:{

    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        tradeAmount(this.listQuery).then(response => {
	
          this.list = response.data.result.list
          this.total = response.data.total
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      search() {
        this.listQuery.start_date = this.queryDate[0]
        this.listQuery.end_date = this.queryDate[1]
        this.getList()
      },
      handlerDialogClose() {
        this.visible = false;
      },
      detail(phone){
	  
        this.phone = phone
        this.visible = true
      }
    }
  }
</script>
