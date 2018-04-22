<template>
  <div class="index-wrap">
    <!--页面头部-->
    <header-page></header-page>

    <!--头部轮播图-->
    <div id="carouselExampleIndicators" class="carousel slide pt-0" data-ride="carousel" data-interval="3000">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100" src="../../static/images/sy01-qg-nj.jpg" alt="First slide">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="../../static/images/sy02-qg-nj.jpg" alt="Second slide">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="../../static/images/sy03-qg-nj.jpg" alt="Third slide">
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>

    <!--顶部广告区-->
    <div class="ad-wrap m-4 border-bottom pb-3">
      <a href="/#"><img src="../../static/images/cp1.jpg" alt=""></a>
      <a href="/#"><img src="../../static/images/cp2.jpg" alt=""></a>
      <a href="/#"><img src="../../static/images/cp3.jpg" alt=""></a>
    </div>

    <!--水果列表-->
    <div class="loading" v-if="loadingFlag">
      <img src="../../static/images/Spinner-1s-200px.svg" alt="">
      <p>数据加载中,请稍后......</p>
    </div>
    <div class="fruit-list">
      <div class="fruit-list-title d-flex justify-content-between pl-5 pr-5">
        <img src="../../static/images/t2.png" alt="">
        <a href="/#">更多>></a>
      </div>
      <div class="fruit-list-item row pl-5 pr-5 m-0 d-flex justify-content-center">
        <div class="card col-md-3 p-0 m-3" v-for="(item,index) in goodsList" :key="item.goodId">
          <img class="card-img-top" :src='item.imgSrc'>
          <div class="card-body">
            <h6 class="card-title text-left">{{ item.name }}</h6>
            <p class="card-text text-left text-muted">￥{{ item.price }}/500g
              <span class="ml-2">
                <input class="form-control d-inline w-25 mr-1" type="text"
                       v-model="goodsList[index].goodNum" placeholder="1">份
              </span></p>
            <a href="javascript:;" class="btn btn-info pl-4 pr-4 text-white" @click="addCart(item,index)">下订单</a>
          </div>
        </div>
      </div>
    </div>

    <!--底部信息-->
    <div class="footer">
      <div class="list-inline border-bottom border-top p-4">
        <img class="mr-3 border-right pr-3" src="../../static/images/icon_1.png" alt="">
        <img class="mr-3 border-right pr-3" src="../../static/images/icon_2.png" alt="">
        <img class="mr-3 border-right pr-3" src="../../static/images/icon_3.png" alt="">
        <img src="../../static/images/icon_4.png" alt="">
      </div>

      <div class="web-info p-4 d-flex justify-content-center">
        <div class="QR-code d-flex flex-column">
          <img src="../../static/images/guan_ewcode1.jpg" alt="">
          <span class="text-muted mt-2">天天果园官方微信</span>
        </div>
        <div class="d-flex flex-column ml-5 text-left">
          <span class="mb-3 font-weight-bold">购物指南</span>
          <a class="text-muted" href="#">新用户注册</a>
          <a class="text-muted" href="#">在线下单</a>
          <a class="text-muted" href="#">支付方式</a>
        </div>
        <div class="d-flex flex-column ml-5 text-left">
          <span class="mb-3 font-weight-bold">配送说明</span>
          <a class="text-muted" href="#">运费说明</a>
          <a class="text-muted" href="#">运费方式</a>
          <a class="text-muted" href="#">发票说明</a>
        </div>
        <div class="d-flex flex-column ml-5 text-left">
          <span class="mb-3 font-weight-bold">售后服务</span>
          <a class="text-muted" href="#">退换货规则</a>
          <a class="text-muted" href="#">服务保障承诺</a>
          <a class="text-muted" href="#">验货与签收</a>
        </div>
        <div class="d-flex flex-column ml-5 text-left">
          <span class="mb-3 font-weight-bold">企业服务</span>
          <a class="text-muted" href="#">企业订购</a>
          <a class="text-muted" href="#">公司简介</a>
          <a class="text-muted" href="#">定制专区</a>
        </div>
      </div>

      <div class="border-top pt-3 pb-3 text-center">
        <div class="copyright">
          <p class="text-muted">版权所有 ©2018##天天鲜果电子商务有限公司 保留所有权利 | <a href="#">沪ICP备#####</a></p>
          <p class="text-success">天天果园 &nbsp&nbsp鲜果网购</p>
        </div>
        <div>
          <a href="#"><img src="../../static/images/guan_shgs.gif" alt=""></a>
          <a href="#"><img style="width: 35px;" src="../../static/images/guan_wgdjp.png" alt=""></a>
        </div>
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
  </div>
</template>

<script>
  import HeaderPage from './header'
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        loadingFlag:true,
        loginState: false,
        goodsList: [],
        goodNum: 1,
        DialogConfig: {
          show: false,
          message: '',
          button2: true,
          textButton2: ''
        },
      }
    },
    components: {
      HeaderPage
    },
    created() {
      this.getGoodsList();
    },
    computed: {
      ...mapState(['userName', 'userId', 'cartCount'])
    },
    methods: {
      getGoodsList() {
        let that = this;
        this.$axios({
          method: 'get',
          url: 'http://azhoufm.applinzi.com:4000/goods/getList'
        }).then(function (res) {
          if (res.data.resStatus === '200') {
            that.loadingFlag = false;
            that.goodsList = res.data.result;
          } else {
            that.DialogConfig = {
              show: true,
              message: '获取商品列表失败,请尝试刷新页面',
              button2: false
            };
          }
        })
      },
      addCart(good, index) {
        if (this.userName) {
          let that = this;
          let goodNum;
          if (!that.goodsList[index].goodNum) {
            goodNum = 1;
          } else {
            goodNum = that.goodsList[index].goodNum;
          }
          this.$axios({
            method: 'post',
            url: 'http://azhoufm.applinzi.com:4000/orders/addOrder',
            data: {
              userName: this.userName,
              goodId:good.goodId,
              goodNum,
              goodName:good.name
            }
          }).then(function (res) {
            if (res.data.resStatus === '200') {
              that.DialogConfig = {
                show: true,
                message: '下单成功,商城管理员将会尽快联系您',
                button2: false
              };
            } else {
              console.log("此商品已售空,加入购物车失败");
            }
          });
        } else {
          this.DialogConfig = {
            show: true,
            message: '登陆后才能进行加购物车操作哦',
            button2: false
          };
        }
      },
      closeDialog() {
        this.DialogConfig.show = false;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .fruit-list-item .card {
    &:hover {
      box-shadow: 0 3px 3px rgba(0, 0, 0, .5);
      animation: pulse 1s 0s ease both;
      transition: all 0s .2s;
    }
    img {
      height: 180px;
    }
  }

</style>
