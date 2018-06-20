<template>
  <div>
    <el-dialog :title="title" :visible.sync="visible" width="80%" top="10px" @close="close">
      <el-form ref="form" :rules="rules" :model="dataForm" label-position="left" label-width="80px"
               style=' margin-left:50px;'>
        <el-row>
          <el-col :span="2" :offset="20">
            <el-button type="success" @click="submitForm('form')">提交</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label-width="80px" label="缩略图："
                          class="postInfo-container-item image-uploader">
              <el-upload
                :action="uploadAction"
                list-type="picture-card"
                :data="{type: 1}"
                :on-exceed="handleExceed"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :file-list="thumbnail"
                :limit=1
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label-width="80px" label="轮播图："
                          class="postInfo-container-item image-uploader">
              <el-upload
                :action="uploadAction"
                list-type="picture-card"
                :data="{type: 2}"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-exceed="handleExceed"
                :file-list="carousel"
                :limit=5
                :on-success="handleSuccess">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="9">
            <el-form-item label="店铺名称" prop="name">
              <el-input v-model="dataForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model.number="dataForm.phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="9">
            <el-form-item label="店铺地址" prop="name">
              <el-input v-model="dataForm.address"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="所属省份">
              <el-input v-model="dataForm.province" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="所属城市">
              <el-input v-model="dataForm.city" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="所属区域">
              <el-input v-model="dataForm.area" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-alert
            title="请拖动地图上的图标选取或者在搜索框店铺位置"
            center
            show-icon
            :closable="false"
            type="warning">
          </el-alert>
          <el-amap-search-box class="search-box" :on-search-result="onSearchResult"></el-amap-search-box>
          <el-amap vid="amapDemo" ref="amap" :center="center" :map-manager="amapManager" :zoom="zoom" :events="events"
                   style="height: 400px;"></el-amap>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {AMapManager} from 'vue-amap';
  import elDragDialog from '@/directive/el-dragDialog'

  export default {
    data() {
      let amapManager = new AMapManager();
      return {
        uploadAction: 'https://api.fitness.zhangyuzhe.wang/api/back/imgUpload',
        dialogVisible: false,
        dialogImageUrl: '',
        thumbnail: [],
        carousel: [],
        detail: [],
        dataForm: {
          name: '',
          phone: '',
          address: '',
          province: '',
          city: '',
          area: '',
          lng: '',
          lat: '',
        },
        rules: {
          name: [
            {required: true, message: '请输入店铺名称', trigger: 'blur'},
          ],
          phone: [
            {required: true, message: '请输入联系电话', trigger: 'change'},
            {type: 'number', message: '联系电话格式错误'}
          ],
          date1: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ],
          date2: [
            {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
          ],
          type: [
            {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
          ],
          resource: [
            {required: true, message: '请选择活动资源', trigger: 'change'}
          ],
          desc: [
            {required: true, message: '请填写活动形式', trigger: 'blur'}
          ]
        },
        zoom: 12,
        center: [ 111.667976,40.820796 ],
        amapManager,
        positionPicker: null,
        address: '',
        events: {
          init: (map) => {
            AMapUI.loadUI(['misc/PositionPicker'], function (PositionPicker) {
              this.positionPicker = new PositionPicker({
                mode: 'dragMarker',
                map: map
              });
              this.positionPicker.on('success', (positionResult) => {
                this.dataForm.address = positionResult.nearestJunction;
                this.dataForm.province = positionResult.regeocode.addressComponent.province;
                this.dataForm.city = positionResult.regeocode.addressComponent.city;
                this.dataForm.area = positionResult.regeocode.addressComponent.district;
                this.dataForm.lng = positionResult.position.lng;
                this.dataForm.lat = positionResult.position.lat;
              })
              this.positionPicker.start();
            }.bind(this));
          },
          click: (e) => {
            // this.positionPicker.start(e.lnglat);
          }
        },
      };
    },
    created() {
    },
    methods: {
      onSearchResult(pois) {
        if (pois.length) {
          this.center = [pois[0].lng, pois[0].lat];
          this.positionPicker.start(new AMap.LngLat(pois[0].lng, pois[0].lat));
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.dataForm);
          } else {
            return false;
          }
        });
      },
      handleExceed() {
        this.$message({
          message: '够多了，不能再传了',
          type: 'warning'
        });
      },
      handleSuccess(response, file, fileList) {
        console.log(response);
        let res = {
          url: response.data.img_url,
          filePath: response.data.file_path
        };
        switch (response.data.upload_type) {
          case 1:
            res.type = 1;
            this.thumbnail.push(res);
            break;
          case 2:
            res.type = 2;
            this.carousel.push(res);
            break;
        }
        console.log(this.thumbnail);
        console.log(this.carousel);
      },

      handleRemove(file, fileList) {
        let res = {
          url: file.url,
          filePath: file.filePath
        };
        switch (file.type) {
          case 1:
            this.thumbnail = fileList.map(item => {
              res.type = item.type;
              return res;
            });
            break;
          case 2:
            this.carousel = fileList.map(item => {
              res.type = item.type;
              return res;
            });
            break;
          case 3:
            this.detail = fileList.map(item => {
              res.type = item.type;
              return res;
            });
            break;
        }
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      close() {
        this.$refs.form.resetFields();
        this.$emit('closeDialog');
      },
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '',
      }
    },
    directives: {elDragDialog},
  }
</script>

<style scoped>
  .search-box {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 250px;
  }
</style>
