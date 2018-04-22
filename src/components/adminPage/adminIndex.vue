<template>
  <div class="admin-wrap">
    <!--top nav-->
    <nav class="navbar navbar-expand-lg navbar-light bg-dark">
      <div class="w-100 d-flex ml-5 mr-5 pt-2 pb-2 justify-content-between text-white">
        <span class="font-weight-bold logoText">天天果园管理员后台</span>
        <div>
          <span>管理员您好!</span>
          <a href="javascript:;" @click="logout">退出登录</a>
        </div>
      </div>
    </nav>

    <!--content-->
    <div class="content-wrap row ml-5 mr-5">
      <div class="menu-list col-2 d-flex flex-column text-left rounded-bottom">
        <router-link to="/admin/index" class="menu-item">
          <i class="iconfont mr-2">&#xe62f;</i>商品信息
        </router-link>
        <router-link to="/admin/user_list" class="menu-item">
          <i class="iconfont mr-2">&#xe6ff;</i>用户信息
        </router-link>
        <router-link to="/admin/order_list" class="menu-item">
          <i class="iconfont mr-2">&#xe607;</i>订单信息
        </router-link>
        <router-link to="/admin/admin_info" class="menu-item">
          <i class="iconfont mr-2">&#xe715;</i>管理员信息
        </router-link>
        <router-link to="/admin/message_list" class="menu-item">
          <i class="iconfont mr-2">&#xe704;</i>留言信息
        </router-link>
      </div>
      <div class="content-view col-10">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      logout() {
        //console.log(document.cookie);
        let that = this;
        this.$axios({
          method: 'get',
          url: 'http://azhoufm.applinzi.com:4000/users/logout'
        }).then(function (res) {
          if (res.data.resStatus === '200') {
            that.loginState = false;
          }
        });
        that.$store.commit("updateUserInfo",
          {
            userName: '',
            userId: ''
          });
        window.localStorage.removeItem('userName');
        window.localStorage.removeItem('userId');
        this.$router.push('/');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .admin-wrap {
    .logoText {
      font-size: 20px;
    }
    .content-wrap .menu-list{
      padding: 15px;
      background: #343a40;
      a{
        text-decoration: none;
        color: #fff;
        padding: 10px;
        display: flex;
        align-items: center;
        &:hover{
          background: #6c757d;
          color: #fff;
          border-radius: 3px;
        }
      }
      .active{
        background: #6c757d;
        color: #fff;
        border-radius: 3px;
      }
    }
  }
</style>
