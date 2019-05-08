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
          <Dropdown trigger="click" style="margin-left: 20px" @on-click="changeMenu">
            <Avatar :src="headImg"></Avatar>
            <DropdownMenu slot="list">
              <DropdownItem name="userInfo">个人中心</DropdownItem>
              <DropdownItem name="logout">注销</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </menu-item>
      </div>
    </Menu>

    <Modal v-model="loginModal" width="400" :closable="false">
      <div>
        <Input placeholder="账号/手机号码" v-model="userName" icon="ios-person-outline" style="margin-top: 20px;"></Input>
        <Input placeholder="密码" type="password" v-model="pwd" icon="md-lock" style="margin-top: 20px;"></Input>
        <div style="margin-top: 20px;">
          <Input placeholder="验证码" v-model="validateCode" small icon="md-thumbs-up" style="width: 80%;"></Input>
          <Button @click="createCode" type="info">{{checkCode}}</Button>
        </div>
      </div>
      <div slot="footer">
        <div style="margin-top: 10px;">
          <Button type="primary" @click="loginIt" long shape="circle">登录</Button>
        </div>
        <div style="margin-top: 10px;">
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
        headImg: '',
        isLogin: false,
        loginModal: false,
        loginUserName: '',
        validateCode: '',
        checkCode: '',
        code: '',
      }
    },
    created: function () {
      if(localStorage.getItem('loginUser')){
        console.log(JSON.parse(localStorage.getItem('loginUser')))
        this.isLogin = true;
        this.loginUserName = JSON.parse(localStorage.getItem('loginUser')).userName;
        this.headImg = JSON.parse(localStorage.getItem('loginUser')).headImg;
      }
      this.createCode();
    },
    methods: {
      changeMenu(name){
        if (name == 'userInfo') {
          // 个人中心页面
          this.$router.push({
            path: "/userInfo"
          });
        } else if (name == 'logout') {
          // 注销
          this.logout();
          this.$router.push({
            path: "/"
          });
        }
      },
      loginIt(){
        if(this.userName.trim() == '' || this.pwd.trim() == ''){
          this.$Message.error({
            content: '用户名或密码为空'
          });
          return;
        }
        if(this.checkCode.trim() == ''){
          this.$Message.error({
            content: '验证码为空'
          });
          return;
        }
        if(this.checkCode !== this.validateCode){
          this.$Message.error({
            content: '验证码输入有误'
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
            localStorage.setItem('userId', res.data.userId);
            this.loginModal = false;
            this.isLogin = true;
            this.loginUserName = JSON.parse(localStorage.getItem('loginUser')).userName;
            let headImage = JSON.parse(localStorage.getItem('loginUser')).headImg;
            if(headImage === '' || !headImage){
              this.headImg = require('./components/images/defaultHeadImg.jpg');
            }else{
              this.headImg = headImage;
            }
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
      },
      createCode(){
        //先清空验证码的输入
        this.code = '';
        this.checkCode = '';
        this.validateCode = '';
        //验证码的长度
        let codeLength = 4;
        //随机数
        let random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
        for(let i = 0; i < codeLength; i++) {
          //取得随机数的索引（0~35）
          let index = Math.floor(Math.random()*36);
          //根据索引取得随机数加到code上
          this.code += random[index];
        }
        //把code值赋给验证码
        this.checkCode = this.code;
      }
    },
  }
</script>
<style scoped>
  .getgold_top_head_img{
    height: 30px;
    width: 30px;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    position: relative;
    bottom: -10px;
  }
</style>
