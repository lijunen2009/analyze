<template>
    <el-dialog :title="title" :visible="dialogVisible" @close="close" @open="open">
       
        <div class="app-container calendar-list-container" v-loading="listLoading" element-loading-text="加载中"
             style="padding: 0;">
            <el-table :data="list" border fit highlight-current-row style="width: 100%">
                <el-table-column align="center" label="序号" type="index" width="90">
                </el-table-column>

                <el-table-column align="center" label="终端号">
                    <template slot-scope="scope">
                        <span>{{scope.row.inventorynumber}}</span>
                    </template>
                </el-table-column>
				<el-table-column align="center" label="姓名">
                    <template slot-scope="scope">
                        <span>{{scope.row.orderscustomername}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="手机号">
                    <template slot-scope="scope">
                        <span>{{scope.row.orderscustomertelephone}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="名称">
                    <template slot-scope="scope">
                        <span>{{scope.row.classname}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="激活时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.bindTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="最后使用时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.tradeTime}}</span>
                    </template>
                </el-table-column>
				<el-table-column align="center" label="金额">
                    <template slot-scope="scope">
                        <span>{{scope.row.tradeAmt}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <!--
			<div style="margin: 10px 0">销售信息</div>
            <el-table :data="oa.member" border fit highlight-current-row style="width: 100%">
                <el-table-column align="center" label="销售姓名">
                    <template slot-scope="scope">
                        <span>{{scope.row.membername}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="销售工号">
                    <template slot-scope="scope">
                        <span>{{scope.row.memberjobnumber}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="销售电话">
                    <template slot-scope="scope">
                        <span>{{scope.row.membertelephone}}</span>
                    </template>
                </el-table-column>

            </el-table>
			
            <div style="margin: 10px 0">销售持有终端信息</div>
            <el-table :data="oa.machine" border fit highlight-current-row style="width: 100%">
                <el-table-column align="center" label="序号" type="index" width="50">
                </el-table-column>
                <el-table-column align="center" label="終端类型">
                    <template slot-scope="scope">
                        <span>{{scope.row.classname}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="批次">
                    <template slot-scope="scope">
                        <span>{{scope.row.batchname}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="终端号">
                    <template slot-scope="scope">
                        <span>{{scope.row.inventorynumber}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="划拨时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.librarycreatetime|parseTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="领取状态" width="90">
                    <template slot-scope="scope">
                        <span>{{scope.row.librarygetstatus |getLibraryStatus}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="销售状态" width="90">
                    <template slot-scope="scope">
                        <span>{{scope.row.librarysalesstatus |getSaleStatus}}</span>
                    </template>
                </el-table-column>

            </el-table>
			-->
        </div>

    </el-dialog>

</template>

<script>
  import {getTradeInfo} from '@/api/guest';
  import {formatDate,parseTime} from '@/filters/index';

  export default {
    data() {
      return {
        list: [],
        oa: {
          member: [],
          machine: []
        },
        listLoading: true
      }
    },
    computed: {
      dialogVisible: function () {
        return this.visible
      }
    },
    filters: {
      getSaleStatus(status) {
        switch (parseInt(status)) {
          case 1:
            return '未售出';
          case 2:
            return ' 已售出';
          case 3:
            return ' 订单退单';
          default:
            return '未知'
        }
      },
      getLibraryStatus(status) {
        switch (parseInt(status)) {
          case 1:
            return '未领取';
          case 2:
            return ' 已领取';
        }
      }
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '',
      },
      phone: {
        type: String,
        default: ''
      }
    },
    mounted() {
    },

    methods: {
      close() {
        this.$emit('closeDialog');
      },
      open() {
        console.log(this.phone)
        this.getDetail()
      },
      getDetail() {
        let params = {
          phone: this.phone
        }
        getTradeInfo(params).then(response => {
          this.list = response.data.result.list
          
          this.listLoading = false
        });
      }
    }
  }
</script>

<style scoped>
    .el-dialog__body {
        padding: 2px 20px;
        color: #606266;
        font-size: 14px;
    }
</style>