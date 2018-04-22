<template>
  <div class="text-left">
    <h5 class="font-weight-bold border-bottom p-3">用户留言管理</h5>
    <div class="list-wrap">
      <div class="list-header pl-3 pb-1">
        <span class="p-2">留言列表</span>
      </div>
      <div class="list-item">
        <ul class="clearfix p-2 bg-secondary text-white mt-3">
          <li>留言板号</li>
          <li>商品编号</li>
          <li>发表时间</li>
          <li>发布用户</li>
          <li>留言内容</li>
        </ul>
        <ul class="clearfix p-2 item-content" v-for="item in 10">
          <li>E2398237492749</li>
          <li>ABK450psf</li>
          <li>2018-04-20</li>
          <li>小米粥</li>
          <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab amet animi, culpa doloremque ea expedita</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
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
