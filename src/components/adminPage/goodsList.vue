<template>
  <div class="text-left">
    <h5 class="font-weight-bold border-bottom p-3">商品信息管理</h5>
    <div class="list-wrap">
      <div class="list-header pl-3 pb-1">
        <span @click="getGoodsList" class="p-2" :class="{active:!tabNav}">商品管理</span>
        <span @click="tabNav = true" class="p-2" :class="{active:tabNav}">添加商品</span>
      </div>
      <div class="list-item" v-if="!tabNav">
        <ul class="clearfix p-2 bg-secondary text-white mt-3">
          <li>商品编号</li>
          <li>商品名称</li>
          <li>商品价格</li>
          <li>图片路径</li>
          <li>操作</li>
        </ul>
        <div class="loading text-center" v-if="loadingFlag">
          <img src="../../../static/images/Spinner-1s-200px.svg" alt="">
          <p>数据加载中,请稍后......</p>
        </div>
        <ul class="clearfix p-2 item-content" v-for="(item,index) in goodsList" :key="item.id">
          <li class="text-left">{{ item.goodId }}</li>
          <li>{{ item.name }}</li>
          <li>&yen;{{ item.price }}/500g</li>
          <li>{{ item.imgSrc.slice(0,15)+'...' }}</li>
          <li><a href="javascript:;" class="btn-link" @click="deleteGoodDialog(item.goodId)">删除</a>
            <a href="javascript:;" class="btn-link" @click="updateGoodDialog(item)">修改</a></li>

        </ul>
      </div>
      <div class="goods-add" v-if="tabNav">
        <form class="w-50 m-auto pt-3" id="addGoodForm" novalidate>
          <div class="form-group row">
            <label class="col-sm-4 col-form-label text-right">
              <span class="text-danger mr-1">*</span>商品名称:</label>
            <div class="col-sm-8">
              <input required type="text"
                     class="form-control"
                     v-model="newGoodsInfo.name"
                     placeholder="商品名称">
              <div class="invalid-feedback">请填写要添加的商品名称</div>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-4 col-form-label text-right">
              <span class="text-danger mr-1">*</span>商品价格:</label>
            <div class="col-sm-8">
              <div class="input-group">
                <div class="input-group-prepend">
                  <div class="input-group-text">&yen;</div>
                </div>
                <input required type="text"
                       class="form-control"
                       v-model="newGoodsInfo.price"
                       placeholder="输入商品单价(例如:38.00)">
                <div class="input-group-append">
                  <div class="input-group-text">/500g</div>
                </div>
                <div class="invalid-feedback">请填写要添加的商品价格(例如:38.00)</div>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-4 col-form-label text-right">
              <span class="text-danger mr-1">*</span>商品图片:</label>
            <div class="col-sm-8">
              <input required type="text"
                     class="form-control"
                     v-model="newGoodsInfo.imgSrc"
                     placeholder="仅支持网络图片,暂不支持本地上传...">
              <div class="invalid-feedback">请填写要添加的商品图片路径</div>
            </div>
          </div>
          <div class="form row">
            <label class="col-sm-4 col-form-label text-right"></label>
            <div class="col-sm-8 d-flex justify-content-center">
              <button type="button" @click="submitForm" class="btn btn-info pl-4 pr-4">提交</button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!--操作结果弹框-->
    <div class="tip-dialog" v-if="DialogConfig.show">
      <div class="modal-content w-25">
        <div class="modal-header">
          <h5 class="modal-title">操作提示</h5>
          <button type="button" class="close" @click="closeDialog">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body text-center">
          <p>{{DialogConfig.message}}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="deleteGood" v-if="DialogConfig.button2">
            {{DialogConfig.textButton2}}
          </button>
          <button type="button" class="btn btn-secondary" @click="closeDialog">关闭</button>
        </div>
      </div>
    </div>

    <!--修改商品信息弹框-->
    <div class="tip-dialog" v-if="updateDialog">
      <div class="modal-content w-25">
        <div class="modal-header">
          <h5 class="modal-title">更新商品信息</h5>
          <button type="button" class="close" @click="closeDialog">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body text-center">
          <div class="text-danger mb-2">{{updateErrorMessage}}</div>
          <form>
            <div class="form-group row">
              <label class="col-sm-4 col-form-label text-right">商品名称:</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" v-model="updateItemObj.name">
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-4 col-form-label text-right">商品价格:</label>
              <div class="col-sm-8">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">&yen;</div>
                  </div>
                  <input required type="text"
                         class="form-control"
                         v-model="updateItemObj.price">
                  <div class="input-group-append">
                    <div class="input-group-text">/500g</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-4 col-form-label text-right">商品图片:</label>
              <div class="col-sm-8">
                <input required type="text"
                       class="form-control"
                       v-model="updateItemObj.imgSrc">
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="updateGoodSubmit"> 确认</button>
          <button type="button" class="btn btn-secondary" @click="closeDialog">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loadingFlag:true,
        tabNav: false,
        updateDialog: false,
        updateErrorMessage: '',
        DialogConfig: {
          show: false,
          message: '',
          button2: true,
          textButton2: ''
        },
        deleteItemIndex: null,
        updateItemObj: {},
        goodsList: [],
        newGoodsInfo: {
          name: '',
          price: '',
          imgSrc: ''
        }
      }
    },
    created() {
      this.getGoodsList();
    },
    methods: {
      getGoodsList() {
        this.tabNav = false;
        let that = this;
        this.$axios({
          method: 'get',
          url: 'http://azhoufm.applinzi.com:4000/goods/getList'
        }).then(function (res) {
          if (res.data.resStatus === '200') {
            that.loadingFlag = false;
            that.goodsList = res.data.result.reverse();
          } else {
            that.DialogConfig = {
              show: true,
              message: '获取商品列表失败,请尝试刷新页面',
              button2: false
            };
          }
          //console.log(res);
        })
      },
      deleteGood() {
        let that = this;
        this.$axios({
          method: 'post',
          url: 'http://azhoufm.applinzi.com:4000/goods/deleteGood',
          data: {
            goodId: this.deleteItemIndex
          }
        }).then(function (res) {
          if (res.data.resStatus === '200') {
            that.DialogConfig = {
              message: '商品删除成功',
              button2: false
            };
            that.getGoodsList();
          } else {
            that.DialogConfig = {
              message: '商品删除失败',
              button2: false
            };
          }
          //console.log(res);
        });
        //console.log(`确认删除商品编号为${this.deleteItemIndex}的商品`);
      },
      deleteGoodDialog(goodId) {
        this.DialogConfig = {
          show: true,
          message: '确认删除此商品么?',
          button2: true,
          textButton2: '确定'
        };
        this.deleteItemIndex = goodId;
      },
      updateGoodDialog(item) {
        this.updateDialog = true;
        this.updateItemObj = item;
      },
      updateGoodSubmit() {
        //console.log(this.updateItemObj);
        let that = this;
        this.$axios({
          method: 'post',
          url: 'http://azhoufm.applinzi.com:4000/goods/updateGood',
          data: {
            ...this.updateItemObj
          }
        }).then(function (res) {
          switch (res.data.resStatus) {
            case '200':
              that.updateDialog = false;
              that.getGoodsList();
              break;
            case '202':
              that.updateErrorMessage = '商品名称已存在,请更换名称';
              break;
            case '205':
              that.updateErrorMessage = '此商品不存在';
              break;
            default:
              that.updateErrorMessage = '商品信息更新失败';
          }
        })
      },
      submitForm(event) {
        let that = this;
        $(function () {
          const form = $('#addGoodForm');
          if (form[0].checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            form.addClass('was-validated');
          } else {
            that.$axios({
              method: 'post',
              url: 'http://azhoufm.applinzi.com:4000/goods/addNew',
              data: {
                newGoodsInfo: that.newGoodsInfo
              }
            }).then(function (res) {
              console.log(typeof res.data.resStatus);
              switch (res.data.resStatus) {
                case '200':
                  that.DialogConfig = {
                    show: true,
                    message: '新增商品成功',
                    button2: false
                  };
                  break;
                case '201':
                  that.DialogConfig = {
                    show: true,
                    message: '商品名称已存在,添加失败',
                    button2: false
                  };
                  break;
                default:
                  that.DialogConfig = {
                    show: true,
                    message: '商品添加失败,请查看网络是否连接成功!',
                    button2: false
                  };
                  break;
              }
              //console.log(res);
            });
          }
        })
      },
      closeDialog() {
        this.DialogConfig.show = false;
        this.updateDialog = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .list-header {
    border-bottom: 2px solid #6c757d;
    margin-top: 20px;
    span {
      cursor: pointer;
    }
    .active {
      background: #6c757d;
      color: #fff;
      font-weight: bold;
    }
  }

  .list-item {
    li {
      width: 20%;
      float: left;
      text-align: center;

    }
    .item-content {
      border-bottom: 1px solid #6c757d;
    }
  }
</style>
