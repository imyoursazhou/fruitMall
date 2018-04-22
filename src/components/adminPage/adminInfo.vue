<template>
  <div class="text-left">
    <h5 class="font-weight-bold border-bottom p-3">管理员信息</h5>
    <div class="list-wrap">
      <div class="list-header pl-3 pb-1">
        <span class="p-2">修改密码</span>
      </div>
      <div class="list-item">
        <form class="w-50 m-auto pt-3">
          <div class="form-group row">
            <label class="col-sm-4 col-form-label text-right">原密码:</label>
            <div class="col-sm-8">
              <input type="password" class="form-control">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-4 col-form-label text-right">新密码:</label>
            <div class="col-sm-8">
              <input type="password" class="form-control">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-4 col-form-label text-right">确认新密码:</label>
            <div class="col-sm-8">
              <input type="password" class="form-control">
            </div>
          </div>
          <div class="form row">
            <label class="col-sm-4 col-form-label text-right"></label>
            <div class="col-sm-8 d-flex justify-content-center">
              <button class="btn btn-dark pl-4 pr-4">修改密码</button>
            </div>
          </div>
        </form>
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
