<template>
  <div class="text-left">
    <h5 class="font-weight-bold border-bottom p-3">用户信息管理</h5>
    <div class="list-wrap">
      <div class="list-header pl-3 pb-1">
        <span class="p-2">用户列表</span>
      </div>
      <div class="list-item">
        <ul class="clearfix p-2 bg-secondary text-white mt-3">
          <li>用户编号</li>
          <li>用户名称</li>
          <li>用户类型</li>
          <li>总订单数</li>
          <li>操作</li>
        </ul>
        <div class="loading text-center" v-if="loadingFlag">
          <img src="../../../static/images/Spinner-1s-200px.svg" alt="">
          <p>数据加载中,请稍后......</p>
        </div>
        <ul class="clearfix p-2 item-content" v-for="(item,index) in userList" :key="item.userId">
          <li>{{item.userId}}</li>
          <li>{{item.username}}</li>
          <li>{{item.type}}</li>
          <li>30/笔</li>
          <li><a href="javascript:;" class="btn-link">删除</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userList: [],
        loadingFlag:true
      }
    },
    created() {
      this.getUserList();
    },
    methods: {
      getUserList() {
        let that = this;
        this.$axios({
          method: 'get',
          url: 'http://azhoufm.applinzi.com:4000/users/userList'
        }).then(function (res) {
          if (res.data.resStatus === '200') {
            that.loadingFlag = false;
            that.userList = res.data.result;
            //console.log(that.userList)
          }
          //console.log(res);
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
      width: 20%;
      float: left;
      text-align: center;
    }
    .item-content {
      border-bottom: 1px solid #6c757d;
    }
  }
</style>
