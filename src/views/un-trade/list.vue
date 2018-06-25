<template>
  <div class="app-container calendar-list-container" v-loading="listLoading" element-loading-text="加载中">
    <div class="filter-container">
        <el-select v-model="monthName" placeholder="请选择日期">
            <el-option label="1个月" value="1"></el-option>
            <el-option label="3个月" value="3"></el-option>
            <!--<el-option label="半年" value="6"></el-option>-->
        </el-select>
      <el-button  type="primary" v-waves icon="el-icon-search" @click="search">查询</el-button>

    </div>
    <el-table :key='tableKey' :data="list"  border fit
              highlight-current-row
              style="width: 100%">
      <el-table-column align="center" label="序号" type="index" width="90">
      </el-table-column>
      <el-table-column align="center" label="终端号" >
        <template slot-scope="scope">
          <span>{{scope.row.terminalNo}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="商户号" >
        <template slot-scope="scope">
            <span>{{scope.row.merchantNo}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商户名称名称" >
        <template slot-scope="scope">
            <span>{{scope.row.merchantName}}</span>
        </template>
      </el-table-column>
        <el-table-column align="center" label="操作" class-name="small-padding fixed-width" width="200">
            <template slot-scope="scope">
                <el-button-group>
                    <el-button icon="el-icon-search" type="info" size="mini" v-waves @click="detail(scope.row.terminalNo)">查看</el-button>
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
    <machine :visible="visible" :terminalNo="terminalNo" title="终端详情"  @closeDialog="handlerDialogClose"></machine>
  </div>
</template>

<script>
  import { listUnTradeMachine } from '@/api/trade';
  import waves from '@/directive/waves';
  import { parseTime } from '@/utils';
  import Machine from '../components/machine'

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
        monthName:'1个月',
        listQuery: {
          page: 1,
          limit: 10,
          month: 1
        },
        visible:false,
        terminalNo:''
      }
    },
    filters: {

    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        listUnTradeMachine(this.listQuery).then(response => {
          this.list = response.data.result.list
          this.total = response.data.result.total
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
        if(this.monthName == '1个月'){
          this.listQuery.month = 1;
        }else{
          this.listQuery.month = this.monthName;
        }
        this.getList()
      },
      handlerDialogClose() {
        this.visible = false;
      },
      detail(terminalNo){
        this.terminalNo = terminalNo
        this.visible = true
      }
    }
  }
</script>
