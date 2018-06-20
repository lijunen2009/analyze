<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入商户名称"
                v-model="listQuery.title"></el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search">查询</el-button>
      <el-button class="filter-item" type="success" v-waves icon="el-icon-plus" @click="handlerAddStore">增加</el-button>
    </div>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
              highlight-current-row
              style="width: 100%">
      <el-table-column align="center" label="商户名称" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商户地址" width="150">
        <template slot-scope="scope">
          <span>{{scope.row.address}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="联系电话" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.phone}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="评分" width="150">
        <template slot-scope="scope">
          <el-rate
            :max="5"
            disabled
            :allow-half="true"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            v-model="scope.row.evaluation / 2">
          </el-rate>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag>{{scope.row.status | statusFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button-group>
            <el-button icon="el-icon-search" type="info" size="mini" v-waves>查看</el-button>
            <el-button type="info" icon="el-icon-message" size="mini" v-waves>标准</el-button>
            <el-button type="primary" icon="el-icon-edit" size="mini" v-waves>编辑</el-button>
            <el-button type="success" icon="el-icon-check" size="mini" v-waves v-if="scope.row.status == 1">审核</el-button>
            <el-button type="danger" icon="el-icon-close" size="mini" v-waves v-else>停用</el-button>
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
    <store :visible="detail.visible" title="新增店铺" @closeDialog="handlerDialogClose"></store>
  </div>
</template>

<script>
  import { fetchList } from '@/api/store';
  import waves from '@/directive/waves';
  import Store from './components/detail';

  export default {
    components: {
      Store
    },
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
        detail: {
          visible: false
        }
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
      handlerAddStore() {
        this.detail.visible = true;
      },
      handlerDialogClose() {
        this.detail.visible = false;
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
