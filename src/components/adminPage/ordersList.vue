<template>
  <div class="text-left">
    <h5 class="font-weight-bold border-bottom p-3">订单信息管理</h5>
    <div class="list-wrap">
      <div class="list-header pl-3 pb-1">
        <span class="p-2">订单列表</span>
      </div>
      <div class="list-item">
        <ul class="clearfix p-2 bg-secondary text-white mt-3">
          <li>订单编号</li>
          <li>用户名</li>
          <li>订单时间</li>
          <li>商品数量</li>
          <li>商品编号</li>
          <li>商品名称</li>
        </ul>
        <div class="loading text-center" v-if="loadingFlag">
          <img src="../../../static/images/Spinner-1s-200px.svg" alt="">
          <p>数据加载中,请稍后......</p>
        </div>
        <div class="jumbotron mt-4" v-if="orderList.length<=0">
          <h1 class="display-4">管理员,您好!</h1>
          <p class="lead">本商城暂时还没有任何订单</p>
          <hr class="my-4">
        </div>
        <ul class="clearfix p-2 item-content" v-if="orderList.length>0" v-for="(item,index) in orderList"
            :key="item.orderId">
          <li class="text-left">{{item.orderId}}</li>
          <li>{{item.username}}</li>
          <li>{{item.orderTime}}</li>
          <li>{{item.goodNum}}</li>
          <li>{{item.goodId}}</li>
          <li>{{item.goodName}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        orderList: [],
        loadingFlag:true
      }
    },
    created() {
      this.getOrderList();
    },
    methods: {
      getOrderList() {
        let that = this;
        this.$axios({
          method: 'get',
          url: 'http://azhoufm.applinzi.com:4000/orders/orderList'
        }).then(function (res) {
          switch (res.data.resStatus) {
            case '200':
              that.loadingFlag = false;
              that.orderList = res.data.result.reverse();
              break;
            case '201':
              that.loadingFlag = false;
              console.log("当前订单列表为空");
              break;
            default:
              that.loadingFlag = false;
              console.log("查询订单列表失败");
              break;
          }
        })
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
      width: 16%;
      float: left;
      text-align: center;

    }
    .item-content {
      border-bottom: 1px solid #6c757d;
    }
  }
</style>
