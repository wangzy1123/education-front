<template>
  <div>
    <Menu mode="horizontal" theme="dark">
      <menu-item name="0" style="margin-left: 200px">
        <span @click="toIndex">返回首页</span>
      </menu-item>
      <menu-item name="1" style="margin-left: 200px">
        <Icon type="ios-camera-outline" />
        发现
      </menu-item>
      <menu-item name="2" style="margin-left: 50px;">
        <Icon type="ios-book-outline" />
        课程
      </menu-item>
      <menu-item name="3" v-show="!isLogin" style="float: right; margin-right: 100px;">
        <span @click="loginModal = true">登录</span>
      </menu-item>
      <div style="float: right; margin-right: 100px;">
        <menu-item name="5" v-show="isLogin">
          <span>{{loginUserName}}</span>
          <span style="margin-left: 10px;"><img src="./components/images/4523636_07.jpg" class="getgold_top_head_img"/></span>
        </menu-item>
        <menu-item name="6" v-show="isLogin">
          <span @click="logout">注销</span>
        </menu-item>
      </div>
    </Menu>

    <Modal v-model="loginModal" width="400">
      <div>
        <Input placeholder="账号/手机号码" v-model="userName" icon="ios-person-outline" style="margin-top: 40px;"></Input>
        <Input placeholder="密码" type="password" v-model="pwd" icon="ios-locked-outline" style="margin-top: 40px;"></Input>
      </div>
      <div slot="footer">
        <div style="margin-top: 10px;">
          <Button type="primary" @click="loginIt" long shape="circle">登录</Button>
        </div>
        <div style="margin-top: 20px;">
          <Button type="default" @click="toRegist" long shape="circle">注册</Button>
        </div>
      </div>
    </Modal>
    <router-view/>
  </div>
</template>

<script>

  import {login} from './server/server.js';

  export default {
    data() {
      return {
        userName: '',
        pwd: '',
        isLogin: false,
        loginModal: false,
        loginUserName: '',
      }
    },
    created: function () {
      if(localStorage.getItem('loginUser')){
        console.log(JSON.parse(localStorage.getItem('loginUser')))
        this.isLogin = true;
        this.loginUserName = JSON.parse(localStorage.getItem('loginUser')).userName;
      }
    },
    methods: {
      loginIt(){
        if(this.userName.trim() == '' || this.pwd.trim() == ''){
          this.$Message.error({
            content: '用户名或密码为空'
          });
          return;
        }
        let loginData = {};
        loginData.userAccount = this.userName;
        loginData.pwd = this.pwd;
        this.loginLoading = true;
        login(loginData).then(res => {
          this.loginLoading = false;
          if (res.errorCode === 0) {
            this.$Message.success({
              content: res.errorMessage
            });
            localStorage.setItem('loginUser', JSON.stringify(res.data));
            this.loginModal = false;
            this.isLogin = true;
            this.loginUserName = JSON.parse(localStorage.getItem('loginUser')).userName;
            this.$router.push({
              path: '/'
            });
          }
          else {
            this.$Message.error({
              content: res.errorMessage
            });
          }
        });
      },
      toIndex(){
        this.$Message.success({
          content: "跳转至首页"
        });
        this.$router.push({
          path: '/'
        });
      },
      toRegist(){
        this.$Message.success({
          content: "跳转至注册页"
        });
        this.loginModal = false;
        this.$router.push({
          path: '/regist'
        });
      },
      logout(){
        this.$Message.success({
          content: "已退出登录"
        });
        localStorage.removeItem("loginUser");
        this.isLogin = false;
      }
    },
  }
</script>
<style scoped>
  .getgold_top_head_img{
    height: 30px;
    width: 30px;
    border-radius:50%;
    -webkit-border-radius:50%;
    -moz-border-radius:50%;
  }
</style>
