<template>
  <div class="header-wrap">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container justify-content-between">
        <a class="navbar-brand" href="#">
          <img src="../../static/images/logo.png" class="img-fluid">
        </a>

        <div>
          <div v-if="loginState">
            <span>欢迎您{{username}}</span>
            <a href="javascript:;" @click="logout">退出登录</a>
          </div>
          <div v-if="!loginState">
            <a class="btn btn-outline-success" data-toggle="modal" data-target="#registerModal"
               href="javascript:;">注册</a>
            <a class="btn btn-outline-success" data-toggle="modal" data-target="#loginModal" href="javascript:;">登录</a>
          </div>
        </div>
      </div>
    </nav>

    <!-- 注册Modal -->
    <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">注册</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form>
            <div class="modal-body">
              <span class="text-danger" v-if="registerError">用户名已存在，注册失败！</span>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label text-right">用户名</label>
                <div class="col-sm-10 d-flex align-items-center">
                  <input type="text"
                         class="form-control"
                         name="registerUsername"
                         v-model="registerUsername"
                         v-validate="'required'"
                         :class="{borderDanger:errors.has('registerUsername')}">
                  <span v-if="errors.has('registerUsername')"
                        class="text-danger ml-3 w-75">{{ errors.first('registerUsername') }}</span>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label text-right">密码</label>
                <div class="col-sm-10 d-flex align-items-center">
                  <input type="password"
                         v-validate="'required|min:6'"
                         name="registerPassword"
                         v-model="registerPassword"
                         :class="{borderDanger:errors.has('registerPassword')}"
                         class="form-control">
                  <span v-if="errors.has('registerPassword')"
                        class="text-danger ml-3 w-75">{{ errors.first('registerPassword') }}</span>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
              <button type="button" class="btn btn-primary" @click="register">注册</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- 登录Modal -->
    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" v-if="adminLogin == 'normalUser'">用户登录</h5>
            <h5 class="modal-title" v-if="adminLogin == 'adminUser'">管理员登录</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form>
            <div class="modal-body">
              <span class="text-danger" v-if="loginError">用户名不存在或密码错误</span>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label text-right">用户名</label>
                <div class="col-sm-10 d-flex align-items-center">
                  <input type="text"
                         class="form-control"
                         name="loginUsername"
                         v-model="loginUsername"
                         v-validate="'required'"
                         :class="{borderDanger:errors.has('loginUsername')}">
                  <span v-if="errors.has('loginUsername')"
                        class="text-danger ml-3 w-75">{{ errors.first('loginUsername') }}</span>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label text-right">密码</label>
                <div class="col-sm-10 d-flex align-items-center">
                  <input type="password"
                         v-validate="'required'"
                         name="loginPassword"
                         v-model="loginPassword"
                         :class="{borderDanger:errors.has('loginPassword')}"
                         class="form-control">
                  <span v-if="errors.has('loginPassword')"
                        class="text-danger ml-3 w-75">{{ errors.first('loginPassword') }}</span>
                </div>
              </div>
            </div>
            <div class="modal-footer d-flex justify-content-between">
              <a href="javascript:;" class="text-success" @click="adminLogin = 'adminUser'">管理员登录</a>
              <div>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" @click="login">登录</button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loginState: false,
        username: '',
        registerUsername: '',
        registerPassword: '',
        loginUsername: '',
        loginPassword: '',
        registerError: false,
        loginError: false,
        adminLogin: 'normalUser'
      }
    },
    created() {

    },
    methods: {
      register() {
        this.$validator.validateAll({
          registerUsername: this.registerUsername,
          registerPassword: this.registerPassword
        }).then((result) => {
          if (result) {
            let that = this;
            this.$axios({
              method: 'post',
              url: '/users/register',
              data: {
                username: this.registerUsername,
                password: this.registerPassword
              }
            }).then(function (res) {
              switch (res.data.resStatus) {
                case '200':
                  that.loginState = true;
                  that.username = res.data.results.userName;
                  $(function () {
                    $('#registerModal').modal('hide');
                  });
                  break;
                case '201':
                  that.registerError = true;
                  break;
                default:
                  break;
              }
            });
          }
        })
      },
      login() {
        this.$validator.validateAll({
          loginUsername: this.loginUsername,
          loginPassword: this.loginPassword
        }).then((result) => {
          if (result) {
            let that = this;
            this.$axios({
              method: 'post',
              url: '/users/login',
              data: {
                username: this.loginUsername,
                password: this.loginPassword
              }
            }).then(function (res) {
              //console.log(res);
              if(res.data.resStatus == 200 && res.data.results.userType == that.adminLogin){
                that.loginState = true;
                that.username = res.data.results.userName;
                $(function () {
                  $('#loginModal').modal('hide');
                });
              }else{
                that.loginError = true;
              }
            });
          }
        })
      },
      logout() {
        //console.log(document.cookie);
        let that = this;
        this.$axios({
          method: 'get',
          url: '/users/logout'
        }).then(function (res) {
          if(res.data.resStatus == 200){
            that.loginState = false;
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .borderDanger {
    border-color: red;
  }
</style>
