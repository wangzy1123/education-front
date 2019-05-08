<template>
  <div style="margin-top: 20px; margin-left: 20px;">
    <Form :model="userForm" :label-width="80">
      <div>
        <h2>头像设置</h2>
        <div style="margin-top: 20px;">
          <div style="float: left">
            <img :src="userForm.headImg" width="200" height="200" style="border:1px dashed grey;"  />
          </div>
          <div style="float: left; margin-left: 100px; margin-top: 80px;">
            <!-- todo 这边需要改下地址 修改成和config/index.js里面的地址一致 -->
            <Upload
              :on-success="handleSuccess"
              :format="['jpg','png','jpeg']"
              :on-format-error="handleFormatError"
              action="http://localhost:8081/education/user/uploadHeadImg">
              <Button icon="ios-cloud-upload-outline">修改头像</Button>
            </Upload>
          </div>
        </div>
      </div>
      <div style="padding-top: 20px; clear: both;">
        <h2>个人信息设置</h2>
        <div style="margin-top: 20px;">
          <FormItem label="昵称">
            <Input v-model="userForm.userName" placeholder="请输入昵称" style="width: 40%;"></Input>
          </FormItem>
          <FormItem label="手机号">
            <Input v-model="userForm.telephone" placeholder="请输入手机号" style="width: 40%;"></Input>
          </FormItem>
          <FormItem label="邮箱">
            <Input v-model="userForm.email" small placeholder="请输入邮箱" style="width: 40%;"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="confirmSubmit">确认并提交</Button>
          </FormItem>
        </div>
      </div>
    </Form>
    <Modal
      v-model="confirmModal"
      title="confirm"
      :closable="false"
      :mask-closable="false"
      @on-ok="ok">
      <h3>确认修改？</h3>
    </Modal>
  </div>
</template>

<script>
  import {getUserById, updateUser} from '../server/server'
  export default {
    name: 'UserEdit',
    data () {
      return {
        userForm: {
          userId: '',
          userName: '',
          headImg: '',
          email: '',
          telephone: '',
        },
        confirmModal: false,
      }
    },
    created () {
      // 初始化用户信息
      this.findLoginUser(localStorage.userId);
    },
    methods:{
      findLoginUser(userId){
        let params = {};
        params.userId = userId;
        getUserById(params).then(res=>{
          this.userForm = res.data;
          if(!this.userForm.headImg || this.userForm.headImg === ''){
            this.userForm.headImg = require('./images/defaultHeadImg.jpg');
          }
        })
      },
      handleSuccess (res, file) {
        if (res.errorCode == 0) {
          this.userForm.headImg = res.data;
          this.$forceUpdate()
        }
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式不对',
          desc:  file.name + ' 文件格式不对，当前只支持jpg png jpeg'
        });
      },
      confirmSubmit(){
        if(!this.userForm.userName || this.userForm.userName === ''){
          this.$Message.error({
            content: '昵称不能为空'
          })
          return;
        }
        this.confirmModal = true;
      },
      ok () {
        updateUser(this.userForm).then(res =>{
          if (res.errorCode == 0) {
            this.userForm = res.data;
            this.$Message.success({
              content: '个人信息已更新'
            })
          }else{
            this.$Message.error({
              content: '修改失败，请联系管理员'
            })
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
