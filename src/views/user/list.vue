<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入商户名称"
                v-model="listQuery.title"></el-input>
      <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-search">查询</el-button>
      <el-button class="filter-item" type="success" :loading="downloadLoading" v-waves icon="el-icon-plus">增加</el-button>
    </div>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
              highlight-current-row
              style="width: 100%">
      <el-table-column align="center" label="用户昵称" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.nickname}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机号" width="150">
        <template slot-scope="scope">
          <span>{{scope.row.mobile}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="性别" width="120">
        <template slot-scope="scope">
          <svg-icon icon-class="male" v-if="scope.row.sex == 1"/>
          <svg-icon icon-class="female" v-else-if="scope.row.sex == 2"/>
        </template>
      </el-table-column>
      <el-table-column align="center" label="生日" width="150">
        <template slot-scope="scope">
          <span>{{scope.row.birthday | birthdayFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="注册日期" width="150">
        <template slot-scope="scope">
          <span>{{scope.row.created_at | timeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button-group>
            <el-button icon="el-icon-search" type="info" size="mini" v-waves>查看</el-button>
            <el-button type="info" icon="el-icon-message" size="mini" v-waves>标准</el-button>
            <el-button type="primary" icon="el-icon-edit" size="mini" v-waves>编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" v-waves>停用</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { fetchList } from '@/api/user';
  import waves from '@/directive/waves';
  import { parseTime } from '@/utils';

  export default {
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          cur_page: 1,
          page_num: 10,
        },
      }
    },
    filters: {
      statusFilter(status) {
        switch (status){
          case 1:
            return '未审核';
          case 2:
            return '已审核';
        }
      },
      timeFilter(time){
        return parseTime(time,'{y}-{m}-{d} {h}:{i}');
      },
      birthdayFilter(time){
        return parseTime(time,'{y}-{m}-{d}');
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          this.list = response.data.data.list
          this.total = response.data.data.total
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.cur_page = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.page_num = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.cur_page = val
        this.getList()
      }
    }
  }
</script>
